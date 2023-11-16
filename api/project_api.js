const router = require('express').Router();
const { findOneProject, saveProject, 
  getAllProjects, deleteProject,
   updateProject, findOneProjectById } = require('../schema_table/project_info');

// Endpoint POST /api/products
router.post('/addproject', async (req, res) => {
  const { project_name, customer_name, status, customer_email, start_date, end_date } = req.body;

  // Kiểm tra xem sản phẩm có tồn tại trong cơ sở dữ liệu chưa
  const existingProject = await findOneProject(project_name);
  if (existingProject) {
    return res.status(409).send('Tên dự án đã tồn tại');
  }

 
  const project = {
    project_name,
    customer_name,
    status,
    customer_email,
    start_date,
    end_date,
  };


  const project_id = await saveProject(project);

  if (project_id) {
    res.status(201).json({ project_id });
  } else {
    res.status(500).send('Lỗi server');
  }
});
///lấy toàn bộ thông tin
router.get('/getallprojects', async (req, res) => {
  try {
    const projects = await getAllProjects();
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get projects' });
  }
});

router.get('/getproject/:id', async (req, res) => {
  const projectId = req.params.id;

  
  try {
    const project = await findOneProjectById(projectId);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get project' });
  }
});

router.delete('/deleteproject/:id', async (req, res) => {
  const projectId = req.params.id;
  const deleteSuccess = await deleteProject(projectId);

  if (deleteSuccess) {
    res.status(200).json({ message: 'Project deleted successfully' });
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
});

router.put('/updateproject/:id', async (req, res) => {
  const projectId = req.params.id;
  const { project_name, customer_name, status, customer_email, start_date, end_date } = req.body;
  const updateSuccess = await updateProject(projectId, { project_name, customer_name, status, customer_email, start_date, end_date });

  if (updateSuccess) {
    res.status(200).json({ message: 'Project updated successfully' });
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
});
module.exports = router;
