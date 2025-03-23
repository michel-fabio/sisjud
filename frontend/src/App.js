import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Login from "./pages/Login";
import LoginAdvogado from "./pages/LoginAdvogado";
import Cadastro from "./pages/Cadastro";
import Dashboard from "./pages/Dashboard";
import SolicitarAtendimento from "./pages/SolicitarAtendimento";
import CancelarAtendimento from "./pages/CancelarAtendimento";
import InicioCliente from "./pages/InicioCliente";
import InicioAdministrador from "./pages/InicioAdministrador";
import AdvogadosAfiliados from "./pages/AdvogadosAfiliados";
import ListarClientes from "./pages/ListarClientes";
import Processos from "./pages/Processos";
import Relatorios from "./pages/Relatorios";
import PrivateRoute from "./components/PrivateRoute";
import './App.css';


function AppContent() {
  const location = useLocation();
  const hideHeaderRoutes = ["/", "/register", "/advogado"]; // Rotas onde o Header NÃO deve aparecer

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Cadastro />} />
        <Route path="/advogado" element={<LoginAdvogado />} />
        <Route path="/inicio-cliente" element={<InicioCliente />} />
        <Route path="/solicitar-atendimento" element={<SolicitarAtendimento />} />
        <Route path="/cancelar-atendimento" element={<CancelarAtendimento />} />
        <Route path="/inicio-administrador" element={<InicioAdministrador />} />
        <Route path="/advogados-afiliados" element={<AdvogadosAfiliados />} />
        <Route path="/listar-clientes" element={<ListarClientes />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          
          <Route path="/processos" element={<Processos />} />
          <Route path="/relatorios" element={<Relatorios />} />     
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

