// https://github.com/koajs/static
var serve = require('koa-static');
var koa = require('koa');
var app = koa();
const hostname = '127.0.0.1';
const port = 3000;

// static files
app.use(serve(__dirname));

// start http server
app.listen(port, hostname, () => {
  console.log(`http://${hostname}:${port}`);
});

app.on('error', function(err) {
  log.error('server error', err);
});