import React from "react";
import SideBarAdvogado from "../components/SideBarAdvogado";
import AtendimentoDetalhadoCard from "../components/AtendimentoDetalhadoCard";

const Atendimento = () => {
  const atendimentoMock = {
    id: "2301020001",
    data: "01/01/2023",
    area: "Consumidor",
    assunto: "Cobrança indevida",
    cliente: "Nome do Cliente",
    status: "Aguardando entrada do protocolo no Tribunal de Justiça",
    anotacoes: "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    valorCausa: "R$ 20.000,00",
    numeroProcesso: "5293213-57.2025.7.09.4856"
  };

  const finalizarAtendimento = (id) => {
    console.log(`Finalizar atendimento ${id}`);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <SideBarAdvogado />
      <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        {/* Ícone do sistema */}
        <div style={{ position: 'absolute', top: '10px', right: '20px' }}>
          <img src="./logo.png" alt="Ícone do Sistema" style={{ width: '40px', height: '40px' }} />
        </div>
        <AtendimentoDetalhadoCard atendimento={atendimentoMock} onFinalizar={finalizarAtendimento} />
      </div>
    </div>
  );
};

export default Atendimento;
