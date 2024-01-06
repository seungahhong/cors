const http = require('http');
const fs = require('fs');

interface ResponseArgument {
  path: string;
  contentType: string;
  allowOption?: any;
}

const port = process.env.PORT || 3000;

const server = http.createServer(function (req: any, res: any) {
  const responseServer = ({
    path,
    contentType,
    allowOption = {},
  }: ResponseArgument) => {
    fs.readFile(path, (err: any, content: any) => {
      if (err) {
        res.writeHead(500);
        res.end('Error');
        return;
      }

      res.writeHead(200, {
        'Content-Type': contentType,
        ...allowOption,
      });
      res.end(content);
    });
  };

  console.log('log', req.method, req.url);

  if (req.url === '/' || req.url === '/response.json') {
    responseServer({
      path: './public/response.json',
      contentType: 'application/json',
      allowOption: {
        // 자원을 허용할 출처를 지정한다.
        // 단순 요청(Simple requests)
        // Accept, Accept-Language, Content-Language, Content-Type
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        // 교차 출처 요청의 X-Foo 헤더 사용을 허용한다.
        'Access-Control-Allow-Headers': 'unsafe',
        // 교차 출처의 PUT 요청을 허용한다.
        'Access-Control-Allow-Methods': 'PUT, DELETE',
      },
    });
  }

  if (req.url === '/credentials/response.json') {
    responseServer({
      path: './public/response.json',
      contentType: 'application/json',
      allowOption: {
        // 자원을 허용할 출처를 지정한다.
        // 단순 요청(Simple requests)
        // Accept, Accept-Language, Content-Language, Content-Type
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        // 교차 출처 요청의 X-Foo 헤더 사용을 허용한다.
        'Access-Control-Allow-Headers': 'unsafe',
        // 교차 출처의 PUT 요청을 허용한다.
        'Access-Control-Allow-Methods': 'PUT, DELETE',
        // 서로 다른 도메인(크로스 도메인)에 요청을 보낼 때 요청에 credential 정보를 담아서 보낼 지를 결정하는 항목
        // credential 정보가 포함되어 있는 요청: 쿠키를 첨부해서 보내는 요청, 헤더에 Authorization 항목이 있는 요청
        // Access-Control-Allow: *(와일드 카드 제외)
        'Access-Control-Allow-Credentials': true,
      },
    });
  }

  if (req.url === '/same') {
    responseServer({
      path: './public/same-origin/index.html',
      contentType: 'text/html',
    });
  }

  if (req.url === '/cors') {
    responseServer({
      path: './public/cross-origin/index.html',
      contentType: 'text/html',
    });
  }

  if (req.url === '/cors/post') {
    responseServer({
      path: './public/cross-origin/index_post.html',
      contentType: 'text/html',
    });
  }

  if (req.url === '/cors/header') {
    responseServer({
      path: './public/cross-origin/index_header.html',
      contentType: 'text/html',
    });
  }

  if (req.url === '/cors/put') {
    responseServer({
      path: './public/cross-origin/index_put.html',
      contentType: 'text/html',
    });
  }

  if (req.url === '/cors/delete') {
    responseServer({
      path: './public/cross-origin/index_delete.html',
      contentType: 'text/html',
    });
  }

  if (req.url === '/cors/credentials') {
    responseServer({
      path: './public/cross-origin/index_credentials.html',
      contentType: 'text/html',
    });
  }
});

server.listen(port, () =>
  console.log(`Server Start Listening on port ${port}`)
);
