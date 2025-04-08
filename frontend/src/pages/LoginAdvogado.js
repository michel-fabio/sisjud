import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { jwtDecode } from "jwt-decode";

function LoginAdvogado() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("token/", {
        username: email,
        password,
      });
  
      const token = response.data.access;
      const token_decodificado = jwtDecode(token);
  
      localStorage.setItem("token", token);
  
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  
      if (token_decodificado.tipo === "admin") {
          navigate("/inicio-administrador", {
            state: { showToast: true },
          });
      } else if (token_decodificado.tipo === "advogado") {
          navigate("/inicio-advogado", {
            state: { showToast: true },
          });
      } else {
        localStorage.removeItem("token");
        toast.current.show({
          severity: "warn",
          summary: "Acesso não autorizado",
          detail: "Seu tipo de usuário não tem acesso por esta tela.",
          life: 3000,
        });
      }
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
          <img src="/logo-advogado.png" alt="Logo" width="200" />
        </div>

        <div className="text-center">
          <p className="text-600 mb-4" style={{ textAlign: "justify" }}>
            Este tela de login é exclusiva para <strong>advogados e administradores</strong>.
          </p>
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
