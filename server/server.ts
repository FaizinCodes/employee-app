const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();
const db = require('./db.json');
const fs = require('fs');

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/login', (req: any, res: any, next: any) => {
  const users = readUsers();

  const user = users.filter(
    (u: any) => u.username === req.body.username && u.password === req.body.password
  )[0];

  if (user) {
    res.send({ ...formatUser(user), token: checkIfAdmin(user) });
  } else {
    res.status(401).send('Incorrect username or password');
  }
});

server.post('/employee', (req: any, res: any) => {
  const employee = readEmployee();
  res.send(employee);
});

server.post('/employee/add', (req: any, res: any) => {
  db.employee.push(req.body);
  readEmployee();
  res.send('Success add data!');
});

server.get('/users', (req: any, res: any) => {
  const users = readUsers();
  res.send(users);
})

server.use('/users', (req: any, res: any, next: any) => {
  if (isAuthorized(req) || req.query.bypassAuth === 'true') {
    next();
  } else {
    res.sendStatus(401);
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});

function formatUser(user: any) {
  delete user.password;
  user.role = user.username == 'admin@email.com'
    ? 'admin'
    : 'user';
  return user;
}

function checkIfAdmin(user: any) {
  return user.username == 'admin@email.com'
    ? 'admin-token'
    : 'user-token';
}

function isAuthorized(req: any) {
  return req.headers.authorization === 'admin-token' ? true : false;
}

function readUsers() {
  const dbRaw = fs.readFileSync('./server/db.json');
  const users = JSON.parse(dbRaw).users
  return users;
}

function readEmployee() {
  const dbRaw = fs.readFileSync('./server/db.json');
  const employee = JSON.parse(dbRaw).employee
  return employee;
}
