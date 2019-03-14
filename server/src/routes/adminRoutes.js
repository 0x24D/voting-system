import {
    addNewAdmin,
    getAdminById,
  } from '../controllers/adminController';
  
  const adminRoutes = (app) => {
    app.route('/api/v1/admins')
      .post(addNewAdmin);
    app.route('/api/v1/admins/:id')
    .get(getAdminById)
  };
  
  export default adminRoutes;
  