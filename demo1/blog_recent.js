var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {

    if (req.url == '/') {

        fs.readFile('./title.json', function (err, data) {

            if (err) {

                console.log(err);
                res.end('501:Server Error');
            }
            else {

                var titles = JSON.parse(data.toString());
                fs.readFile('./template.html', function (err, data) {

                    if (err) {

                        console.log(err);
                        res.end('501:Server Error');
                    } else {

                        var tmpl = data.toString();
                        var html = tmpl.replace('%', title.join('<li></li>'));

                        res.writeHead(200, { 'Content-type': 'text/html' });
                        res.end(html);
                    }
                });
            }
        });
    }
}).listen(8001, "127.0.0.1");