const express = require('express');
const app = express();
const port = 3000;

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const db = require('./config/database');

const authenticateToken = require('./middleware/auth.js');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

app.use(authenticateToken);

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError) {
    res.status(400).json({ message: 'Invalid JSON' });
  } else {
    next();
  }
});

app.set("view engine", "ejs")
app.get("/", (req, res) => res.render("home"))

//create middleware
function Middleware(req, res, next) {
  console.log('This is a middleware.');
   next(); // Call next() to move to the next middleware
}

app.use(Middleware);

// Add your routes here
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
//user routes
const userRoutes = require('./router/userRoutes');
app.use('/user', userRoutes);
const profileRoutes = require('./router/profileRoutes');
app.use('/userProfile', profileRoutes);


// task routes
const taskRoutes = require('./router/taskRoutes');
app.use('/task', taskRoutes);

//email routes
const emailRoutes = require('./router/emailRoutes');
app.use('/emails',emailRoutes);

//create server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
