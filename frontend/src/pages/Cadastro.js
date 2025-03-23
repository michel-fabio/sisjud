import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Link } from "react-router-dom";
import { Toast } from "primereact/toast"; // Importa o Toast

function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const toast = useRef(null); // Referência para o Toast

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.current.show({ severity: "warn", summary: "Atenção", detail: "As senhas não coincidem.", life: 3000 });
      return;
    }

    try {
      await api.post("register/", { nome, email, password });
      toast.current.show({ severity: "success", summary: "Sucesso", detail: "Cadastro realizado com sucesso!", life: 3000 });

      setTimeout(() => {
        navigate("/");
      }, 2000); // Redireciona após 2 segundos
    } catch (error) {
      toast.current.show({ severity: "error", summary: "Erro", detail: "Erro ao cadastrar. Tente novamente.", life: 3000 });
    }
  };

  return (
    <div className="flex align-items-center justify-content-center min-h-screen bg-gray-100">
      <Toast ref={toast} /> {/* Componente Toast para exibir mensagens */}

      <Card className="p-4 shadow-2 border-round-lg w-3">
        <div className="flex justify-content-center mb-3">
          <img src="/logo.png" alt="Logo" width="50" />
        </div>

        <div className="text-center">
          <h2 className="text-900 mb-2">CADASTRAR</h2>
          <p className="text-600 mb-4" style={{ textAlign: "justify" }}>
            Insira os seguintes dados para realizar o seu cadastro ao nosso sistema <strong>Jurídico de Atendimento</strong>.
          </p>
        </div>

        <form onSubmit={handleRegister} className="p-fluid">
          {/* Nome Completo */}
          <div className="p-inputgroup mb-3">
            <span className="p-inputgroup-addon">
              <i className="pi pi-id-card"></i>
            </span>
            <InputText 
              placeholder="Nome Completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full"
            />
          </div>

          {/* Email */}
          <div className="p-inputgroup mb-3">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <InputText 
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>

          {/* Senha */}
          <div className="p-inputgroup mb-3">
            <span className="p-inputgroup-addon">
              <i className="pi pi-lock"></i>
            </span>
            <InputText 
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>

          {/* Repetir Senha */}
          <div className="p-inputgroup mb-3">
            <span className="p-inputgroup-addon">
              <i className="pi pi-lock"></i>
            </span>
            <InputText 
              type="password"
              placeholder="Repetir a Senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <Button label="Cadastrar" type="submit" className="w-full mt-2" />

          <Divider />

          <p className="text-600 text-center">
            Já possui login? <Link to="/" className="font-bold">Clique aqui</Link>
          </p>
        </form>
      </Card>
    </div>
  );
}

export default Register;
