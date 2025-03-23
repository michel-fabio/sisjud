import React, { useState } from 'react';
import SideBarAdministrador from '../components/SideBarAdministrador';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';


function AdvogadosAfiliados() {
  const [visible, setVisible] = useState(false);
  const [nome, setNome] = useState('');
  const [oab, setOab] = useState('');
  const [areas, setAreas] = useState(['']);
  const toast = useRef(null);

  const adicionarArea = () => {
    setAreas([...areas, '']);
  };

  const atualizarArea = (index, novoValor) => {
    const novasAreas = [...areas];
    novasAreas[index] = novoValor;
    setAreas(novasAreas);
  };

  const advogados = [
    { nome: 'Advogado 1', area: 'Cível, Consumidor e Família', oab: '1234' },
    { nome: 'Advogado 2', area: 'Criminal', oab: '5678' },
    { nome: 'Advogado 3', area: 'Trabalhista e Tributária', oab: '9012' },
  ];

  const opcoesDeArea = [
    { label: 'Cível', value: 'Cível' },
    { label: 'Criminal', value: 'Criminal' },
    { label: 'Família', value: 'Família' },
    { label: 'Trabalhista', value: 'Trabalhista' },
    { label: 'Tributária', value: 'Tributária' },
  ];

  const limparFormulario = () => {
    setNome('');
    setOab('');
    setAreas(['']);
  };

  const removerArea = (index) => {
    const novas = [...areas];
    novas.splice(index, 1);
    setAreas(novas.length === 0 ? [''] : novas);
  };

  const handleCadastro = () => {
    if (!nome || !oab || areas.some((a) => !a)) {
      toast.current.show({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Por favor, preencha todos os campos antes de confirmar.',
        life: 3000,
      });
      return;
    }
  
    console.log({ nome, oab, areas });
  
    // Limpa e fecha
    limparFormulario();
    setVisible(false);
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
        {/* Ícone do sistema */}
        <div style={{ position: 'absolute', top: '10px', right: '20px' }}>
          <img src="./logo.png" alt="Ícone do Sistema" style={{ width: '40px', height: '40px' }} />
        </div>

        {/* Botão de cadastrar */}
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

        <Toast ref={toast} />

        {/* Modal */}
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
            <p style={{ margin: '0 0 20px 0' }}>
                Informe os dados do novo advogado afiliado
            </p>

            {/* Nome */}
            <div className="p-inputgroup mb-3">
                <span className="p-inputgroup-addon">
                <i className="pi pi-user" />
                </span>
                <InputText placeholder="Nome Completo" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full" />
            </div>

            {/* OAB */}
            <div className="p-inputgroup mb-3">
                <span className="p-inputgroup-addon">
                <i className="pi pi-id-card" />
                </span>
                <InputText placeholder="Número Carteira OAB" value={oab} onChange={(e) => setOab(e.target.value)} className="w-full" />
            </div>

            {/* Campos dinâmicos de Área */}
            {areas.map((valor, index) => {
            // Filtra as opções que ainda não foram selecionadas (exceto a do próprio campo)
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

                {/* Remover área */}
                {areas.length > 1 && (
                    <span
                    className="p-inputgroup-addon"
                    style={{ cursor: 'pointer' }}
                    onClick={() => removerArea(index)}
                    >
                    <i className="pi pi-times" />
                    </span>
                )}

                {/* Adicionar nova área */}
                {index === areas.length - 1 && podeAdicionarMais && (
                    <span
                    className="p-inputgroup-addon"
                    style={{ cursor: 'pointer' }}
                    onClick={adicionarArea}
                    >
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
