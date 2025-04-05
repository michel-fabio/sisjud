import React from 'react';
import { Menu } from 'primereact/menu';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { logout } from '../services/auth.js';

const SideBarAdministrador = () => {
  const navigate = useNavigate();
  const token_decodificado = jwtDecode(localStorage.getItem("token"));

  const items = [
    { label: 'Início', icon: 'pi pi-home', command: () => navigate('/inicio-administrador') },
    { label: 'Advogados Afiliados', icon: 'pi pi-briefcase', command: () => navigate('/advogados-afiliados') },
    { label: 'Clientes', icon: 'pi pi-users', command: () => navigate('/listar-clientes') },
  ];

  const logoutItem = [
    {
      label: 'Sair',
      icon: 'pi pi-sign-out',
      command: () => logout('/login-advogado')
    },
  ];

  return (
    <div style={{
      width: '220px',
      backgroundColor: '#0097b2',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '10px',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}>
        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" style={{ width: '60px', borderRadius: '50%' }} />
        <h3 style={{ marginTop: '10px', fontSize: '16px' }}>{token_decodificado.nome}</h3>
      </div>

      <div style={{ flex: 1, width: '100%' }}>
        <Menu model={items} style={{ border: 'none', backgroundColor: '#0097b2', color: 'white', width: '100%' }} className="custom-menu-adm" />
      </div>

      <Menu model={logoutItem} style={{ border: 'none', backgroundColor: '#0097b2', color: 'white', width: '100%' }} className="custom-menu-adm" />
    </div>
  );
};

export default SideBarAdministrador;
