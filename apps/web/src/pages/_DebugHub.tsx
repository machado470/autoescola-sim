import { Link } from "react-router-dom";

export default function DebugHub() {
  return (
    <div style={{padding:16, fontFamily:"ui-monospace,monospace"}}>
      <h1>Debug Hub ✅</h1>
      <p>Use estes links para abrir as rotas de forma segura (lazy).</p>
      <ul style={{lineHeight:1.9}}>
        <li><Link to="/">/ (Home)</Link></li>
        <li><Link to="/categoria/teste">/categoria/:slug</Link></li>
        <li><Link to="/quiz/demo">/quiz/:slug</Link></li>
        <li><Link to="/result">/result</Link></li>
        <li><Link to="/progresso">/progresso</Link></li>
      </ul>
    </div>
  );
}
