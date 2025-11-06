import { useEffect, useState } from "react";
export default function FloatXp({ show, amount=20 }:{ show:boolean; amount?:number }) {
  const [visible, setVisible] = useState(false);
  useEffect(()=>{ if(show){ setVisible(true); const t=setTimeout(()=>setVisible(false), 900); return ()=>clearTimeout(t);} },[show]);
  if(!visible) return null;
  return (
    <div className="pointer-events-none fixed inset-0 flex justify-center">
      <div className="relative w-full max-w-md">
        <div className="absolute left-1/2 -translate-x-1/2 mt-28 animate-xp-burst text-brand-blue font-extrabold select-none">
          +{amount} XP
        </div>
      </div>
    </div>
  );
}
