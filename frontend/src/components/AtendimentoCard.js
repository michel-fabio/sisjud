import React from 'react';
import { Button } from 'primereact/button';

const AtendimentoCard = ({ atendimento, onIniciar }) => {
  return (
    <div style={{
      backgroundColor: '#f4f6f8',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '15px',
      marginBottom: '15px',
      borderLeft: '6px solid #00bf63'
    }}>
      <h3 style={{ backgroundColor: '#00bf63', color: 'white', padding: '8px', borderRadius: '4px' }}>
        Atendimento - {atendimento.numero}
      </h3>
      <p><strong>Área:</strong> {atendimento.area}</p>
      <p><strong>Assunto:</strong> {atendimento.assunto}</p>
      <p><strong>Cliente:</strong> {atendimento.cliente}</p>

      <div style={{ marginTop: '10px' }}>
        <Button 
          label="Iniciar Atendimento"
          icon="pi pi-play"
          className="p-button-success"
          onClick={() => onIniciar(atendimento.id)}
        />
      </div>
    </div>
  );
};

export default AtendimentoCard;
