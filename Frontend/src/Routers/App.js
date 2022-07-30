import React from 'react';
import {BrowserRouter,Routes ,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from '../Components/Home';
import Layout from './Layout';
import SignUp from '../Components/SignUp';
import './material-dashboard.css';
import SignIn from '../Components/SignIn';
import './nucleo-icons.css';
import './nucleo-svg.css';
import Logout from '../Components/Logout';
import ConfirmLayout from '../Routers/ConfirmLayout';
import ConfirmEmail from '../Components/ConfirmEmail';
import PrivateRoute from '../auth/privateRoute';
import CreateTask from '../Components/CreateTask';
import ListTask from '../Components/ListTask';
import ListCompany from '../Components/ListCompany';
import CreateCompany from '../Components/CreateCompany';



const App = () =>{
  return(
    <BrowserRouter>
      <Routes>
          <Route exact element={<Layout />}>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/home" element={<Home/>} />
            <Route exact path="/ev" element={<Home/>} />
            <Route path="/signin" element={<SignIn/>} />
            <Route path="/giris" element={<SignIn/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/kayit" element={<SignUp/>} />
            <Route path="/createtask" element={
              <PrivateRoute pageRoles={["Yönetici","Admin"]}>
                <CreateTask/>
              </PrivateRoute>}
            />  
            <Route path="/gorevolustur" element={
              <PrivateRoute pageRoles={["Yönetici","Admin"]}>
                <CreateTask/>
              </PrivateRoute>}
            /> 
            <Route path="/listtask" element={
              <PrivateRoute pageRoles={["Yönetici","Personel","Admin"]}>
                <ListTask/>
              </PrivateRoute>}
            />   
            <Route path="/gorevlistele" element={
              <PrivateRoute pageRoles={["Yönetici","Personel","Admin"]}>
                <ListTask/>
              </PrivateRoute>}
            />
            <Route path="/company" element={
              <PrivateRoute pageRoles={["Admin"]}>
                <ListCompany/>
              </PrivateRoute>}
            />
            <Route path="/sirket" element={
              <PrivateRoute pageRoles={["Admin"]}>
                <ListCompany/>
              </PrivateRoute>}
            />
             <Route path="/createcompany" element={
              <PrivateRoute pageRoles={["Admin"]}>
                <CreateCompany/>
              </PrivateRoute>}
            />
             <Route path="/sirketolustur" element={
              <PrivateRoute pageRoles={["Admin"]}>
                <CreateCompany/>
              </PrivateRoute>}
            />
          </Route>
          <Route element={<ConfirmLayout />}>
            <Route path="/ConfirmEmail/:state" element={
              <PrivateRoute pageRoles={["api"]}>
                <ConfirmEmail />
              </PrivateRoute>
            } />
          </Route>
          <Route exact path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
