import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Menu from "./components/Pages/Menu/menu.js";
import HistAPGet from './components/Pages/Aproveitamento/Get/Get.js';
import HistAPPost from './components/Pages/Aproveitamento/Post/Post.js';
import HistAPPut from './components/Pages/Aproveitamento/Put/Put.js';
import MPGet from "./components/Pages/Materia_Prima/Get/Get.js";
import MPPost from "./components/Pages/Materia_Prima/Post/Post.js";
import MPPut from './components/Pages/Materia_Prima/Put/Put.js';
import Login from "./components/Layout/Login/Login.js";
import UserGet from './components/Pages/Usuarios/Get/Get.js';
import UserPost from './components/Pages/Usuarios/Post/Post.js';
import UserPut from './components/Pages/Usuarios/Put/Put.js';
import CMGet from "./components/Pages/Custo_maquina/Get/Get_CM.js";
import CMPost from "./components/Pages/Custo_maquina/Post/Post_CM.js";
import CMPut from "./components/Pages/Custo_maquina/Put/Put_CM.js"
import HOGet from "./components/Pages/Orcamento/Get/Get.js"
import HOPut from "./components/Pages/Orcamento/Put/Put.js";
import HOPost from "./components/Pages/Orcamento/Post/Post.js";
import HMFGet from "./components/Pages/Mudanca_Fator/Get/Get.js"
import HMFPost from "./components/Pages/Mudanca_Fator/Post/Post.js"
import HMFPut from "./components/Pages/Mudanca_Fator/Put/Put.js"
import HMFDelete from "./components/Pages/Mudanca_Fator/Delete/Delete.js"

const isAuthenticated = () => {

  return localStorage.getItem("token");

};

function App() {

  return (

    <BrowserRouter className='body'>

      <Routes>

        <Route path="/" element={<Navigate to="/Login" />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Materia_Prima/Get" element={isAuthenticated() ? <MPGet /> : <Navigate to="/Login" />} />
        <Route path="/Materia_Prima/Post" element={isAuthenticated() ? <MPPost /> : <Navigate to="/Login" />} />
        <Route path="/Materia_Prima/Put" element={isAuthenticated() ? <MPPut /> : <Navigate to="/Login" />} />
        <Route path="/menu" element={isAuthenticated() ? <Menu /> : <Navigate to="/Login" />} />
        <Route path="/Custo_Maquina/Get" element={isAuthenticated() ? <CMGet /> : <Navigate to="/Login" />} />
        <Route path="/Custo_Maquina/Post" element={isAuthenticated() ? <CMPost /> : <Navigate to="/Login" />} />
        <Route path="/Custo_Maquina/Put" element={isAuthenticated() ? <CMPut /> : <Navigate to="/Login" />} />
        <Route path="/Custo_Maquina/Mudanca_Fator/Get" element={isAuthenticated() ? <HMFGet /> : <Navigate to="/Login" />} />
        <Route path="/Custo_Maquina/Mudanca_Fator/Post" element={isAuthenticated() ? <HMFPost /> : <Navigate to="/Login" />} />
        <Route path="/Custo_Maquina/Mudanca_Fator/Put" element={isAuthenticated() ? <HMFPut /> : <Navigate to="/Login" />} />
        <Route path="/Custo_Maquina/Mudanca_Fator/Delete" element={isAuthenticated() ? <HMFDelete /> : <Navigate to="/Login" />} />
        <Route path="/Historico_Aproveitamento/Get" element={isAuthenticated() ? <HistAPGet /> : <Navigate to="/Login" />} />
        <Route path="/Historico_Aproveitamento/Post" element={isAuthenticated() ? <HistAPPost /> : <Navigate to="/Login" />} />
        <Route path="/Historico_Aproveitamento/Put" element={isAuthenticated() ? <HistAPPut /> : <Navigate to="/Login" />} />
        <Route path="/Usuario/Get" element={isAuthenticated() ? <UserGet /> : <Navigate to="/Login" />} />
        <Route path="/Usuario/Post" element={isAuthenticated() ? <UserPost /> : <Navigate to="/Login" />} />
        <Route path="/Usuario/Put" element={isAuthenticated() ? <UserPut /> : <Navigate to="/Login" />} />
        <Route path="/Orcamentos/Get" element={isAuthenticated() ? <HOGet /> : <Navigate to="/Login" />} />
        <Route path="/Orcamentos/Post" element={isAuthenticated() ? <HOPost /> : <Navigate to="/Login" />} />
        <Route path="/Orcamentos/Put" element={isAuthenticated() ? <HOPut /> : <Navigate to="/Login" />} />

      </Routes>

    </BrowserRouter>

  );
  
}

export default App;