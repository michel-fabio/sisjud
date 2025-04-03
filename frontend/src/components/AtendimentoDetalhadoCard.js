import React from "react";
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { useState, useRef } from 'react';
import { InputMask } from 'primereact/inputmask';
import { InputNumber } from 'primereact/inputnumber';


const AtendimentoDetalhadoCard = ({ atendimento, onFinalizar }) => {
    console.log(atendimento)
    const [mostrarModal, setMostrarModal] = useState(false);
    const [novoStatus, setNovoStatus] = useState(atendimento.status);
    const toast = useRef(null);
    const [numeroProcesso, setNumeroProcesso] = useState(atendimento.numero_processo);
    const [anotacoes, setAnotacoes] = useState(atendimento.anotacoes || "");
    const [valorCausa, setValorCausa] = useState(() => {
        const valor = atendimento.valor_causa;
        
        if (typeof valor === 'number') return valor; // já é número
        if (!valor || typeof valor !== 'string') return null;
        
        const valorNumerico = parseFloat(
            valor.replace("R$", "").replace(/\./g, "").replace(",", ".").trim()
        );
        
        return isNaN(valorNumerico) ? null : valorNumerico;
        });

    const opcoesStatus = [
        { label: 'Aguardando entrada do protocolo no Tribunal de Justiça', value: 'aguardando' },
        { label: 'Protocolo realizado', value: 'protocolo_realizado' },
        { label: 'Encerrado', value: 'encerrado' },
    ];

    const confirmarStatus = () => {
    toast.current.show({ severity: 'success', summary: 'Status atualizado!', life: 2000 });
    setMostrarModal(false);
    };

  return (
    <div
        style={{
            backgroundColor: "#f4f6f8",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            padding: "30px",
            marginBottom: "0px",
            borderLeft: "6px solid #00bf63",
            width: "90%",
            maxWidth: "1200px",
            minHeight: "84vh",
            maxHeight: "84vh",
            margin: "40px auto"
        }}
    >
      {/* Cabeçalho */}
      <h3
            style={{
                backgroundColor: "#00bf63",
                color: "white",
                padding: "10px 16px",
                borderRadius: "4px",
                textAlign: "center",
                margin: "0 0 16px 0", // remove espaço acima e deixa só embaixo
                position: "relative",
                top: "-10px" // opcional: empurra um pouco pra cima
            }}
            >
            Atendimento - {atendimento.numero}
        </h3>

      {/* Linha superior: Info + valor/processo */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" }}>
            {/* Informações principais à esquerda */}
            <div style={{ flex: 2 }}>
                <p><strong>Atendimento realizado em:</strong> {atendimento.data}</p>
                <p><strong>Área:</strong> {atendimento.area}</p>
                <p><strong>Assunto:</strong> {atendimento.assunto}</p>
                <p><strong>Cliente:</strong> {atendimento.cliente}</p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <strong>Status:</strong>
                    <span style={{ backgroundColor: '#e0e0e0', padding: '4px 8px', borderRadius: '4px' }}>
                        {atendimento.status}
                    </span>
                    <Button
                        icon="pi pi-sync"
                        className="p-button-rounded p-button-success p-button-sm"
                        aria-label="Atualizar Status"
                        onClick={() => setMostrarModal(true)}
                        style={{ width: "15px", height: "35px" }}
                    />
                </p>
            </div>

            {/* Valor e processo à direita no topo */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
                <div className="p-inputgroup mb-2">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-dollar" />
                    </span>
                    <InputNumber
                        value={valorCausa}
                        onValueChange={(e) => setValorCausa(e.value)}
                        mode="currency"
                        currency="BRL"
                        locale="pt-BR"
                        className="w-full"
                        placeholder="Valor da Causa"
                    />
                </div>

                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-briefcase" />
                    </span>
                    <InputMask
                        value={numeroProcesso}
                        onChange={(e) => setNumeroProcesso(e.target.value)}
                        mask="9999999-99.9999.9.99.9999"
                        placeholder="Número do Processo"
                        className="w-full"
                    />
                </div>
            </div>
        </div>

        {/* Anotações abaixo da linha superior */}
        <div style={{ marginTop: "20px" }}>
            <p className="font-semibold mb-2">
                📝 <strong>Anotações do Atendimento</strong>
            </p>
            <textarea
                rows={10}
                value={anotacoes}
                onChange={(e) => setAnotacoes(e.target.value)}
                placeholder="Digite suas anotações do atendimento..."
                style={{ 
                        width: "100%", 
                        maxWidth: "100%", 
                        minWidth: "100%", 
                        height: "35vh",
                        minHeight: "35vh",  
                        maxHeight: "35vh", 
                        padding: "10px", 
                        borderRadius: "4px", 
                        border: "1px solid #ccc" }}
            />
        </div>

      {/* Botão Finalizar */}
      <div className="flex justify-content-center mt-4" style={{ textAlign: "center", marginTop: "30px" }}>
        <Button
          label="Finalizar"
          icon="pi pi-check"
          className="p-button-success px-5"
          onClick={() => onFinalizar(atendimento.numero, {
            descricao: anotacoes,
            valor_causa: valorCausa,
            numero_processo: numeroProcesso
          })}
        />
      </div>
      <Toast ref={toast} />

        <Dialog
        header="Atualizar Status"
        visible={mostrarModal}
        style={{ width: '30vw' }}
        onHide={() => setMostrarModal(false)}
        modal
        >
        <div className="mb-3">
            <label htmlFor="status" className="block font-bold mb-2">
            Selecione o novo status:
            </label>
            <Dropdown
            id="status"
            value={novoStatus}
            onChange={(e) => setNovoStatus(e.value)}
            options={opcoesStatus}
            placeholder="Escolha um status"
            className="w-full"
            />
        </div>

        <div className="flex justify-content-end">
            <Button
            label="Confirmar"
            icon="pi pi-check"
            onClick={confirmarStatus}
            disabled={!novoStatus}
            />
        </div>
        </Dialog>
    </div>
  );
};

export default AtendimentoDetalhadoCard;
