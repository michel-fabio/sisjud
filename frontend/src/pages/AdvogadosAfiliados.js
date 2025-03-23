import React from 'react';
import SideBarAdministrador from '../components/SideBarAdministrador';

function AdvogadosAfiliados() {
  const advogados = [
    { nome: 'Advogado 1', area: 'Cível, Consumidor e Família', oab: '1234' },
    { nome: 'Advogado 2', area: 'Criminal', oab: '5678' },
    { nome: 'Advogado 3', area: 'Trabalhista e Tributária', oab: '9012' },
  ];

  return (
    <div style={{ display: 'flex', position: 'relative' }}>
      <SideBarAdministrador />

      <div style={{ flex: 1, padding: '2rem', position: 'relative' }}>
        {/* Ícone no canto superior direito */}
        <div style={{ position: 'absolute', top: '10px', right: '20px', zIndex: 1 }}>
          <img src="./logo.png" alt="Ícone do Sistema" style={{ width: '40px', height: '40px' }} />
        </div>

        {/* Botão no topo direito (alinhado ao conteúdo, não ao ícone) */}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem', marginTop: '3rem' }}>
          <button style={{
            backgroundColor: '#0097b2',
            color: 'white',
            padding: '15px 25px',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '14px',
          }}>
            + Cadastrar Advogado
          </button>
        </div>

        {/* Tabela */}
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          border: '2px solid #a0b4ff',
        }}>
          <thead>
            <tr style={{ backgroundColor: '#0097b2', color: 'white' }}>
              <th style={thStyle}>ADVOGADO</th>
              <th style={thStyle}>ÁREA</th>
              <th style={thStyle}>NÚMERO OAB</th>
            </tr>
          </thead>
          <tbody>
            {advogados.map((adv, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f6f8fb' : 'white' }}>
                <td style={tdStyle}>{adv.nome}</td>
                <td style={tdStyle}>{adv.area}</td>
                <td style={tdStyle}>{adv.oab}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle = {
  padding: '16px',
  textAlign: 'center',
  fontSize: '16px',
};

const tdStyle = {
  padding: '16px',
  textAlign: 'center',
  fontSize: '15px',
  borderTop: '1px solid #a0b4ff',
};

export default AdvogadosAfiliados;
