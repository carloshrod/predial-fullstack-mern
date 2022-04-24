import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./MyStyles.css";
import SystemOutPage from "./pages/SystemOutPage";
import AdminPage from "./pages/AdminPage";
import UserExtPage from "./pages/UserExtPage";
import Error404 from "./components/Error404";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          Fuera del Sistema
          <Route exact path="/" element={<SystemOutPage page="landingPage" />} />
          <Route path="/login" element={<SystemOutPage page="login" />} /> Inicio de Sesión
          <Route path="/register" element={<SystemOutPage page="register" />} /> Registro de Usuarios
          <Route path="/reset-password" element={<SystemOutPage page="resetPassword" />} /> Olvidó Contraseña
          <Route path="/reset-password/:token" element={<SystemOutPage page="newPassword" />} /> Restablecer Contraseña
          Fin - Fuera del Sistema

          Administrador
          <Route path="/admin/dashboard" element={<AdminPage type="admin" page="home" />} /> Home - Admin
          <Route path="/admin/my-profile" element={<AdminPage type="admin" page="myProfile" />} /> Mi Perfil - Admin
          <Route path="/admin/create-user" element={<AdminPage type="admin" page="createUser" />} />  Crear Usuario - Admin
          <Route path="/admin/manage-users" element={<AdminPage type="admin" page="manageUsers" />} />  Gestionar Usuarios - Admin
          <Route path="/admin/manage-users/edit" element={<AdminPage type="admin" page="editUser" />} />  Editar Usuariop - Admin
          <Route path="/admin/create-predio" element={<AdminPage type="admin" page="createPredio" />} /> Crear Predio - Admin
          <Route path="/admin/manage-predios" element={<AdminPage type="admin" page="managePredio" />} /> Gestionar Predios - Admin
          <Route path="/admin/manage-predios/edit" element={<AdminPage type="admin" page="editPredio" />} /> Editar Predio - Admin
          Fin - Administrador

          Usuario Interno
          <Route path="/user-int/dashboard" element={<AdminPage page="home" />} /> Home - Usuario Interno
          <Route path="/user-int/my-profile" element={<AdminPage page="myProfile" />} /> Mi Perfil - Usuario Interno
          <Route path="/user-int/manage-users" element={<AdminPage page="manageUsers" />} /> Gestionar Usuarios - Usuario Interno
          <Route path="/user-int/create-predio" element={<AdminPage page="createPredio" />} /> Crear Predio - Usuario Interno
          <Route path="/user-int/manage-predios" element={<AdminPage page="managePredio" />} /> Gestionar Predios - Usuario Interno
          <Route path="/user-int/manage-predios/edit" element={<AdminPage page="editPredio" />} /> Editar Predio - Usuario Interno
          Fin - Usuario Interno

          Usuario Externo
          <Route path="/user-ext-home" element={<UserExtPage page="home" />} /> Home - Usuario Externo
          <Route path="/user-ext/my-profile" element={<UserExtPage page="myProfile" />} /> Mi Perfil - Usuario Externo
          <Route path="/user-ext/pagar" element={<UserExtPage page="pagar" />} /> Pagar Impuesto Predial - Usuario Externo
          <Route path="/user-ext/asociar-predios" element={<UserExtPage page="asociarPredios" />} /> Asociar Predios - Usuario Externo
          Fin - Usuario Externo

          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
      <ToastContainer position="top-center" newestOnTop/>
    </>
  );
}

export default App;
