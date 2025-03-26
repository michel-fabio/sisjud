import React from 'react';
import { Menu } from 'primereact/menu';
import { useNavigate } from 'react-router-dom';

const SideBarAdvogado = () => {
  const navigate = useNavigate();

  const items = [
    { label: 'Início', icon: 'pi pi-home', command: () => navigate('/inicio-advogado') },
    { label: 'Atendimentos do Dia', icon: 'pi pi-comments', command: () => navigate('/atendimentos-hoje') },
    { label: 'Atendimentos Realizados', icon: 'pi pi-check-circle', command: () => navigate('/atendimentos-realizados') },
  ];

  const logoutItem = [
    {
      label: 'Sair',
      icon: 'pi pi-sign-out',
      command: () => {
        localStorage.removeItem("token"); // limpa o token
        navigate('/advogado');
      },
    },
  ];

  return (
    <div style={{
      width: '220px',
      backgroundColor: '#00bf63',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '10px',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}>
        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" style={{ width: '60px', borderRadius: '50%' }} />
        <h3 style={{ marginTop: '10px', fontSize: '16px' }}>Nome do Advogado</h3>
      </div>

      <div style={{ flex: 1, width: '100%' }}>
        <Menu model={items} style={{ border: 'none', backgroundColor: '#00bf63', color: 'white', width: '100%' }} className="custom-menu-advogado" />
      </div>

      <Menu model={logoutItem} style={{ border: 'none', backgroundColor: '#00bf63', color: 'white', width: '100%' }} className="custom-menu-advogado" />
    </div>
  );
};

export default SideBarAdvogado;
