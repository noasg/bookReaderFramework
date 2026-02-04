import legenda from "../data/legenda.json"; // adjust path if needed

export default function Legend() {
  return (
    <div className="mt-auto">
      <h4 className="text-indigo-900 font-semibold mb-2">Legenda:</h4>
      <div className="flex flex-col gap-2">
        {legenda.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            {item.color && (
              <span
                style={{ backgroundColor: item.color }}
                className="w-4 h-4 rounded-sm flex-shrink-0 mt-1"
              />
            )}
            <div className="text-sm text-indigo-900">{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
