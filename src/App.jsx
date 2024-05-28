import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import Layout from "./components/layout/Layout.jsx";
import EmployeeDetail from "./components/employee/employeeDetail/EmployeeDetail.jsx";
import Home from "./pages/home/Home";
import Login from "./pages/auth/login.jsx";
import Register from "./pages/auth/register.jsx";
import Forgot from "./pages/auth/forgot.jsx";
import Reset from "./pages/auth/reset.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import AddEmployee from "./pages/addEmployee/AddEmployee.jsx";
import EditEmployee from "./pages/editEmployee/EditEmployee.jsx";
import Profile from "./pages/profile/Profile.jsx";
import EditProfile from './pages/profile/EditProfile.jsx';
import Contact from './pages/contact/Contact.jsx';

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/resetpassword/:resetToken" element={<Reset />} />

        <Route path="/dashboard" element={
            <Sidebar>
              <Layout>
                <Dashboard />
              </Layout>
            </Sidebar>
          }/>
        <Route path="/add-employee" element={
            <Sidebar>
              <Layout>
                <AddEmployee />
              </Layout>
            </Sidebar>
          }/>
        <Route
          path="/employee-detail/:id"
          element={
            <Sidebar>
              <Layout>
                <EmployeeDetail />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-employee/:id"
          element={
            <Sidebar>
              <Layout>
                <EditEmployee />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/profile"
          element={
            <Sidebar>
              <Layout>
                <Profile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
            path="/edit-profile"
            element={
              <Sidebar>
                <Layout>
                  <EditProfile />
                </Layout>
              </Sidebar>
            }
          />
          <Route
            path="/contact-us"
            element={
              <Sidebar>
                <Layout>
                  <Contact />
                </Layout>
              </Sidebar>
            }
          />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
