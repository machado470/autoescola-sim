export default function Placa({ code, size = 100 }: { code: string; size?: number }) {
  const src = `/icons/placas/${code}.svg`;

  return (
    <img
      src={src}
      alt={`Placa ${code}`}
      width={size}
      height={size}
      style={{
        borderRadius: "12px",
        boxShadow: "0 0 12px #0003",
      }}
    />
  );
}
