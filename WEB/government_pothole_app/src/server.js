const express = require('express');
const app = express();
const port = 5000;

// 필요한 패키지 임포트
// const { Configuration, OpenAIApi } = require('openai');
const { OpenAI } = require('openai')
const csv = require('csv-parser');
const fs = require('fs');
const cors = require('cors');

// 미들웨어 설정
app.use(express.json());
app.use(cors());


const openai = new OpenAI({
  apiKey: ''
});  

// CSV 데이터 로드
let csvData = [];

const path = require('path');
const csvFilePath = path.join(__dirname, '../public', 'test_csv.csv');
console.log("CSV 파일 경로:", csvFilePath);


fs.createReadStream('../public/test_csv.csv') // CSV 파일 경로
  .pipe(csv())
  .on('data', (row) => {
    csvData.push(row);
  })
  .on('end', () => {
    console.log('CSV 파일이 성공적으로 로드되었습니다.');
  });

// API 엔드포인트 정의
app.post('/api/chat', async (req, res) => {
  const userQuery = req.body.query;

  // CSV 데이터를 문자열로 변환하여 프롬프트에 추가
  const csvContent = JSON.stringify(csvData);

  // OpenAI API에 전달할 프롬프트 생성
  const prompt = `
다음은 CSV 데이터입니다:
${csvContent}

사용자 질문: ${userQuery}

위의 데이터를 기반으로 질문에 답변하세요.
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // 원하는 모델 선택
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
            role: "user",
            content: prompt,
        },
    ],      max_tokens: 150,
      temperature: 0.7,
    });

    const responseText = completion.choices[0].message.content;
    console.log(responseText);
    res.json({ response: responseText });
  } catch (error) {
    console.error('OpenAI API 에러:', error);
    res.status(500).json({ error: '서버 에러가 발생했습니다.' });
  }
});

// 예시: 기본 라우트 설정
app.get('/', (req, res) => {
  res.send('백엔드 서버가 정상적으로 동작하고 있습니다.');
});

app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
