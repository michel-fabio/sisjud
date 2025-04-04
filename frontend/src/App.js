import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Login from "./pages/Login";
import LoginAdvogado from "./pages/LoginAdvogado";
import Cadastro from "./pages/Cadastro";
import SolicitarAtendimento from "./pages/SolicitarAtendimento";
import CancelarAtendimento from "./pages/CancelarAtendimento";
import InicioCliente from "./pages/InicioCliente";
import InicioAdministrador from "./pages/InicioAdministrador";
import AdvogadosAfiliados from "./pages/AdvogadosAfiliados";
import ListarClientes from "./pages/ListarClientes";
import InicioAdvogado from "./pages/InicioAdvogado";
import AtendimentosHoje from "./pages/AtendimentosHoje";
import Atendimento from "./pages/Atendimento";
import AtendimentosRealizados from "./pages/AtendimentosRealizados";
import PrivateRoute from "./components/PrivateRoute";
import './App.css';


function AppContent() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login-advogado" element={<LoginAdvogado />} />

        <Route element={<PrivateRoute allowedRoles={['cliente']} />}>
          <Route path="/inicio-cliente" element={<InicioCliente />} />
          <Route path="/solicitar-atendimento" element={<SolicitarAtendimento />} />
          <Route path="/cancelar-atendimento" element={<CancelarAtendimento />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={['advogado']} />}>
          <Route path="/inicio-advogado" element={<InicioAdvogado />} />
          <Route path="/atendimento" element={<Atendimento />} />
          <Route path="/atendimentos-hoje" element={<AtendimentosHoje />} />
          <Route path="/atendimentos-realizados" element={<AtendimentosRealizados />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route path="/inicio-administrador" element={<InicioAdministrador />} />
          <Route path="/advogados-afiliados" element={<AdvogadosAfiliados />} />
          <Route path="/listar-clientes" element={<ListarClientes />} />
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

