import {
    addNewAdmin,
  } from '../controllers/adminController';
  
  const adminRoutes = (app) => {
    app.route('/api/v1/admins/')
      .post(addNewAdmin);
  };
  
  export default adminRoutes;
  