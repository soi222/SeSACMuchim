// server.js
const express = require('express');
const app = express();
const port = 3000;

// 필요한 경우 API 엔드포인트를 여기서 정의합니다.

// 예시: 기본 라우트 설정
app.get('/', (req, res) => {
  res.send('백엔드 서버가 정상적으로 동작하고 있습니다.');
});

app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
