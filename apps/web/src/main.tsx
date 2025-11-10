import React from "react";
import ReactDOM from "react-dom/client";
function App(){ return <div style={{padding:24,fontFamily:"sans-serif"}}>OK — Web carregado</div>; }
const root = document.getElementById("root")!;
ReactDOM.createRoot(root).render(<App />);
