const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function ensureDatabase() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ subscribers: [], orders: [] }, null, 2));
  }
}

function readDatabase() {
  ensureDatabase();
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

function writeDatabase(database) {
  ensureDatabase();
  fs.writeFileSync(DB_FILE, JSON.stringify(database, null, 2));
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(payload));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';

    request.on('data', (chunk) => {
      body += chunk;

      if (body.length > 1_000_000) {
        request.destroy();
        reject(new Error('Solicitud demasiado grande'));
      }
    });

    request.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(new Error('JSON invalido'));
      }
    });

    request.on('error', reject);
  });
}

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function cleanOrderItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  const cleanItems = items.map((item) => ({
    name: typeof item.name === 'string' ? item.name.trim() : '',
    price: Number(item.price)
  }));

  if (cleanItems.some((item) => item.name === '' || !Number.isFinite(item.price) || item.price < 0)) {
    return null;
  }

  return cleanItems;
}

async function handleApi(request, response) {
  if (request.method === 'GET' && request.url === '/api/health') {
    sendJson(response, 200, { ok: true });
    return;
  }

  if (request.method === 'GET' && request.url === '/api/subscribers') {
    const database = readDatabase();
    sendJson(response, 200, { subscribers: database.subscribers });
    return;
  }

  if (request.method === 'GET' && request.url === '/api/orders') {
    const database = readDatabase();
    sendJson(response, 200, { orders: database.orders });
    return;
  }

  if (request.method === 'POST' && request.url === '/api/subscribe') {
    const body = await readBody(request);
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

    if (!isValidEmail(email)) {
      sendJson(response, 400, { error: 'Introduce un email valido.' });
      return;
    }

    const database = readDatabase();
    const existingSubscriber = database.subscribers.find((subscriber) => subscriber.email === email);

    if (existingSubscriber) {
      sendJson(response, 200, { subscriber: existingSubscriber, message: 'Este email ya estaba suscrito.' });
      return;
    }

    const subscriber = {
      id: crypto.randomUUID(),
      email,
      createdAt: new Date().toISOString()
    };

    database.subscribers.push(subscriber);
    writeDatabase(database);
    sendJson(response, 201, { subscriber });
    return;
  }

  if (request.method === 'POST' && request.url === '/api/orders') {
    const body = await readBody(request);
    const items = cleanOrderItems(body.items);

    if (!items) {
      sendJson(response, 400, { error: 'El pedido no contiene productos validos.' });
      return;
    }

    const total = items.reduce((sum, item) => sum + item.price, 0);
    const order = {
      id: crypto.randomUUID(),
      items,
      total: Number(total.toFixed(2)),
      createdAt: new Date().toISOString()
    };

    const database = readDatabase();
    database.orders.push(order);
    writeDatabase(database);
    sendJson(response, 201, { order });
    return;
  }

  sendJson(response, 404, { error: 'Ruta API no encontrada.' });
}

function serveStatic(request, response) {
  const requestPath = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
  const safePath = path.normalize(requestPath).replace(/^(\.\.[/\\])+/, '');
  const filePath = path.join(PUBLIC_DIR, safePath === '/' ? 'index.html' : safePath);
  const resolvedPath = path.resolve(filePath);

  if (!resolvedPath.startsWith(path.resolve(PUBLIC_DIR))) {
    response.writeHead(403);
    response.end('Acceso denegado');
    return;
  }

  fs.readFile(resolvedPath, (error, content) => {
    if (error) {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Archivo no encontrado');
      return;
    }

    const ext = path.extname(resolvedPath);
    response.writeHead(200, { 'Content-Type': contentTypes[ext] || 'application/octet-stream' });
    response.end(content);
  });
}

const server = http.createServer(async (request, response) => {
  try {
    if (request.url.startsWith('/api/')) {
      await handleApi(request, response);
      return;
    }

    serveStatic(request, response);
  } catch (error) {
    sendJson(response, 500, { error: error.message || 'Error interno del servidor.' });
  }
});

ensureDatabase();

server.listen(PORT, () => {
  console.log(`Servidor listo en http://localhost:${PORT}`);
});
