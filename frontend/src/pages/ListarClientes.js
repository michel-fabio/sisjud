import React, { useEffect, useState } from 'react';
import SideBarAdministrador from '../components/SideBarAdministrador';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import api from '../services/api';

function ListarClientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await api.get('usuarios/clientes/');
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  const headerStyle = {
    backgroundColor: '#0097b2',
    color: 'white',
    textAlign: 'left',
  };

  return (
    <div style={{ display: 'flex', position: 'relative' }}>
      <SideBarAdministrador />

      <div style={{ flex: 1, padding: '2rem', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '10px', right: '20px' }}>
          <img src="./logo.png" alt="Ícone do Sistema" style={{ width: '40px', height: '40px' }} />
        </div>

        <DataTable
          value={clientes}
          paginator
          rows={10}
          filterDisplay="row"
          stripedRows
          emptyMessage="Nenhum cliente encontrado."
          style={{ marginTop: '3rem' }}
        >
          <Column
            field="first_name"
            header="CLIENTE"
            filter
            filterPlaceholder="Buscar por nome"
            filterMatchMode="contains"
            style={{ textAlign: 'left' }}
            headerStyle={headerStyle}
          />
          <Column
            field="email"
            header="E-MAIL"
            filter
            filterPlaceholder="Buscar por email"
            filterMatchMode="contains"
            style={{ textAlign: 'left' }}
            headerStyle={headerStyle}
          />
        </DataTable>
      </div>
    </div>
  );
}

export default ListarClientes;
