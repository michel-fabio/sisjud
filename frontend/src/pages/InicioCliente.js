import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import api from '../services/api'; 
import SideBarCliente from '../components/SideBarCliente';

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
        Atendimento - {atendimento.numero}
      </h3>
      <p><strong>Área:</strong> {atendimento.area}</p>
      <p><strong>Assunto:</strong> {atendimento.assunto_nome}</p>
      <p><strong>Advogado:</strong> {atendimento.advogado ? atendimento.advogado : "Advogado ainda não foi definido"}</p>
      <p><strong>OAB:</strong> {atendimento.oab ? atendimento.oab : "Advogado ainda não foi definido"}</p>
      <p><strong>Data:</strong> {atendimento.data}</p>
      <p><strong>Valor da Causa:</strong> R$ {Number(atendimento.valor).toLocaleString()}</p>
      <p><strong>Status:</strong> {atendimento.status_display}</p>
    </div>
  );
};

const InicioCliente = () => {
  const [atendimentos, setAtendimentos] = useState([]);
  const location = useLocation();
  const toast = useRef(null);

  useEffect(() => {
    if (location.state?.showToast) {
      toast.current?.show({
        severity: "success",
        summary: "Sucesso",
        detail: "Login realizado com sucesso!",
        life: 1500,
      });
  
      // Limpa o estado da navegação para evitar que o toast apareça de novo
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    const fetchAtendimentos = async () => {
      try {
        const response = await api.get("atendimentos/atendimentos/");

        setAtendimentos(response.data);
      } catch (error) {
        console.error('Erro ao carregar atendimentos:', error);
      }
    };
  
    fetchAtendimentos();
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <Toast ref={toast} />
      <SideBarCliente />
      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <div style={{ position: 'absolute', top: '10px', right: '20px' }}>
          <img
            src="/logo.png"
            alt="Ícone do Sistema"
            style={{ width: '70px', height: '70px' }}
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
            <AtendimentoCard key={atendimento.numero} atendimento={atendimento} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InicioCliente;
