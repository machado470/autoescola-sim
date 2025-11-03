import { Link } from 'react-router-dom';
import Cone from '../assets/ui/icons/cone.svg';
import Stop from '../assets/ui/icons/stop.svg';
import { ProgressBar } from '../components/ui/ProgressBar';
import { StatCard } from '../components/ui/StatCard';

export default function Home() {
  return (
    <div className="container-app py-10 md:py-12">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <img src={Cone} alt="Cone" className="w-12 h-12 md:w-14 md:h-14" />
        <h1 className="h1">AutoEscola-Sim</h1>
      </div>

      {/* CTA */}
      <div className="card p-4 md:p-6 mb-6">
        <p className="subtle mb-4">
          Plataforma de simulado de provas teóricas. Se você está vendo isso, o Router está OK
          <span className="ml-2">✅</span>
        </p>
        <Link to="/simulado" className="btn-primary w-full md:w-auto">
          Iniciar Simulado
        </Link>
      </div>

      {/* Categorias */}
      <div className="card p-4 md:p-6 mb-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <StatCard
            icon={<img src={Stop} alt="Sinalização" className="w-9 h-9" />}
            title="Sinalização"
            value={<span className="inline-flex items-center gap-3">Nível 60% <ProgressBar value={60} className="w-24" /></span> as unknown as string}
          />
          <StatCard
            icon={<div className="w-9 h-9 rounded-full bg-green-200" />}
            title="Direção Defensiva"
            value={<span className="inline-flex items-center gap-3">Nível 1% <ProgressBar value={1} className="w-24" /></span> as unknown as string}
            color="green"
          />
          <StatCard
            icon={<div className="w-9 h-9 rounded-lg bg-purple-300" />}
            title="Mecânica"
            value={<span className="inline-flex items-center gap-3">Nível 20% <ProgressBar value={20} className="w-24" /></span> as unknown as string}
            color="purple"
          />
        </div>
      </div>

      {/* XP */}
      <div className="card p-4 md:p-6 flex items-center gap-4">
        <img src={Cone} alt="XP" className="w-12 h-12" />
        <div className="flex-1">
          <div className="h2">XP</div>
          <div className="mt-2">
            <ProgressBar value={65} />
          </div>
        </div>
        <div className="text-2xl font-extrabold">240 XP</div>
      </div>
    </div>
  );
}
