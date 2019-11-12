const http = require('http');

http.createServer((req, res) => {
    res.writeHeader(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    });

    const matchUrl = /^\/response\/(.+)\/delay\/(\d+)\/?$/
    //http://localhost:5200/response/{"data": "Hello World"}/delay/1000/

    if (!matchUrl.test(req.url)) return res.end();

    const [ , response, delay] = matchUrl.exec(req.url);
    const jsonResponse = JSON.parse(decodeURIComponent(response));

    setTimeout(() => {
        res.write(jsonResponse);
        res.end();
    }, +delay)
}).listen(5200);
