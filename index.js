const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // if(req.url === '/') {
    //     fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
    //         if(err) throw err;
    //         res.writeHead(200, { 'Content-Type': 'text/html' });
    //         res.end(content);
    //     })
    // }
    // if(req.url === '/about') {
    //     fs.readFile(path.join(__dirname, 'about.html'), (err, content) => {
    //         if(err) throw err;
    //         res.writeHead(200, { 'Content-Type': 'text/html' });
    //         res.end(content);
    //     })
    // }
    // if(req.url === '/contact') {
    //     fs.readFile(path.join(__dirname, 'contact.html'), (err, content) => {
    //         if(err) throw err;
    //         res.writeHead(200, { 'Content-Type': 'text/html' });
    //         res.end(content);
    //     })
    // }    

    let filePath = path.join(
        __dirname,
        req.url === "/" ? "index.html" : req.url
      );
    
    // Extension of file
    let extname = path.extname(filePath);

    // Default content type
    let contentType = "text/html";

      // Check ext and set content type
    switch (extname) {
      case ".js":
        contentType = "text/javascript";
        break;
      case ".css":
        contentType = "text/css";
        break;
      case ".json":
        contentType = "application/json";
        break;
      case ".png":
        contentType = "image/png";
        break;
      case ".jpg":
        contentType = "image/jpg";
        break;
    }

    if (contentType == "text/html" && extname == "") filePath += ".html";

    // Read file
    fs.readFile(filePath, (err, content) => {
        if(err) {
            if(err.code == 'ENOENT') {
                // Page not found
                fs.readFile(path.join(__dirname, '404.html'), (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf8');
                })
            } else {
                // Server error
                res.writeHead(500);
                res.end(`Server error: ${err.code}`);
            } 
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    })
    })

    const PORT = process.env.PORT || 8080;

    server.listen(PORT, () => console.log('running server'));
