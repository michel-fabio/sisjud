import React, { useState, useEffect } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';
import SideBarCliente from '../components/SideBarCliente';
import api from '../services/api';

const CancelarAtendimento = () => {
    const [atendimentoSelecionado, setAtendimentoSelecionado] = useState(null);
    const [atendimentos, setAtendimentos] = useState([]);
    const [motivo, setMotivo] = useState(null);
    const [observacoes, setObservacoes] = useState('');
    const [feedbackVisible, setFeedbackVisible] = useState(false);
    const [feedbackSucesso, setFeedbackSucesso] = useState(true);
    const [feedbackMensagem, setFeedbackMensagem] = useState('');
    const navigate = useNavigate();

    const motivos = [
        { label: 'Desistência do cliente', value: 'Desistência do cliente' },
        { label: 'Conflito de horários', value: 'Conflito de horários' },
        { label: 'Erro no agendamento', value: 'Erro no agendamento' },
        { label: 'Outro', value: 'Outro' }
    ];

    useEffect(() => {
        const fetchAtendimentos = async () => {
            try {
                const token = localStorage.getItem('token');
                api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                const response = await api.get('atendimentos/pendentes/');
                setAtendimentos(response.data);
            } catch (err) {
                console.error("Erro ao carregar atendimentos pendentes", err);
            }
        };

        fetchAtendimentos();
    }, []);

    const handleCancelar = async () => {
        if (!atendimentoSelecionado || !motivo) {
            setFeedbackSucesso(false);
            setFeedbackMensagem("Selecione um atendimento e um motivo para continuar.");
            setFeedbackVisible(true);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            await api.post(`atendimentos/${atendimentoSelecionado}/cancelar/`, {
                motivo,
                observacoes
            });

            setFeedbackSucesso(true);
            setFeedbackMensagem("Atendimento cancelado com sucesso!");
            setFeedbackVisible(true);

            setTimeout(() => {
                setFeedbackVisible(false);
                navigate('/inicio-cliente');
            }, 2000);

        } catch (error) {
            setFeedbackSucesso(false);
            const erroMsg = error.response?.data?.erro || "Erro ao cancelar atendimento. Tente novamente.";
            setFeedbackMensagem(erroMsg);
            setFeedbackVisible(true);
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', position: 'relative' }}>
            <SideBarCliente />
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
                    <h2 style={{ color: '#3f51b5', textAlign: 'left' }}>CANCELAR AGENDAMENTO</h2>
                    <p style={{ textAlign: 'left' }}>Selecione o atendimento pendente que deseja cancelar.</p>

                    <Dropdown
                        value={atendimentoSelecionado}
                        options={atendimentos}
                        onChange={(e) => setAtendimentoSelecionado(e.value)}
                        placeholder="Selecione o Atendimento"
                        style={{ width: '100%', marginBottom: '10px' }}
                    />

                    <Dropdown
                        value={motivo}
                        options={motivos}
                        onChange={(e) => setMotivo(e.value)}
                        placeholder="Selecione o Motivo"
                        style={{ width: '100%', marginBottom: '10px' }}
                    />

                    <InputTextarea
                        value={observacoes}
                        onChange={(e) => setObservacoes(e.target.value)}
                        placeholder="Observações"
                        style={{ width: '100%', marginBottom: '20px', height: '150px', textAlign: 'left' }}
                        autoResize
                        rows={5}
                    />

                    <Button
                        label="Confirmar"
                        className="p-button-primary"
                        style={{ width: '100%', backgroundColor: '#3f51b5', border: 'none' }}
                        onClick={handleCancelar}
                    />
                </div>
            </div>

            <Dialog
                visible={feedbackVisible}
                onHide={() => setFeedbackVisible(false)}
                header={feedbackSucesso ? "Sucesso" : "Erro"}
                style={{ width: '400px', textAlign: 'center' }}
                modal
                closable={false}
                footer={
                    <Button
                        label="Ok"
                        onClick={() => {
                            setFeedbackVisible(false);
                            if (feedbackSucesso) navigate('/inicio-cliente');
                        }}
                        className={`p-button-${feedbackSucesso ? 'success' : 'danger'}`}
                    />
                }
            >
                <div style={{ textAlign: 'center' }}>
                    <i
                        className={`pi ${feedbackSucesso ? 'pi-check-circle' : 'pi-times-circle'}`}
                        style={{ fontSize: '3rem', color: feedbackSucesso ? 'green' : 'red' }}
                    />
                    <p style={{ marginTop: '20px' }}>{feedbackMensagem}</p>
                </div>
            </Dialog>
        </div>
    );
};

export default CancelarAtendimento;
