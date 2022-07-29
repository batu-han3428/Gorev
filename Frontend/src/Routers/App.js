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



const App = () =>{
  return(
    <BrowserRouter>
      <Routes>
          <Route exact element={<Layout />}>
            <Route exact path="/" element={<Home/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/ev" element={<Home/>} />
            <Route path="/signin" element={<SignIn/>} />
            <Route path="/giris" element={<SignIn/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/kayit" element={<SignUp/>} />
            <Route path="/createtask" element={
              <PrivateRoute pageRoles={["Yönetici"]}>
                <CreateTask/>
              </PrivateRoute>}
            />  
            <Route path="/gorevolustur" element={
              <PrivateRoute pageRoles={["Yönetici"]}>
                <CreateTask/>
              </PrivateRoute>}
            /> 
            <Route path="/listtask" element={
              <PrivateRoute pageRoles={["Yönetici","Personel"]}>
                <ListTask/>
              </PrivateRoute>}
            />   
            <Route path="/gorevlistele" element={
              <PrivateRoute pageRoles={["Yönetici","Personel"]}>
                <ListTask/>
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
          <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
