const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

console.log('Loading routes...');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const locationsRouter = require('./routes/locations');
const authRouter = require('./routes/auth');
const resetPasswordRouter = require('./routes/resetPassword');
const RegisUserRouter = require('./routes/RegisUser');

console.log('Creating express app...');
const app = express();

console.log('Setting up view engine...');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

console.log('Using middlewares...');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

console.log('Serving static files...');
app.use(express.static(path.join(__dirname, 'public')));

console.log('Mounting routes...');
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/locations', locationsRouter);
app.use('/api/auth',authRouter);
app.use('/api/resetPassword',resetPasswordRouter);
app.use('/api/RegisUser',RegisUserRouter);

console.log('Setting up 404 and error handlers...');

// 404 错误处理中间件
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 如果是 API 请求，返回 JSON 格式的错误信息
  if (req.accepts('json')) {
    res.status(err.status || 500);
    res.json({ error: err.message });
  } else {
    // 渲染错误页面
    res.status(err.status || 500);
    res.render('error'); // 确保这里渲染的是 'error' 视图
  }
});

console.log('Starting server on port 3001...');
app.listen(3001, 'localhost', () => {
  console.log('Express server running at http://localhost:3001/'); 
});