import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="app-shell">
      <div className="card card-center">
        <div className="card-header">
          <div>
            <p className="badge">AutoEscola Sim</p>
            <h1 className="page-title">Treine para a prova teórica</h1>
            <p className="page-subtitle">
              Simulados rápidos e correção automática para você passar de primeira.
            </p>
          </div>
        </div>

        <div className="card-body">
          <div className="stack">
            <Link to="/simulado" className="btn btn-primary btn-block">
              Iniciar simulado
            </Link>
            <Link to="/login" className="btn btn-secondary btn-block">
              Área do aluno (login)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
