import React, { useState, useEffect } from 'react';
import SideBarAdministrador from '../components/SideBarAdministrador';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Swal from 'sweetalert2';
import api from '../services/api';

function AdvogadosAfiliados() {
  const [visible, setVisible] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [oab, setOab] = useState('');
  const [areas, setAreas] = useState(['']);
  const [advogados, setAdvogados] = useState([]);
  const [opcoesDeArea, setOpcoesDeArea] = useState([]);

  useEffect(() => {
    fetchAdvogados();
    fetchAreas();
  }, []);

  const fetchAdvogados = async () => {
    try {
      const response = await api.get("advogados/");
      setAdvogados(response.data);
    } catch (error) {
      console.error("Erro ao buscar advogados:", error);
    }
  };

  const fetchAreas = async () => {
    try {
      const response = await api.get("atendimentos/areas/");
      const formatadas = response.data.map((area) => ({ label: area.nome, value: area.nome }));
      setOpcoesDeArea(formatadas);
    } catch (error) {
      console.error("Erro ao buscar áreas jurídicas:", error);
    }
  };

  const gerarSenha = () => {
    const letras = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length: 10 }, () => letras[Math.floor(Math.random() * letras.length)]).join("");
  };

  const limparFormulario = () => {
    setNome('');
    setEmail('');
    setOab('');
    setAreas(['']);
  };

  const adicionarArea = () => setAreas([...areas, '']);

  const atualizarArea = (index, novoValor) => {
    const novasAreas = [...areas];
    novasAreas[index] = novoValor;
    setAreas(novasAreas);
  };

  const removerArea = (index) => {
    const novas = [...areas];
    novas.splice(index, 1);
    setAreas(novas.length === 0 ? [''] : novas);
  };

  const handleCadastro = async () => {
    if (!nome || !email || !oab || areas.some((a) => !a)) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos obrigatórios',
        text: 'Por favor, preencha todos os campos antes de confirmar.',
        confirmButtonColor: '#0097b2',
      });
      return;
    }

    const senha = gerarSenha();

    try {
      await api.post("advogados/", {
        nome,
        email,
        senha,
        numero_oab: oab,
        areas_atuacao: areas.join(", "),
      });

      setVisible(false);
      limparFormulario();

      await Swal.fire({
        icon: 'success',
        title: 'Cadastro realizado',
        text: 'O advogado foi cadastrado com sucesso.',
        confirmButtonColor: '#0097b2',
      });

      fetchAdvogados();
    } catch (error) {
      console.error("Erro ao cadastrar advogado:", error);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Falha ao cadastrar o advogado. Verifique os dados.',
        confirmButtonColor: '#0097b2',
      });
    }
  };

  const headerStyle = {
    backgroundColor: '#0097b2',
    color: 'white',
    textAlign: 'left',
  };

  const modalFooter = (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      <Button
        label="Confirmar"
        className="w-full"
        style={{ backgroundColor: '#0097b2', border: 'none' }}
        onClick={handleCadastro}
      />
    </div>
  );

  return (
    <div style={{ display: 'flex', position: 'relative' }}>
      <SideBarAdministrador />

      <div style={{ flex: 1, padding: '2rem', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '10px', right: '20px' }}>
          <img src="./logo.png" alt="Ícone do Sistema" style={{ width: '70px', height: '70px' }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem', marginTop: '3rem' }}>
          <button
            onClick={() => setVisible(true)}
            style={{
              backgroundColor: '#0097b2',
              color: 'white',
              padding: '15px 25px',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            + Cadastrar Advogado
          </button>
        </div>

        <DataTable
          value={advogados}
          paginator
          rows={10}
          filterDisplay="row"
          stripedRows
          emptyMessage="Nenhum advogado encontrado."
          style={{ marginTop: '1rem' }}
          headerStyle={headerStyle}
        >
          <Column
            field="nome"
            header="ADVOGADO"
            filter
            filterPlaceholder="Buscar por nome"
            filterMatchMode="contains"
            style={{ textAlign: 'left' }}
            headerStyle={headerStyle}
          />
          <Column
            field="areas_atuacao"
            header="ÁREA"
            filter
            filterPlaceholder="Buscar por área"
            filterMatchMode="contains"
            style={{ textAlign: 'left' }}
            headerStyle={headerStyle}
          />
          <Column
            field="numero_oab"
            header="NÚMERO OAB"
            filter
            filterPlaceholder="Buscar por OAB"
            filterMatchMode="contains"
            style={{ textAlign: 'left' }}
            headerStyle={headerStyle}
          />
        </DataTable>

        <Dialog
          header="CADASTRAR ADVOGADO"
          visible={visible}
          onHide={() => {
            setVisible(false);
            limparFormulario();
          }}
          style={{ width: '400px', maxHeight: '90vh', overflowY: 'auto', borderRadius: '20px' }}
          contentStyle={{ backgroundColor: '#f1f5f9', paddingBottom: '2rem' }}
          footer={modalFooter}
        >
          <p style={{ margin: '0 0 20px 0' }}>Informe os dados do novo advogado afiliado</p>

          <div className="p-inputgroup mb-3">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user" />
            </span>
            <InputText placeholder="Nome Completo" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full" />
          </div>

          <div className="p-inputgroup mb-3">
            <span className="p-inputgroup-addon">
              <i className="pi pi-envelope" />
            </span>
            <InputText placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" />
          </div>

          <div className="p-inputgroup mb-3">
            <span className="p-inputgroup-addon">
              <i className="pi pi-id-card" />
            </span>
            <InputText placeholder="Número Carteira OAB" value={oab} onChange={(e) => setOab(e.target.value)} className="w-full" />
          </div>

          {areas.map((valor, index) => {
            const opcoesFiltradas = opcoesDeArea.filter(
              (opcao) => !areas.includes(opcao.value) || opcao.value === valor
            );
            const podeAdicionarMais = areas.length < opcoesDeArea.length;

            return (
              <div className="p-inputgroup mb-3" key={index}>
                <span className="p-inputgroup-addon">
                  <i className="pi pi-book" />
                </span>

                <Dropdown
                  options={opcoesFiltradas}
                  value={valor}
                  onChange={(e) => atualizarArea(index, e.value)}
                  placeholder={`Área ${index + 1}`}
                  className="w-full"
                />

                {areas.length > 1 && (
                  <span className="p-inputgroup-addon" style={{ cursor: 'pointer' }} onClick={() => removerArea(index)}>
                    <i className="pi pi-times" />
                  </span>
                )}

                {index === areas.length - 1 && podeAdicionarMais && (
                  <span className="p-inputgroup-addon" style={{ cursor: 'pointer' }} onClick={adicionarArea}>
                    <i className="pi pi-plus" />
                  </span>
                )}
              </div>
            );
          })}
        </Dialog>
      </div>
    </div>
  );
}

export default AdvogadosAfiliados;