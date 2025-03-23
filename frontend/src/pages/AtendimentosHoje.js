import React, { useEffect, useState } from 'react';
import SideBarAdvogado from '../components/SideBarAdvogado';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AtendimentoCard = ({ atendimento, onIniciar }) => {
  return (
    <div style={{
      backgroundColor: '#f4f6f8',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '15px',
      marginBottom: '15px',
      borderLeft: '6px solid #00bf63'
    }}>
      <h3 style={{ backgroundColor: '#00bf63', color: 'white', padding: '8px', borderRadius: '4px' }}>
        Atendimento - {atendimento.id}
      </h3>
      <p><strong>Área:</strong> {atendimento.area}</p>
      <p><strong>Assunto:</strong> {atendimento.assunto}</p>
      <p><strong>Cliente:</strong> {atendimento.cliente}</p>

      <div style={{ marginTop: '10px' }}>
        <Button 
          label="Iniciar Atendimento"
          icon="pi pi-play"
          className="p-button-success"
          onClick={() => onIniciar(atendimento.id)}
        />
      </div>
    </div>
  );
};

const AtendimentosHoje = () => {
  const [atendimentos, setAtendimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const carregarAtendimentos = async () => {
      setLoading(true); // inicia o loading
      try {
        const response = await api.get('/atendimentos-hoje/');
        setAtendimentos(response.data);
      } catch (error) {
        console.error("Erro ao carregar atendimentos:", error);
        // Fallback mock:
        setAtendimentos([
          { id: '001', area: 'Consumidor', assunto: 'Cobrança indevida', cliente: 'João Silva' },
          { id: '002', area: 'Trabalhista', assunto: 'Demissão sem justa causa', cliente: 'Maria Souza' },
          { id: '003', area: 'Civil', assunto: 'Indenização por danos', cliente: 'Carlos Alberto' },
        ]);
      }
      setLoading(false); // encerra o loading
    };

    carregarAtendimentos();
  }, []);

  const iniciarAtendimento = (id) => {
    navigate(`/atendimento/${id}`);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <SideBarAdvogado />
      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <div style={{ position: 'absolute', top: '10px', right: '20px' }}>
          <img src="/logo.png" alt="Ícone do Sistema" style={{ width: '40px', height: '40px' }} />
        </div>
        <h2>Atendimentos do Dia</h2>

        <div style={{
          flex: 1,
          overflowY: 'auto',
          paddingRight: '10px',
          maxHeight: 'calc(100vh - 60px)'
        }}>
          {loading ? (
            <div className="flex justify-content-center align-items-center" style={{ height: '100%' }}>
              <ProgressSpinner />
            </div>
          ) : (
            atendimentos.map(atendimento => (
              <AtendimentoCard 
                key={atendimento.id} 
                atendimento={atendimento} 
                onIniciar={iniciarAtendimento} 
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AtendimentosHoje;
