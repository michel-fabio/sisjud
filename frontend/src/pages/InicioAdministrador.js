import React, { useEffect, useState } from 'react';
import api from '../services/api';
import SideBarAdministrador from '../components/SideBarAdministrador';

const cardStyle = {
  color: 'white',
  borderRadius: '10px',
  padding: '20px',
  width: '500px',
  height: '150px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
};

const gridContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  justifyContent: 'flex-start',
};

function InicioAdministrador() {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('atendimentos/dashboard-admin/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setDados(response.data);
      } catch (err) {
        console.error('Erro ao buscar dados do dashboard:', err);
      }
    };

    carregarDados();
  }, []);

  if (!dados) return <div>Carregando...</div>;

  const cardsData = [
    { title: 'Atendimentos Realizados no Mês', value: dados.total_mes, color: 'linear-gradient(to right, #5de0e6, #004aad)' },
    { title: 'Atendimentos com processos em andamento', value: dados.em_andamento, color: 'linear-gradient(to right, #ff3131, #ff914d)' },
    { title: 'Advogados Afiliados', value: dados.advogados, color: 'linear-gradient(to right, #8c52ff, #5ce1e6)' },
    { title: 'Clientes Cadastrados', value: dados.clientes, color: 'linear-gradient(to right, #ff66c4, #ffde59)' },
    { title: 'Causas Ganhas', value: dados.causas_ganhas, color: 'linear-gradient(to right, #0097b2, #7ed957)' },
    { title: 'Valor em Honorários', value: `R$ ${dados.honorarios.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, color: 'linear-gradient(to right, #000000, #c89116)' },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <SideBarAdministrador />

      <div style={{ position: 'absolute', top: '10px', right: '20px', zIndex: 1 }}>
        <img src="./logo.png" alt="Ícone do Sistema" style={{ width: '40px', height: '40px' }} />
      </div>

      <div style={{ flex: 1, padding: '2rem' }}>
        <div style={gridContainerStyle}>
          {cardsData.map((card, index) => (
            <div key={index} style={{ ...cardStyle, background: card.color }}>
              <h4 style={{ margin: 0, fontWeight: 700 }}>{card.title}</h4>
              <h1 style={{ margin: '10px 0 0', fontSize: '3.5rem' }}>{card.value}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InicioAdministrador;
