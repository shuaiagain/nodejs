var http = require('http');
//提供了与文件系统相关的功能
var fs = require('fs');
//提供了与文件系统路径相关的功能
var path = require('path');
// 有根据文件扩展名得出MIME类型的能力
var mime = require('mime');
// 缓存文件内容
var cache = {};

function send404 (response) {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.write('Error 404: resource not found');
    response.end();
}

function sendFile (response, filePath, fileContents) {
    response.writeHead(200, { "content-type": mime.lookup(path.basename(filePath)) });
    response.end(fileContents);
}

//提供静态文件服务
function serverStatic (response, cache, absPath) {

    if (cache[absPath]) {
        sendFile(response, absPath, cache[absPath]);
    } else {

        fs.exists(absPath, function (exists) {
            if (exists) {
                fs.readFile(absPath, function (err, data) {
                    if (err) {
                        send404(response);
                    } else {
                        cache[absPath] = data;
                        sendFile(response, absPath, data);
                    }
                });
            } else {
                send404(response);
            }
        });
    }
}

//创建Http服务器
var server = http.createServer(function (request, response) {
    debugger;
    var filePath = false;
    if (request.url == '/') {
        // filePath = 'public/index.html';
        filePath = 'index.html';
    } else {
        // filePath = 'public' + request.url;
        filePath =  request.url;
    }

    var absPath = './' + filePath;
    // console.log(absPath)
    serverStatic(response, cache, absPath);
});

server.listen(3333, function () {
    console.log("server listening on port 3333");
});