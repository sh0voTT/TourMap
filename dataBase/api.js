var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser')

//导入路由，接口
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login')
var demoRouter = require('./routes/demo')
var accountRouter = require('./routes/data')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//暴露静态文件：可访问 ， 如：http://localhost:3000/images/logo.png
app.use(express.static(path.join(__dirname, 'public')));

//配置新增的路由（接口），如此便可以在postman中发起请求
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/',loginRouter)
app.use('/demo',demoRouter)
app.use('/',accountRouter)

// 拦截所有请求
// extended: false  方法内部使用 querystring 模块处理请求参数的格式
// extended: true   方法内部使用第三方模块 qs 来处理请求参数的格式
app.use(bodyParser.urlencoded({extended: false}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//监听端口
app.listen(3000)  //请求时的端口：localhost:5000
console.log("服务启动成功！")
module.exports = app; 

