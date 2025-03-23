import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Link } from "react-router-dom";
import { Toast } from "primereact/toast"; // Importando o Toast

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useRef(null); // Criando a referência para o Toast

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("token/", { email, password });
      localStorage.setItem("token", response.data.access);

      toast.current.show({
        severity: "success",
        summary: "Sucesso",
        detail: "Login realizado com sucesso!",
        life: 3000,
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000); // Redireciona após 2 segundos
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Erro",
        detail: "Erro ao fazer login. Verifique suas credenciais.",
        life: 3000,
      });
    }
  };

  return (
    <div className="flex align-items-center justify-content-center min-h-screen bg-gray-100">
      <Toast ref={toast} /> {/* Componente Toast para exibir notificações */}

      {/* Botão fixo no canto superior esquerdo */}
      <Button 
        label="Área do Advogado" 
        icon="pi pi-user" 
        className="absolute top-0 right-0 m-3 p-button-outlined"
        onClick={() => navigate("/advogado")}
      />

      <Card className="p-4 shadow-2 border-round-lg w-3">
        {/* Centralizando a imagem */}
        <div className="flex justify-content-center mb-3">
          <img src="/logo.png" alt="Logo" width="50" />
        </div>

        {/* Centralizando o título e justificando o texto */}
        <div className="text-center">
          <h2 className="text-900 mb-2">SISJUD</h2>
          <p className="text-600 mb-4" style={{ textAlign: "justify" }}>
            Bem-vindo ao sistema <strong>Jurídico de Atendimento</strong>, onde você poderá encontrar o melhor advogado para sua causa.
          </p>
        </div>

        <form onSubmit={handleLogin} className="p-fluid">
          {/* Campo de Email */}
          <div className="p-inputgroup mb-3"> 
            <span className="p-inputgroup-addon">
              <i className="pi pi-envelope"></i>
            </span>
            <InputText 
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>

          {/* Campo de Senha */}
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

          <Button label="Entrar" icon="pi pi-sign-in" type="submit" className="w-full mt-2" />

          <Divider />

          {/* Centralizando o texto do cadastro */}
          <p className="text-600 text-center">
            ou faça seu cadastro <Link to="/register" className="font-bold">aqui</Link>
          </p>
        </form>
      </Card>
    </div>
  );
}

export default Login;
