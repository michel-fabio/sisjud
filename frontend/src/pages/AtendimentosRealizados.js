import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBarAdvogado from '../components/SideBarAdvogado';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import api from '../services/api';

function AtendimentosRealizados() {
  const [atendimentos, setAtendimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAtendimentos = async () => {
      try {
        const response = await api.get('/atendimentos/finalizados/');
        setAtendimentos(response.data);
      } catch (error) {
        console.error('Erro ao buscar atendimentos finalizados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAtendimentos();
  }, []);

  const irParaDetalhes = (atendimento) => {
    navigate('/atendimento', { state: { atendimento } });
  };

  const headerStyle = {
    backgroundColor: '#00bf63',
    color: 'white',
    textAlign: 'left'
  };

  const botoesAcoes = (rowData) => (
    <Button
      icon="pi pi-file-edit"
      className="p-button-text p-button-rounded"
      style={{ color: '#00bf63' }}
      onClick={() => irParaDetalhes(rowData)}
    />
  );

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <SideBarAdvogado />
      <div style={{ flex: 1, padding: '2rem' }}>
        <div style={{ position: 'absolute', top: '10px', right: '20px' }}>
          <img src="/logo.png" alt="Ícone do Sistema" style={{ width: '40px', height: '40px' }} />
        </div>

        <h2>Atendimentos Realizados</h2>

        {loading ? (
          <div className="flex justify-content-center align-items-center" style={{ height: '80%' }}>
            <ProgressSpinner />
          </div>
        ) : (
          <DataTable
            value={atendimentos}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 20]}
            stripedRows
            filterDisplay="row"
            emptyMessage="Nenhum atendimento encontrado."
            style={{ marginTop: '1rem' }}
          >
            <Column field="data" header="DATA" filter filterPlaceholder="Filtrar" filterMatchMode="contains" style={{ textAlign: 'left' }} headerStyle={headerStyle} />
            <Column field="cliente" header="CLIENTE" filter filterPlaceholder="Filtrar" filterMatchMode="contains" style={{ textAlign: 'left' }} headerStyle={headerStyle} />
            <Column field="numero" header="NÚMERO" filter filterPlaceholder="Filtrar" filterMatchMode="contains" style={{ textAlign: 'left' }} headerStyle={headerStyle} />
            <Column field="status_display" header="STATUS" filter filterPlaceholder="Filtrar" filterMatchMode="contains" style={{ textAlign: 'left' }} headerStyle={headerStyle} />
            <Column field="numero_processo" header="PROCESSO" filter filterPlaceholder="Filtrar" filterMatchMode="contains" style={{ textAlign: 'left' }} headerStyle={headerStyle} />
            <Column field="assunto" header="ASSUNTO" filter filterPlaceholder="Filtrar" filterMatchMode="contains" style={{ textAlign: 'left' }} headerStyle={headerStyle} />
            
            <Column
              field="valor_causa"
              header="VALOR"
              body={(rowData) => `R$ ${parseFloat(rowData.valor_causa).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
              style={{ textAlign: 'left' }}
              headerStyle={headerStyle}
            />
            <Column body={botoesAcoes} style={{ textAlign: 'center' }} headerStyle={headerStyle} />
          </DataTable>
        )}
      </div>
    </div>
  );
}

export default AtendimentosRealizados;
