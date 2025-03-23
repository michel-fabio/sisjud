import React, { useEffect, useState } from 'react';
import SideBarAdvogado from '../components/SideBarAdvogado';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import api from '../services/api';

const AtendimentosRealizados = () => {
  const [atendimentos, setAtendimentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarAtendimentos = async () => {
      setLoading(true);
      try {
        const response = await api.get('/atendimentos-finalizados/');
        setAtendimentos(response.data);
      } catch (error) {
        console.error('Erro ao buscar atendimentos finalizados:', error);
        // Fallback temporário com dados mockados
        setAtendimentos([
          {
            id: '2301010001',
            data: '01/01/2023',
            processo: '1490631-91.2025.6.07.8257',
            assunto: 'Acidente de Trânsito',
            cliente: 'Cliente 1',
            status: 'Finalizado com causa ganha',
            valor: 20000,
          },
          {
            id: '2301010002',
            data: '01/01/2023',
            processo: '5758254-93.2025.1.00.5748',
            assunto: 'Demissão sem aviso prévio',
            cliente: 'Cliente 2',
            status: 'Finalizado com causa perdida',
            valor: 35000,
          },
          {
            id: '2301020001',
            data: '02/01/2023',
            processo: '5293213-57.2025.7.09.4856',
            assunto: 'Cobrança Indevida',
            cliente: 'Cliente 3',
            status: 'Aguardando a sentença do Juiz',
            valor: 5000,
          },
        ]);
      }
      setLoading(false);
    };

    carregarAtendimentos();
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <SideBarAdvogado />
      <div style={{ flex: 1, padding: '20px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '10px', right: '20px' }}>
          <img src="/logo.png" alt="Ícone do Sistema" style={{ width: '40px', height: '40px' }} />
        </div>

        <h2>Atendimentos Realizados</h2>

        {loading ? (
          <div className="flex justify-content-center align-items-center" style={{ height: '80%' }}>
            <ProgressSpinner />
          </div>
        ) : (
          <div style={{ overflowX: 'auto', marginTop: '20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: '#00bf63', color: 'white' }}>
                <tr>
                  <th style={thStyle}>Data do Atendimento</th>
                  <th style={thStyle}>Número do Atendimento</th>
                  <th style={thStyle}>Processo</th>
                  <th style={thStyle}>Assunto</th>
                  <th style={thStyle}>Cliente</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Valor da Causa</th>
                  <th style={thStyle}></th>
                </tr>
              </thead>
              <tbody>
                {atendimentos.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #ccc' }}>
                    <td style={tdStyle}>{item.data}</td>
                    <td style={tdStyle}>{item.id}</td>
                    <td style={tdStyle}>{item.processo}</td>
                    <td style={tdStyle}>{item.assunto}</td>
                    <td style={tdStyle}>{item.cliente}</td>
                    <td style={tdStyle}>{item.status}</td>
                    <td style={tdStyle}>R$ {item.valor.toLocaleString('pt-BR')}</td>
                    <td style={{ textAlign: 'center' }}>
                        <Button 
                            icon="pi pi-pen-to-square" 
                            className="p-button-rounded p-button-text" 
                            style={{ color: '#00bf63' }} 
                        />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const thStyle = {
  padding: '12px',
  textAlign: 'left',
  fontWeight: 'bold',
};

const tdStyle = {
  padding: '10px',
};

export default AtendimentosRealizados;
