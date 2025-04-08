import React, { useState, useEffect } from 'react';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import SideBarCliente from '../components/SideBarCliente';
import Swal from 'sweetalert2';
import api from "../services/api";
import { addLocale } from 'primereact/api';
import { useNavigate } from 'react-router-dom';

addLocale('pt-BR', {
  firstDayOfWeek: 1,
  dayNames: ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'],
  dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
  dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  monthNames: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
  monthNamesShort: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
  today: 'Hoje',
  clear: 'Limpar'
});

const SolicitarAtendimento = () => {
  const [areas, setAreas] = useState([]);
  const [assuntos, setAssuntos] = useState([]);
  const [areaSelecionada, setAreaSelecionada] = useState(null);
  const [assuntoSelecionado, setAssuntoSelecionado] = useState(null);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await api.get("atendimentos/areas/");
        const options = response.data.map(area => ({
          label: area.nome,
          value: area.id,
        }));
        setAreas(options);
      } catch (error) {
        console.error("Erro ao buscar áreas:", error);
      }
    };

    fetchAreas();
  }, []);

  useEffect(() => {
    if (areaSelecionada) {
      const fetchAssuntos = async () => {
        try {
          const response = await api.get("atendimentos/assuntos/", {
            params: { area: areaSelecionada },
          });
          const options = response.data.map(assunto => ({
            label: assunto.titulo,
            value: assunto.id,
          }));
          setAssuntos(options);
        } catch (error) {
          console.error("Erro ao buscar assuntos:", error);
        }
      };

      fetchAssuntos();
    } else {
      setAssuntos([]);
      setAssuntoSelecionado(null);
    }
  }, [areaSelecionada]);

  const handleSubmit = async () => {
    if (!areaSelecionada || !assuntoSelecionado || !data) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos obrigatórios',
        text: 'Preencha todos os campos para continuar.',
        confirmButtonColor: '#3f51b5'
      });
      return;
    }
  
    try {  
      await api.post("atendimentos/", {
        area_juridica: areaSelecionada,
        assunto: assuntoSelecionado,
        data_atendimento: data.toISOString(),
      });
  
      await Swal.fire({
        icon: 'success',
        title: 'Agendamento realizado',
        text: 'Atendimento marcado com sucesso!',
        confirmButtonColor: '#3f51b5'
      });
  
      setAreaSelecionada(null);
      setAssuntoSelecionado(null);
      setData(null);
  
      navigate("/inicio-cliente");
  
    } catch (error) {
      console.error("Erro:", error.response?.data);
      Swal.fire({
        icon: 'error',
        title: 'Erro ao agendar',
        text: 'Ocorreu um erro ao tentar agendar o atendimento.',
        confirmButtonColor: '#3f51b5'
      });
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <SideBarCliente />

      <div style={{ flex: 1, display: 'flex', padding: '40px', alignItems: 'center', justifyContent: 'center' }}>

        <div style={{ position: 'absolute', top: '10px', right: '20px' }}>
            <img src="./logo.png" alt="Ícone do Sistema" style={{ width: '70px', height: '70px' }} />
          </div>

        
        {/* Card do formulário */}
        <div style={{
          backgroundColor: '#f4f6f8',
          borderRadius: '8px',
          padding: '30px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '500px',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '480px'
        }}>
          <h2 style={{ color: '#3f51b5' }}>NOVO AGENDAMENTO</h2>
          <p>Solicite aqui um novo agendamento.</p>

          <Dropdown
            value={areaSelecionada}
            options={areas}
            onChange={(e) => setAreaSelecionada(e.value)}
            placeholder="Selecione a Área"
            style={{ width: '100%', marginBottom: '10px' }}
          />

          <Dropdown
            value={assuntoSelecionado}
            options={assuntos}
            onChange={(e) => setAssuntoSelecionado(e.value)}
            placeholder="Selecione o Assunto"
            style={{ width: '100%', marginBottom: '10px' }}
            disabled={!areaSelecionada}
          />

          {areaSelecionada && assuntoSelecionado && (
            <p style={{ textAlign: 'left', marginBottom: '20px' }}>
              <strong>Data selecionada:</strong> {data ? new Date(data).toLocaleDateString('pt-BR') : 'Nenhuma data selecionada'}
            </p>
          )}

          <div style={{ marginTop: 'auto' }}>
            <Button
              label="Confirmar"
              className="p-button-primary"
              onClick={handleSubmit}
              style={{
                width: '100%',
                backgroundColor: '#3f51b5',
                border: 'none'
              }}
            />
          </div>
        </div>

        {/* Calendário à direita */}
        {areaSelecionada && assuntoSelecionado && (
          <div style={{
            marginLeft: '40px',
            backgroundColor: '#f4f6f8',
            padding: '20px',
            borderRadius: '8px',
            height: 'fit-content'
          }}>
            <Calendar
              inline
              value={data}
              onChange={(e) => setData(e.value)}
              dateFormat="dd/mm/yy"
              locale="pt-BR"
              disabledDays={[0, 6]}
              minDate={new Date()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SolicitarAtendimento;
