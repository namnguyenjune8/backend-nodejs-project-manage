const nodemailer = require('nodemailer');
const project_info = require('./schema_table/project_info');

// Tạo transporter ở đây
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'namnguyenjune8@gmail.com',
    pass: 'ruvaevsjnhckuhqb',
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Lưu trữ thời điểm cuối cùng mà email được gửi cho mỗi customer_email
const lastEmailSentTimes = {};

const sendEmailForAllProjects = async () => {
  try {
    // Lấy toàn bộ danh sách dự án từ cơ sở dữ liệu
    const projects = await project_info.getAllProjects();

    // Lặp qua từng dự án và gửi email cho customer_email của mỗi dự án
    for (const project of projects) {
      // Kiểm tra nếu đã gửi email trong vòng 1 ngày trước đó
      const lastSentTime = lastEmailSentTimes[project.customer_email];
      const currentTime = new Date();

      if (!lastSentTime || (currentTime - lastSentTime) / (1000 * 60 * 60 * 24) >= 1) {
        const mailOptions = {
          from: 'namnguyenjune8@gmail.com',
          to: project.customer_email,
          subject: 'Email from Node-App: A Test Message!',
          text: 'Some content to send',
          html: '<b>The html content</b>',
        };

        // Gửi email
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
            
            // Cập nhật thời điểm cuối cùng mà email được gửi
            lastEmailSentTimes[project.customer_email] = currentTime;
          }
        });
      }
    }
  } catch (error) {
    console.error('Lỗi khi gửi email:', error);
  }
};

module.exports = sendEmailForAllProjects;
