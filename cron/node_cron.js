const cron = require('node-cron');

// Lên lịch công việc kiểm tra remaining days mỗi ngày lúc 12 giờ trưa
cron.schedule('0 12 * * *', async () => {
  try {
    // Thực hiện truy vấn để kiểm tra remaining days của tất cả các thành viên
    const membersToNotify = await yourDatabaseQueryToGetMembersWithRemainingDays3();

    // Thực hiện gửi email thông báo cho các thành viên cần thông báo
    membersToNotify.forEach((member) => {
      // Gửi email và thông báo
      // ...
    });
  } catch (error) {
    console.error('Lỗi trong quá trình kiểm tra và gửi email:', error);
  }
});
