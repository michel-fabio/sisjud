import React from 'react';
import SideBarAdvogado from '../components/SideBarAdvogado';

const cardsData = [
    { title: 'Atendimentos Realizados no Mês', value: 150, color: 'linear-gradient(to right, #5de0e6, #004aad)' },
    { title: 'Atendimentos com processos em andamento', value: 81, color: 'linear-gradient(to right, #ff3131, #ff914d)' },
    { title: 'Causas Ganhas', value: 324, color: 'linear-gradient(to right, #0097b2, #7ed957)' },
  ];

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
    return (
      <div style={{ display: 'flex' }}>
        <SideBarAdvogado />
        
          {/* Ícone no canto superior direito */}
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