import React, { useState } from 'react';
import { Menu } from 'primereact/menu';
import { useNavigate } from 'react-router-dom';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

const SidebarMenu = () => {
    const navigate = useNavigate();

    const items = [
        { label: 'Início', icon: 'pi pi-home', command: () => navigate('/inicio-cliente') },
        { label: 'Novo Agendamento', icon: 'pi pi-calendar', command: () => navigate('/solicitar-atendimento') },
        { label: 'Cancelar Agendamento', icon: 'pi pi-times', command: () => navigate('/cancelar-atendimento') },
    ];

    const logoutItem = [
        { label: 'Sair', icon: 'pi pi-sign-out', command: () => navigate('/') },
    ];

    return (
        <div style={{ width: '220px', backgroundColor: '#3f51b5', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}>
                <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" style={{ width: '60px', borderRadius: '50%' }} />
                <h3 style={{ marginTop: '10px', fontSize: '16px' }}>Nome do Cliente</h3>
            </div>
            <div style={{ flex: 1, width: '100%' }}>
                <Menu model={items} style={{ border: 'none', backgroundColor: '#3f51b5', color: 'white', width: '100%' }} className="custom-menu" />
            </div>
            <Menu model={logoutItem} style={{ border: 'none', backgroundColor: '#3f51b5', color: 'white', width: '100%' }} className="custom-menu" />
        </div>
    );
};

const CancelarAtendimento = () => {
    const [numeroAtendimento, setNumeroAtendimento] = useState('');
    const [motivo, setMotivo] = useState(null);
    const [observacoes, setObservacoes] = useState('');

    const motivos = [
        { label: 'Desistência do cliente', value: 'Desistência do cliente' },
        { label: 'Conflito de horários', value: 'Conflito de horários' },
        { label: 'Erro no agendamento', value: 'Erro no agendamento' },
        { label: 'Outro', value: 'Outro' }
    ];

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', position: 'relative' }}>
            <SidebarMenu />
            <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', top: '10px', right: '20px' }}>
                    <img src="./logo.png" alt="Ícone do Sistema" style={{ width: '40px', height: '40px' }} />
                </div>
                <div style={{ backgroundColor: '#f4f6f8', borderRadius: '8px', padding: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', width: '50%', textAlign: 'center' }}>
                    <h2 style={{ color: '#3f51b5', textAlign: 'left' }}>CANCELAR AGENDAMENTO</h2>
                    <p style={{ textAlign: 'left' }}>Informe abaixo o número do agendamento que deseja cancelar.</p>
                    <InputText value={numeroAtendimento} onChange={(e) => setNumeroAtendimento(e.target.value)} placeholder="Número do Atendimento" style={{ width: '100%', marginBottom: '10px' }} />
                    <Dropdown value={motivo} options={motivos} onChange={(e) => setMotivo(e.value)} placeholder="Selecione o Motivo" style={{ width: '100%', marginBottom: '10px' }} />
                    <InputTextarea value={observacoes} onChange={(e) => setObservacoes(e.target.value)} placeholder="Observações" style={{ width: '100%', marginBottom: '20px', height: '150px', textAlign: 'left' }} autoResize rows={5} />
                    <Button label="Confirmar" className="p-button-primary" style={{ width: '100%', backgroundColor: '#3f51b5', border: 'none' }} />
                </div>
            </div>
        </div>
    );
};

export default CancelarAtendimento;
