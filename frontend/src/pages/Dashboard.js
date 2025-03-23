import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex align-items-center justify-content-center min-h-screen">
      <Card title="Bem-vindo ao Sistema de Atendimento Jurídico" className="w-6 text-center">
        <div className="flex flex-column gap-3">
          <Button label="Solicitar Atendimento" icon="pi pi-calendar-plus" onClick={() => navigate("/solicitar-atendimento")} />
          <Button label="Meus Atendimentos" icon="pi pi-list" onClick={() => navigate("/atendimentos")} />
          <Button label="Advogados" icon="pi pi-users" onClick={() => navigate("/advogados")} />
        </div>
      </Card>
    </div>
  );
}

export default Dashboard;
