const db = require('../database/mysql');
const path = require('path');

async function findOneProject(project_name) {
  try {
    const [rows, fields] = await db.query('SELECT * FROM project_info WHERE project_name = ?', [project_name]);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function saveProject(project) {
  try {
    const { project_name, customer_name, status, customer_email, start_date, end_date } = project;

    const [result] = await db.query('INSERT INTO project_info (project_name, customer_name, status, customer_email, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)', [project_name, customer_name, status, customer_email, start_date, end_date]);
    const project_id = result.insertId; // Lấy ID của sản phẩm đã được thêm
    console.log(start_date)
    console.log(end_date)
    return project_id;
  } catch (error) {
    console.log(error);
    return null;
  }
}
//lay toan bo products
async function getAllProjects() {
  try {
    const [rows, fields] = await db.query('SELECT * FROM project_info');
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function findOneProjectById(projectId) {
  try {
    const [rows, fields] = await db.query('SELECT * FROM project_info WHERE id = ?', [projectId]);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

 
async function deleteProject(projectId) {
  try {
    const [result] = await db.query('DELETE FROM project_info WHERE id = ?', [projectId]);
    if (result.affectedRows > 0) {
      return true; // Xóa thành công
    } else {
      return false; // Không tìm thấy sản phẩm để xóa
    }
  } catch (error) {
    console.log(error);
    return false; // Lỗi xảy ra
  }
}

async function updateProject(projectId, projectData) {
  try {
    const { project_name, customer_name, status, customer_email, start_date, end_date } = projectData;

    const [result] = await db.query('UPDATE project_info SET project_name = ?, customer_name = ?, status = ?, customer_email = ?, start_date = ?, end_date = ?, WHERE id = ?', [project_name, customer_name, status, customer_email, start_date, end_date, projectId]);
    if (result.affectedRows > 0) {
      return true; // Cập nhật thành công
    } else {
      return false; 
    }
  } catch (error) {
    console.log(error);
    return false; // Lỗi xảy ra
  }
}

module.exports = {
  findOneProject,
  saveProject,
  getAllProjects,
  findOneProjectById,
  deleteProject,
  updateProject
};
