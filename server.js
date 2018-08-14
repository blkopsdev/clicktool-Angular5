// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
var forceHTTPS = require('node-force-secure-redirect'); 
//var forceSSL = require('express-force-ssl');
//var https = require('https');

/*var ssl_options = {
  key: fs.readFileSync('./keys/private.key'),
  cert: fs.readFileSync('./keys/cert.crt'),
  ca: fs.readFileSync('./keys/intermediate.crt')
};*/

const app = express();

app.set('trust proxy');
app.use(function(req, res, next){
  /* AWS ELBs set the value of x-forwarded-proto header to the protocol
    used to make the request */
  let protocol = req.headers["x-forwarded-proto"];
  
  return next();

  if (protocol === "http") {
    return res.redirect(`https:${req.hostname}${req.originalUrl}`);
  }
  
  return next();   
})

//app.set('trust proxy'); // this is important when your app is behind an ELB 
//app.use(forceHTTPS('environment'));

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Add a handler to inspect the req.secure flag (see 
// http://expressjs.com/api#req.secure). This allows us 
// to know whether the request was via http or https.
/*app.use (function (req, res, next) {
        if (req.secure) {
                // request was via https, so do no special handling
                next();
        } else {
		console.log("adding https")
                // request was via http, so redirect to https
                res.redirect('https://' + req.headers.host + req.url);
        }
}); */

/*app.set('trust proxy');
app.use(function(req, res, next){ 
    if (req.get('X-Forwarded-Proto') != "https") {
        res.set('X-Forwarded-Proto', 'https');
	console.log("Forwarding too:")
	console.log('https://' + req.get('host') + req.url)
        res.redirect('https://' + req.get('host') + req.url);
    } else {
        next();     
    }
})*/


// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
