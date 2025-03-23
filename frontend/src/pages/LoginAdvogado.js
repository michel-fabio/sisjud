import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";

function LoginAdvogado() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("token/advogado/", { email, password });
      localStorage.setItem("token", response.data.access);

      toast.current.show({
        severity: "success",
        summary: "Sucesso",
        detail: "Login realizado com sucesso!",
        life: 3000,
      });

      setTimeout(() => {
        navigate("/dashboard-advogado");
      }, 2000);
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
    <div className="flex align-items-center justify-content-center min-h-screen bg-gray-200">
      <Toast ref={toast} />

      <Button 
        label="Área do Cliente" 
        icon="pi pi-user" 
        className="absolute top-0 right-0 m-3 p-button-outlined"
        onClick={() => navigate("/")}
      />
      <Card className="p-4 shadow-2 border-round-lg w-3" style={{ backgroundColor: "white" }}>
        <div className="flex justify-content-center mb-3">
          <img src="/logo.png" alt="Logo" width="50" />
        </div>

        <div className="text-center">
          <h2 className="text-900 mb-2">SISJUD</h2>
        </div>

        <form onSubmit={handleLogin} className="p-fluid">
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

          <div className="p-inputgroup mb-3">
            <span className="p-inputgroup-addon">
              <i className="pi pi-key"></i>
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

          <Button 
            label="Entrar" 
            icon="pi pi-sign-in"
            type="submit" 
            className="w-full mt-2" 
            style={{ backgroundColor: "#6200EA", borderColor: "#6200EA", color: "#fff" }}
          />
        </form>
      </Card>
    </div>
  );
}

export default LoginAdvogado;
