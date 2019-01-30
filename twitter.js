let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

//Modulos requeridos
var url = require('url');
const argv = require('yargs').argv;
var http = require('http');
var Twitter = require('twitter');
const fs = require('fs');

//Creamos una instancia y asignamos las keys
var client = new Twitter({
  consumer_key: '9v6Gyy4drcep7FIz2JTbrehK8',
  consumer_secret: 'Jb7cZ5pqTOkSnmSiZ0mb5QrnIHGoptrC6GCM0YQ3MbJ5vwRwkb',
  access_token_key: '1053281199597256704-OGu5Wm0K55JRUwucCyqQraae6ZJEB8',
  access_token_secret: 'VUP3akuPiriMg5lPrIEdtut4q0W0zSdp7TzYi4dNL8PDl'
});

//let hashtag = argv.c;
http.createServer(function (req, res) {
  var url_busqueda = url.parse(req.url,true);
  var hashtag = url_busqueda.query.search || 'nodejsdpl';   //DEVUELVE UN OBJETO Y ENTRAMOS EN LA PROPIEDAD SEARCH QUE ES NUESTRO NAME DEL FORMULARIO
console.log(hashtag);
// EL OBJETO (statuses) devuelve .created_at .text ,etc..

client.get('search/tweets', {q: `#${hashtag}`}, function(error, tweets, response) {

    res.writeHead(200, {'Content-Type': 'text/html'} , {'Content-Type': 'text/css'});
    var css = fs.readFileSync('styles.css', {encoding: 'utf8'});  //leemos un archivo externo

res.write('<html>');
    res.write('<head>');
      res.write('<meta charset="utf-8">');
      res.write('<style type="text/css">');
      res.write(css);
      res.write('</style>');
    res.write('</head>');
res.write('<body>');
res.wrtie('<h1>Búsquedas de hashtag en twitter</h1>');
res.write(`<form  method="GET">
              <input type="text" name="search">
              <input type="submit" value="enviar">
        </form>
`);

//RECORREMOS CON UN FOREACH LAS PROPIEDADES DEL OBJETO STATUSES
  res.write(`<h2>Últimos Tweets del hashtag #${hashtag}</h2>`)
tweets.statuses.forEach(function(tweet){ //recorremos con un bucle el objeto statuses entrando en varias propiedades

res.write("<blockquote class='twitter-tweet'>");

 res.write(`<pre>Hora:${tweet.created_at} Escrito con ${tweet.source} </pre>`);
  res.write(`Por el Usuario: ${tweet.user.name}`);
    res.write("<p>");
      res.write(`Escribio: ${tweet.text}`);
    res.write("</p>");

res.write("</blockquote>");
});
res.write('</body>');
res.write('</html>');
res.end();//fin del servidor

});//final del client
}).listen(port);

