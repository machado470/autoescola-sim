/** Vídeo simples (percepção de risco futura). */
export function VideoLesson({ src, caption, onDone }: any){
  return (<div style={{background:'#fff',padding:16,borderRadius:12,border:'1px solid #e5e7eb'}}>
    <video controls style={{width:'100%'}}>
      <source src={src} type="video/mp4"/>
    </video>
    {caption && <p style={{fontSize:12,opacity:.7}}>{caption}</p>}
    <button onClick={onDone} style={{marginTop:12}}>Concluir vídeo</button>
  </div>)
}
