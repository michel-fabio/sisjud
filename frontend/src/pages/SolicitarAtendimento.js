import React, { useState } from 'react';
import { Menu } from 'primereact/menu';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

import { addLocale } from 'primereact/api';

// Configuração do locale para o Brasil
addLocale('pt-BR', {
  firstDayOfWeek: 1,
  dayNames: ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'],
  dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
  dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  monthNames: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
  monthNamesShort: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
  today: 'Hoje',
  clear: 'Limpar'
});

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
  
  const SolicitarAtendimento = () => {
    const [area, setArea] = useState(null);
    const [assunto, setAssunto] = useState(null);
    const [data, setData] = useState(null);
  
    const areas = [
      { label: 'Consumidor', value: 'Consumidor' },
      { label: 'Trabalhista', value: 'Trabalhista' },
      { label: 'Família', value: 'Família' },
      { label: 'Civil', value: 'Civil' },
      { label: 'Penal', value: 'Penal' }
    ];
  
    const assuntos = [
      { label: 'Cobrança indevida', value: 'Cobrança indevida' },
      { label: 'Demissão sem aviso prévio', value: 'Demissão sem aviso prévio' },
      { label: 'Pedido de Alimentos', value: 'Pedido de Alimentos' },
      { label: 'Danos materiais', value: 'Danos materiais' },
      { label: 'Defesa criminal', value: 'Defesa criminal' }
    ];
  
    return (
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', position: 'relative' }}>
        <SidebarMenu />
        <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {/* Ícone do sistema no canto superior direito */}
          <div style={{ position: 'absolute', top: '10px', right: '20px' }}>
            <img
              src="./logo.png"
              alt="Ícone do Sistema"
              style={{ width: '40px', height: '40px' }}
            />
          </div>
  
          <div style={{
            backgroundColor: '#f4f6f8',
            borderRadius: '8px',
            padding: '30px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            width: '50%',
            textAlign: 'center'
          }}>
            <h2 style={{ color: '#3f51b5', textAlign: 'left' }}>NOVO AGENDAMENTO</h2>
            <p style={{ textAlign: 'left' }}>Solicite aqui um novo agendamento.</p>
  
            <Dropdown
              value={area}
              options={areas}
              onChange={(e) => setArea(e.value)}
              placeholder="Selecione a Área"
              style={{ width: '100%', marginBottom: '10px' }}
            />
  
            <Dropdown
              value={assunto}
              options={assuntos}
              onChange={(e) => setAssunto(e.value)}
              placeholder="Selecione o Assunto"
              style={{ width: '100%', marginBottom: '10px' }}
            />
  
            <Calendar
              value={data}
              onChange={(e) => setData(e.value)}
              placeholder="Selecione a Data"
              style={{ width: '100%', marginBottom: '20px' }}
              dateFormat="dd/mm/yy"
              locale="pt-BR"
              disabledDays={[0, 6]}
            />
  
            <Button label="Confirmar" className="p-button-primary" style={{ width: '100%', backgroundColor: '#3f51b5', border: 'none' }} />
          </div>
        </div>
      </div>
    );
  };
  
  export default SolicitarAtendimento;