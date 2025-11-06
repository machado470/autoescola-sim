export function beep(success=true, ms=120){
  try{
    const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext;
    const ctx = new Ctx();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = success ? 880 : 220;
    o.connect(g); g.connect(ctx.destination);
    g.gain.setValueAtTime(0.05, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + ms/1000);
    o.start(); o.stop(ctx.currentTime + ms/1000);
  }catch{}
  if (navigator.vibrate) navigator.vibrate(success ? 30 : [20,40,20]);
}
