import React from "react";

type State = { hasError: boolean; error?: any };

export default class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { hasError: false, error: undefined };

  static getDerivedStateFromError(error: any): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, info: any) {
    // loga no console para facilitar
    console.error("[ErrorBoundary]", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 16, fontFamily: "ui-monospace, monospace" }}>
          <h2>⚠️ Erro ao renderizar esta rota</h2>
          <pre style={{ whiteSpace: "pre-wrap" }}>{String(this.state.error)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
