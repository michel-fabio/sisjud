import React, { useEffect, useState } from 'react';
import SideBarAdvogado from '../components/SideBarAdvogado';
import AtendimentoCard from '../components/AtendimentoCard';
import api from '../services/api';

function AtendimentosHoje() {
  const [atendimentos, setAtendimentos] = useState([]);

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

  return (
    <div style={{ display: 'flex', position: 'relative' }}>
      <SideBarAdvogado />

      <div style={{ flex: 1, padding: '2rem' }}>
        <h2 style={{ marginBottom: '2rem' }}>Atendimentos de Hoje</h2>

        <div className="p-grid">
          {atendimentos.map((atendimento) => (
            <div className="p-col-12 p-md-6 p-lg-4" key={atendimento.id}>
              <AtendimentoCard
                atendimento={atendimento}
                onIniciar={(id) => console.log("Iniciar atendimento:", id)}
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
