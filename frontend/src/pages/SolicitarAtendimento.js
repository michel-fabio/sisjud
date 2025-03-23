import React, { useState, useEffect, useRef } from 'react';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import SideBarCliente from '../components/SideBarCliente';
import { Toast } from "primereact/toast";
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
  const toast = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await api.get("areas/");
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
          const response = await api.get("assuntos/", {
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
      toast.current.show({
        severity: "warn",
        summary: "Campos obrigatórios",
        detail: "Preencha todos os campos",
        life: 3000
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      await api.post("atendimentos/", {
        area_juridica: areaSelecionada,
        assunto: assuntoSelecionado,
        data_atendimento: data.toISOString(),
      });

      toast.current.show({
        severity: "success",
        summary: "Agendado",
        detail: "Atendimento marcado com sucesso!",
        life: 2000
      });

      setAreaSelecionada(null);
      setAssuntoSelecionado(null);
      setData(null);

      setTimeout(() => {
        navigate("/inicio-cliente");
      }, 1000 );
    } catch (error) {
      console.error("Erro:", error.response?.data);
      toast.current.show({
        severity: "error",
        summary: "Erro",
        detail: "Erro ao agendar atendimento.",
        life: 3000
      });
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <SideBarCliente />
      <Toast ref={toast} />

      <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', top: '10px', right: '20px' }}>
          <img src="./logo.png" alt="Ícone do Sistema" style={{ width: '40px', height: '40px' }} />
        </div>

        <div style={{
          backgroundColor: '#f4f6f8',
          borderRadius: '8px',
          padding: '30px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          width: '50%',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#3f51b5', textAlign: 'left' }}>NOVO AGENDAMENTO</h2>
          <p style={{ textAlign: 'left' }}>Solicite aqui um novo agendamento.</p>

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

          <Calendar
            value={data}
            onChange={(e) => setData(e.value)}
            placeholder="Selecione a Data"
            style={{ width: '100%', marginBottom: '20px' }}
            dateFormat="dd/mm/yy"
            locale="pt-BR"
            disabledDays={[0, 6]}
          />

          <Button label="Confirmar" className="p-button-primary" onClick={handleSubmit} style={{ width: '100%', backgroundColor: '#3f51b5', border: 'none' }} />
        </div>
      </div>
    </div>
  );
};

export default SolicitarAtendimento;