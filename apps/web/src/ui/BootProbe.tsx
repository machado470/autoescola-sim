import { useEffect } from "react";
export default function BootProbe() {
  useEffect(() => {
    console.log("[BootProbe] montado");
    const box = document.createElement("div");
    box.id = "boot-probe";
    box.style.cssText = "position:fixed;top:8px;right:8px;z-index:99999;background:#111;color:#0f0;padding:6px 10px;border:1px solid #0f0;border-radius:6px;font:12px/1.2 ui-monospace,monospace";
    box.textContent = "Boot OK";
    document.body.appendChild(box);

    const onErr = (e: ErrorEvent) => {
      console.error("runtime error:", e.error || e.message);
      box.style.background = "#300"; box.style.color = "#fff"; box.textContent = "Runtime error (veja console)";
    };
    const onRej = (e: PromiseRejectionEvent) => {
      console.error("unhandled rejection:", e.reason);
      box.style.background = "#630"; box.style.color = "#fff"; box.textContent = "Unhandled promise rejection";
    };
    window.addEventListener("error", onErr);
    window.addEventListener("unhandledrejection", onRej);
    return () => {
      window.removeEventListener("error", onErr);
      window.removeEventListener("unhandledrejection", onRej);
      document.getElementById("boot-probe")?.remove();
    };
  }, []);
  return null;
}
