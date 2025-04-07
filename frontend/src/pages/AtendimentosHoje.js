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
        const response = await api.get('/atendimentos/hoje-advogado/');
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
    <div style={{ display: 'flex', position: 'relative' }}>
      <SideBarAdvogado />

      <div style={{ flex: 1, padding: '2rem' }}>
        <div style={{ position: 'absolute', top: '10px', right: '20px' }}>
          <img src="/logo.png" alt="Ícone do Sistema" style={{ width: '70px', height: '70px' }} />
        </div>
        <h2 style={{ marginBottom: '2rem' }}>Atendimentos de Hoje</h2>

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
  );
}

export default AtendimentosHoje;