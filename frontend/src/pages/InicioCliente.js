import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
      <p><strong>Assunto:</strong> {atendimento.assunto}</p>
      <p><strong>Advogado:</strong> {atendimento.advogado ? atendimento.advogado : "Advogado ainda não foi definido"}</p>
      <p><strong>OAB:</strong> {atendimento.oab ? atendimento.oab : "Advogado ainda não foi definido"}</p>
      <p><strong>Data:</strong> {atendimento.data}</p>
      <p><strong>Valor da Causa:</strong> R$ {Number(atendimento.valor).toLocaleString()}</p>
      <p><strong>Status:</strong> {atendimento.status}</p>
    </div>
  );
};

const InicioCliente = () => {
  const [atendimentos, setAtendimentos] = useState([]);

  useEffect(() => {
    const fetchAtendimentos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('atendimentos/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAtendimentos(response.data);
      } catch (error) {
        console.error('Erro ao carregar atendimentos:', error);
      }
    };
  
    fetchAtendimentos();
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <SideBarCliente />
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
            <AtendimentoCard key={atendimento.numero} atendimento={atendimento} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InicioCliente;