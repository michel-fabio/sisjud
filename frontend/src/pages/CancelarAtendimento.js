import React, { useState, useEffect } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import SideBarCliente from '../components/SideBarCliente';
import api from '../services/api';

const CancelarAtendimento = () => {
    const [atendimentoSelecionado, setAtendimentoSelecionado] = useState(null);
    const [atendimentos, setAtendimentos] = useState([]);
    const [motivos, setMotivos] = useState([]);
    const [motivo, setMotivo] = useState(null);
    const [observacoes, setObservacoes] = useState('');
    const navigate = useNavigate();

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

        const fetchMotivos = async () => {
            try {
                const response = await api.get('motivos-cancelamento/');
                const options = response.data.map(motivo => ({
                    label: motivo.descricao,
                    value: motivo.descricao
                }));
                setMotivos(options);
            } catch (err) {
                console.error("Erro ao carregar motivos de cancelamento", err);
            }
        };

        fetchAtendimentos();
        fetchMotivos();
    }, []);

    const handleCancelar = async () => {
        if (!atendimentoSelecionado || !motivo) {
            Swal.fire({
                icon: 'warning',
                title: 'Atenção',
                text: 'Selecione um atendimento e um motivo para continuar.',
                confirmButtonColor: '#3f51b5'
            });
            return;
        }

        try {
            const token = localStorage.getItem('token');
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            await api.post(`atendimentos/${atendimentoSelecionado}/cancelar/`, {
                motivo,
                observacoes
            });

            await Swal.fire({
                icon: 'success',
                title: 'Sucesso',
                text: 'Atendimento cancelado com sucesso!',
                confirmButtonColor: '#3f51b5'
            });

            navigate('/inicio-cliente');

        } catch (error) {
            const erroMsg = error.response?.data?.erro || "Erro ao cancelar atendimento. Tente novamente.";
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: erroMsg,
                confirmButtonColor: '#3f51b5'
            });
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
        </div>
    );
};

export default CancelarAtendimento;
