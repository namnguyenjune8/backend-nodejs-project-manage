const express = require('express');
const path = require('path');
const cors = require('cors');
const cron = require('node-cron');
const app = express();
const port = process.env.PORT || 3000;
const sendEmailForAllProjects  = require('./scheduleEmail.js');
// const { spawn } = require('child_process');

app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

const user_admin_table = require(__dirname + '/schema_table/user_Admin');
const project_info = require(__dirname + '/schema_table/project_info');


const signInAdminRouter = require(__dirname + '/api/signIn_Admin');
const signUpAdminRouter = require(__dirname + '/api/signUp_Admin');
const projectInfo = require(__dirname + '/api/project_api');

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());
app.use(signInAdminRouter);
app.use(signUpAdminRouter);
app.use(projectInfo);

//su dung db
app.use('/user_Admin', function(req, res, next) {
  user_admin_table(req, res, next);
});
app.use('/projects_info', function(req, res, next) {
  project_info(req, res, next);
});
// Cấu hình middleware CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // Cho phép truy cập từ tất cả các nguồn gốc
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });


  cron.schedule('* * * * *', () => {
    console.log('Chạy gửi email...');
    sendEmailForAllProjects();
  });
  // cron.schedule('* * * * *', async () => {
  //   console.log('Chạy gửi email...');
  //   await sendEmail(); // Sử dụng await để đảm bảo hàm sendEmail hoàn thành trước khi tiếp tục
  // });


  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });