import React, { useEffect, useState } from 'react';
import api from '../services/api';
import SideBarAdvogado from '../components/SideBarAdvogado';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useLocation } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useRef } from "react";

const cardStyle = {
  color: 'white',
  borderRadius: '10px',
  padding: '20px',
  width: '500px',
  height: '150px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
};

const gridContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  justifyContent: 'flex-start',
};

function InicioAdvogado() {
  const [dados, setDados] = useState({
    totalMes: 0,
    emAndamento: 0,
    causasGanhas: 0,
  });

  const [assuntosFrequentes, setAssuntosFrequentes] = useState([]);

  const location = useLocation();
  const toast = useRef(null);

  useEffect(() => {
    if (location.state?.showToast) {
      toast.current?.show({
        severity: "success",
        summary: "Sucesso",
        detail: "Login realizado com sucesso!",
        life: 1500,
      });

      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const response = await api.get('atendimentos/atendimentos/finalizados/');

        const atendimentos = response.data;

        const agora = new Date();
        const mesAtual = agora.getMonth();
        const anoAtual = agora.getFullYear();

        const totalMes = atendimentos.filter(at => {
          const data = new Date(at.data.split(' ')[0].split('/').reverse().join('-'));
          return data.getMonth() === mesAtual && data.getFullYear() === anoAtual;
        }).length;

        const statusFinalizados = [
          'rejeitado',
          'finalizado_causa_ganha',
          'finalizado_sem_causa_ganha',
          'finalizado_acordo',
          'encerrado_por_inatividade',
          'cancelado',
        ];
        
        const emAndamento = atendimentos.filter(at => 
          at.numero_processo && !statusFinalizados.includes(at.status)
        ).length;

        const causasGanhas = atendimentos.filter(at =>
          at.status === 'finalizado_causa_ganha'
        ).length;

        // Cálculo dos assuntos mais frequentes
        const assuntoContagem = {};
        atendimentos.forEach(at => {
          if (!assuntoContagem[at.assunto]) {
            assuntoContagem[at.assunto] = 1;
          } else {
            assuntoContagem[at.assunto]++;
          }
        });

        const assuntosArray = Object.entries(assuntoContagem).map(([assunto, count]) => ({
          assunto,
          atendimentos: count,
        }));

        // Ordena do mais frequente para o menos
        assuntosArray.sort((a, b) => b.atendimentos - a.atendimentos);

        setDados({ totalMes, emAndamento, causasGanhas });
        setAssuntosFrequentes(assuntosArray);
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
      }
    };

    fetchDados();
  }, []);

  const cardsData = [
    { title: 'Atendimentos Realizados no Mês', value: dados.totalMes, color: 'linear-gradient(to right, #5de0e6, #004aad)' },
    { title: 'Atendimentos com processos em andamento', value: dados.emAndamento, color: 'linear-gradient(to right, #ff3131, #ff914d)' },
    { title: 'Causas Ganhas', value: dados.causasGanhas, color: 'linear-gradient(to right, #0097b2, #7ed957)' },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <Toast ref={toast} />
      <SideBarAdvogado />

      <div style={{ position: 'absolute', top: '10px', right: '20px', zIndex: 1 }}>
        <img src="./logo.png" alt="Ícone do Sistema" style={{ width: '40px', height: '40px' }} />
      </div>

      <div style={{ flex: 1, padding: '2rem' }}>
        <div style={gridContainerStyle}>
          {cardsData.map((card, index) => (
            <div key={index} style={{ ...cardStyle, background: card.color }}>
              <h4 style={{ margin: 0, fontWeight: 700 }}>{card.title}</h4>
              <h1 style={{ margin: '10px 0 0', fontSize: '3.5rem' }}>{card.value}</h1>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '4rem', width: '100%', height: '300px' }}>
          <h3 style={{ marginBottom: '1rem' }}>Assuntos mais frequentes</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={assuntosFrequentes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="assunto" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="atendimentos" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default InicioAdvogado;
