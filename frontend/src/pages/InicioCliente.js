import React from 'react';
import { Menu } from 'primereact/menu';
import { useNavigate } from 'react-router-dom';

const SidebarMenu = () => {
  const navigate = useNavigate();

  const items = [
    { label: 'Início', icon: 'pi pi-home', command: () => navigate('/inicio-cliente') },
    { label: 'Novo Agendamento', icon: 'pi pi-calendar', command: () => navigate('/solicitar-atendimento') },
    { label: 'Cancelar Agendamento', icon: 'pi pi-times', command: () => navigate('/cancelar-atendimento') },
  ];

  const logoutItem = [
    { label: 'Sair', icon: 'pi pi-sign-out', command: () => navigate('/') },
  ];

  return (
    <div
      style={{
        width: '220px',
        backgroundColor: '#3f51b5',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px',
      }}
    >
      {/* Perfil do Usuário */}
      <div style={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}>
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="Avatar"
          style={{ width: '60px', borderRadius: '50%' }}
        />
        <h3 style={{ marginTop: '10px', fontSize: '16px' }}>Nome do Cliente</h3>
      </div>
      
      <div style={{ flex: 1, width: '100%' }}>
        <Menu model={items} style={{ border: 'none', backgroundColor: '#3f51b5', color: 'white', width: '100%' }} className="custom-menu" />
      </div>
      
      <Menu model={logoutItem} style={{ border: 'none', backgroundColor: '#3f51b5', color: 'white', width: '100%' }} className="custom-menu" />
    </div>
  );
};

const AtendimentoCard = ({ atendimento }) => {
  return (
    <div style={{
      backgroundColor: '#f4f6f8',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '15px',
      marginBottom: '15px',
      borderLeft: '6px solid #3f51b5'
    }}>
      <h3 style={{ backgroundColor: '#3f51b5', color: 'white', padding: '8px', borderRadius: '4px' }}>
        Atendimento - {atendimento.id}
      </h3>
      <p><strong>Área:</strong> {atendimento.area}</p>
      <p><strong>Assunto:</strong> {atendimento.assunto}</p>
      <p><strong>Advogado:</strong> {atendimento.advogado}</p>
      <p><strong>OAB:</strong> {atendimento.oab}</p>
      <p><strong>Data:</strong> {atendimento.data}</p>
      <p><strong>Valor da Causa:</strong> R$ {atendimento.valor.toLocaleString()}</p>
      <p><strong>Status:</strong> {atendimento.status}</p>
    </div>
  );
};

const InicioCliente = () => {
  const atendimentos = [
    { id: '00003', area: 'Consumidor', assunto: 'Cobrança indevida', advogado: 'Nome do Advogado', oab: '1234', data: '01/01/2023', valor: 10000, status: 'Aguardando a decisão do Juiz' },
    { id: '00002', area: 'Trabalhista', assunto: 'Demissão sem aviso prévio', advogado: 'Nome do Advogado', oab: '5678', data: '01/01/2022', valor: 15000, status: 'Aguardando entrega de documentação pendente' },
    { id: '00001', area: 'Família', assunto: 'Pedido de Alimentos', advogado: 'Nome do Advogado', oab: '1234', data: '01/01/2021', valor: 2000, status: 'Processo protocolado no Tribunal de Justiça' },
    { id: '00004', area: 'Civil', assunto: 'Danos materiais', advogado: 'Nome do Advogado', oab: '4321', data: '10/02/2024', valor: 8000, status: 'Em andamento' },
    { id: '00005', area: 'Penal', assunto: 'Defesa em processo criminal', advogado: 'Nome do Advogado', oab: '8765', data: '15/03/2024', valor: 50000, status: 'Aguardando audiência' }
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <SidebarMenu />
      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <div style={{ position: 'absolute', top: '10px', right: '20px' }}>
          <img
            src="/logo.png"
            alt="Ícone do Sistema"
            style={{ width: '40px', height: '40px' }}
          />
        </div>
        <h2>Atendimentos Realizados</h2>
        <div style={{
          flex: 1,
          overflowY: 'auto',
          paddingRight: '10px',
          maxHeight: 'calc(100vh - 60px)'
        }}>
          {atendimentos.map(atendimento => (
            <AtendimentoCard key={atendimento.id} atendimento={atendimento} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InicioCliente;
