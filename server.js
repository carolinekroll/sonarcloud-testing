var http = require('http'), 
    fs = require('fs'), 
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  console.log(request);
  if (request.url === '/listings' && request.method === 'GET') {
      // send listingData in the JSON format as a response
      // 200 ok
      response.writeHead(200, {'Content-Type':'application/json'});
      response.write(listingData);
      response.end();
  }
  else {
      //error 404 not found
    response.writeHead(404, {'Content-Type':'text/plain'});
    response.write("404 Not Found\n");
    response.end();
  }
};

fs.readFile('listings.json', 'utf8', function(err, data) {
  // check for errors
  if (err){
    throw err;
  }
  // save data in listingData
  listingData = data;
  // create server
  server = http.createServer(requestHandler);
  // start server
  server.listen(port, function(){
    console.log('Sever is listening on port ' + port);
  })

});
