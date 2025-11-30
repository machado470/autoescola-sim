import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SimuladoStart() {
  const [categories, setCategories] = useState([]);
  const [phases, setPhases] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPhase, setSelectedPhase] = useState(null);

  const navigate = useNavigate();

  async function loadCategories() {
    const res = await axios.get("http://localhost:3000/categories");
    setCategories(res.data);
  }

  async function loadPhases(categoryId: number) {
    const res = await axios.get(`http://localhost:3000/phases/category/${categoryId}`);
    setPhases(res.data);
  }

  async function startExam() {
    if (!selectedCategory || !selectedPhase) return;

    const res = await axios.post("http://localhost:3000/exam/start", {
      userId: 1,
      categoryId: selectedCategory,
      limit: 10
    });

    const session = res.data;

    navigate(`/simulado/${session.id}`, { state: session });
  }

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Iniciar Simulado</h1>

      <h2>Categorias</h2>
      {categories.map((cat: any) => (
        <button
          key={cat.id}
          style={{
            display: "block",
            marginBottom: 10,
            padding: 10,
            background: selectedCategory === cat.id ? "#4CAF50" : "#333",
            color: "white",
            borderRadius: 6,
            border: "none",
            cursor: "pointer"
          }}
          onClick={() => {
            setSelectedCategory(cat.id);
            loadPhases(cat.id);
          }}
        >
          {cat.name}
        </button>
      ))}

      {selectedCategory && (
        <>
          <h2>Fases</h2>
          {phases.map((ph: any) => (
            <button
              key={ph.id}
              style={{
                display: "block",
                marginBottom: 10,
                padding: 10,
                background: selectedPhase === ph.id ? "#2196F3" : "#444",
                color: "white",
                borderRadius: 6,
                border: "none",
                cursor: "pointer"
              }}
              onClick={() => setSelectedPhase(ph.id)}
            >
              {ph.name}
            </button>
          ))}
        </>
      )}

      {selectedPhase && (
        <button
          onClick={startExam}
          style={{
            marginTop: 20,
            padding: 15,
            width: "100%",
            background: "#00C853",
            border: "none",
            borderRadius: 8,
            color: "white",
            fontSize: 18,
            cursor: "pointer"
          }}
        >
          Começar Simulado
        </button>
      )}
    </div>
  );
}
