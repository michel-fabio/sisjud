import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBarAdvogado from '../components/SideBarAdvogado';
import AtendimentoCard from '../components/AtendimentoCard';
import api from '../services/api';

function AtendimentosHoje() {
  const [atendimentos, setAtendimentos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAtendimentos = async () => {
      try {
        const response = await api.get('atendimentos/hoje-advogado/');
        setAtendimentos(response.data);
      } catch (error) {
        console.error("Erro ao buscar atendimentos de hoje:", error);
        setAtendimentos([]);
      }
    };

    fetchAtendimentos();
  }, []);

  const iniciarAtendimento = (atendimentoId) => {
    const atendimentoSelecionado = atendimentos.find(a => a.id === atendimentoId);
    if (atendimentoSelecionado) {
      navigate('/atendimento', { state: { atendimento: atendimentoSelecionado } });
    }
  };

  return (
    <div style={{ display: 'flex', position: 'relative', height: '100vh' }}>
      <SideBarAdvogado />

      <div style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ position: 'absolute', top: '10px', right: '20px', zIndex: 10 }}>
          <img src="/logo.png" alt="Ícone do Sistema" style={{ width: '70px', height: '70px' }} />
        </div>

        <h2 style={{ marginBottom: '1rem', flexShrink: 0 }}>Atendimentos de Hoje</h2>

        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '1rem' }}>
          <div className="p-grid">
            {atendimentos.map((atendimento) => (
              <div className="p-col-12 p-md-6 p-lg-4" key={atendimento.id}>
                <AtendimentoCard
                  atendimento={atendimento}
                  onIniciar={iniciarAtendimento}
                />
              </div>
            ))}

            {atendimentos.length === 0 && (
              <p>Nenhum atendimento agendado para hoje.</p>
            )}
          </div>
        </div>
      </div>
    </div>

  );
}

export default AtendimentosHoje;