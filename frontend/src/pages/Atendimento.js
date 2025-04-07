import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SideBarAdvogado from '../components/SideBarAdvogado';
import AtendimentoDetalhadoCard from '../components/AtendimentoDetalhadoCard';
import api from '../services/api';
import Swal from 'sweetalert2';

function Atendimento() {
  const location = useLocation();
  const navigate = useNavigate();
  const atendimento = location.state?.atendimento;
  const [opcoesStatus, setOpcoesStatus] = useState([]);

  useEffect(() => {
    const fetchStatusOptions = async () => {
      try {
        const response = await api.get('atendimentos/atendimentos/status/');
        const formatadas = response.data.map(op => ({
          label: op.rotulo,
          value: op.valor
        }));
        setOpcoesStatus(formatadas);
      } catch (error) {
        console.error('Erro ao buscar status:', error);
      }
    };
  
    fetchStatusOptions();
  }, []);

  const finalizarAtendimento = async (numero, dados) => {
    try {
      await api.patch(`atendimentos/atendimentos/${numero}/finalizar/`, dados);

      await Swal.fire({
        icon: 'success',
        title: 'Atendimento Finalizado',
        text: 'As informações foram salvas com sucesso.',
        confirmButtonColor: '#0097b2',
      });

      navigate('/atendimentos-hoje');
    } catch (error) {
      console.error('Erro ao finalizar atendimento:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erro ao finalizar',
        text: 'Não foi possível salvar o atendimento. Verifique os dados.',
        confirmButtonColor: '#0097b2',
      });
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <SideBarAdvogado />
      <div style={{ flex: 1, padding: '2rem' }}>

        <div style={{ position: 'absolute', top: '10px', right: '20px', zIndex: 1 }}>
            <img src="./logo.png" alt="Ícone do Sistema" style={{ width: '70px', height: '70px' }} />
          </div>


        {atendimento ? (
          <AtendimentoDetalhadoCard
            atendimento={atendimento}
            onFinalizar={finalizarAtendimento}
            opcoesStatus={opcoesStatus}
          />
        ) : (
          <p>Atendimento não encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default Atendimento;
