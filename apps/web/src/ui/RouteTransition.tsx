import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RouteTransition({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const [key, setKey] = useState(pathname);

  useEffect(() => {
    // força re-render animado quando muda rota
    setKey(pathname);
  }, [pathname]);

  return (
    <div key={key} className="route-enter">
      {children}
    </div>
  );
}
