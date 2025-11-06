import { Component, ReactNode } from "react";
class SafeBoundary extends Component<{children:ReactNode},{err:any}>{
  state={err:null as any};
  static getDerivedStateFromError(e:any){ return {err:String(e?.message||e)}; }
  componentDidCatch(e:any){ console.error("[SafeRoute]", e); }
  render(){ return this.state.err
    ? <div style={{padding:16,fontFamily:"ui-monospace,monospace",color:"#b91c1c"}}>Erro na rota: {this.state.err}</div>
    : this.props.children;
  }
}
export default function SafeRoute({children}:{children:ReactNode}){ return <SafeBoundary>{children}</SafeBoundary>; }
