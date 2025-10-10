/** Cartão de teoria/imagem com botão continuar. */
export function TheoryCard({ title, body, caption, src, alt, onDone }: any){
  return (<div style={{background:'#fff',padding:16,borderRadius:12,border:'1px solid #e5e7eb'}}>
    {title && <h3>{title}</h3>}
    {body && <p>{body}</p>}
    {src && <img src={src} alt={alt} style={{maxWidth:'100%',borderRadius:8}}/>}
    {caption && <p style={{fontSize:12,opacity:.7}}>{caption}</p>}
    <button onClick={onDone} style={{marginTop:12}}>Continuar</button>
  </div>)
}
