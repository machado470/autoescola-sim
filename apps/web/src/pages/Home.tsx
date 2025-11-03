import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div
      style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>AutoEscola-Sim</h1>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>
        Plataforma de simulado de provas teóricas.  
        Se você está vendo isso, o Router está OK ✅
      </p>

      <Link
        to="/simulado"
        style={{
          background: '#2563eb',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontWeight: 'bold',
          transition: 'background 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#1d4ed8')}
        onMouseLeave={(e) => (e.currentTarget.style.background = '#2563eb')}
      >
        Iniciar Simulado
      </Link>
    </div>
  );
}
