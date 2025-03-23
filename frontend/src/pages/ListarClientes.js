import React from 'react';
import SideBarAdministrador from '../components/SideBarAdministrador';

function ListarClientes() {
  const clientes = [
    { nome: 'Cliente 1', email: 'E-mail Cliente 1' },
    { nome: 'Cliente 2', email: 'E-mail Cliente 2' },
    { nome: 'Cliente 3', email: 'E-mail Cliente 3' },
  ];

  return (
    <div style={{ display: 'flex', position: 'relative' }}>
      <SideBarAdministrador />

      <div style={{ flex: 1, padding: '2rem', position: 'relative' }}>
        {/* Ícone do sistema no canto superior direito */}
        <div style={{ position: 'absolute', top: '10px', right: '20px' }}>
          <img src="./logo.png" alt="Ícone do Sistema" style={{ width: '40px', height: '40px' }} />
        </div>

        {/* Tabela de clientes */}
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          border: '2px solid #a0b4ff',
          marginTop: '3rem',
        }}>
          <thead>
            <tr style={{ backgroundColor: '#0097b2', color: 'white' }}>
              <th style={thStyle}>CLIENTE</th>
              <th style={thStyle}>E-MAIL</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f6f8fb' : 'white' }}>
                <td style={tdStyle}>{cliente.nome}</td>
                <td style={tdStyle}>{cliente.email}</td>
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

export default ListarClientes;
