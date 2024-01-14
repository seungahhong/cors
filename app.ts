import {
  createServer,
  IncomingMessage,
  OutgoingHttpHeaders,
  ServerResponse,
} from 'http';
import fs from 'fs';

interface ResponseArgument {
  path: string;
  contentType: string;
  allowOption?: OutgoingHttpHeaders;
}

const port = process.env.PORT || 4000;

const server = createServer(function (
  req: IncomingMessage,
  res: ServerResponse
) {
  const responseServer = ({
    path,
    contentType,
    allowOption = {},
  }: ResponseArgument) => {
    fs.readFile(path, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Error');
        return;
      }

      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': content.length,
        'Content-Encoding': 'UTF-8',
        ...allowOption,
      });
      res.end(content);
    });
  };

  if (req.url?.match(/credentials/g)) {
    console.log(req.headers.cookie);
  }

  if (req.url === '/' || req.url === '/response.json') {
    responseServer({
      path: './public/response.json',
      contentType: 'application/json',
      allowOption: {
        // 자원을 허용할 출처를 지정한다.
        // 단순 요청(Simple requests)
        // Accept, Accept-Language, Content-Language, Content-Type
        'Access-Control-Allow-Origin': 'http://localhost:4000',
        // 교차 출처 요청의 unsafe 헤더 사용을 허용한다.
        'Access-Control-Allow-Headers': 'unsafe',
        // 안전하지 않는 응답의 헤더를 접근하려고 할 경우 서버에서 아래와 같이 설정이 필요하다.
        // 자바스크립트 접근을 허용하는 안전하지 않은 헤더 목록이 담겨있습니다(안전한 header: Cache-Control, Content-Language, Content-Length, Content-Type, Expires, Last-Modified, Pragma)
        'Access-Control-Expose-Headers': 'Content-Encoding',
        // 교차 출처의 PUT, DELETE, PATCH 요청을 허용한다.
        'Access-Control-Allow-Methods': 'PUT, DELETE, PATCH',
        // preflight 요청 없이 크로스 오리진 요청을 바로 보낼지에 대한 정보를 요청
        'Access-Control-Max-Age': '5',
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
        'Access-Control-Allow-Origin': 'http://localhost:4000',
        // 교차 출처 요청의 unsafe 헤더 사용을 허용한다.
        'Access-Control-Allow-Headers': 'unsafe',
        // 안전하지 않는 응답의 헤더를 접근하려고 할 경우 서버에서 아래와 같이 설정이 필요하다.
        // 자바스크립트 접근을 허용하는 안전하지 않은 헤더 목록이 담겨있습니다
        'Access-Control-Expose-Headers': 'Content-Encoding',
        // 교차 출처의 PUT, DELETE, PATCH 요청을 허용한다.
        'Access-Control-Allow-Methods': 'PUT, DELETE, PATCH',
        // 서로 다른 도메인(크로스 도메인)에 요청을 보낼 때 요청에 credential 정보를 담아서 보낼 지를 결정하는 항목
        // credential 정보가 포함되어 있는 요청: 쿠키를 첨부해서 보내는 요청, 헤더에 Authorization 항목이 있는 요청
        // Access-Control-Allow: *(와일드 카드 제외)
        'Access-Control-Allow-Credentials': 'true',
        // preflight 요청 없이 크로스 오리진 요청을 바로 보낼지에 대한 정보를 요청
        'Access-Control-Max-Age': '5',
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

  if (req.url === '/cors/patch') {
    responseServer({
      path: './public/cross-origin/index_patch.html',
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

  if (req.url === '/cors/credentials/put') {
    responseServer({
      path: './public/cross-origin/index_credentials_put.html',
      contentType: 'text/html',
    });
  }
});

server.listen(port, () =>
  console.log(`Server Start Listening on port ${port}`)
);
