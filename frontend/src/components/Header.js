import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const items = [
    { label: "Dashboard", icon: "pi pi-home", command: () => navigate("/dashboard") },
    { label: "Solicitar Atendimento", icon: "pi pi-calendar-plus", command: () => navigate("/solicitar-atendimento") },
    { label: "Meus Atendimentos", icon: "pi pi-list", command: () => navigate("/atendimentos") },
    { label: "Advogados", icon: "pi pi-users", command: () => navigate("/advogados") },
    { label: "Sair", icon: "pi pi-power-off", command: () => { localStorage.removeItem("token"); navigate("/"); } },
  ];

  return <Menubar model={items} />;
}

export default Header;
