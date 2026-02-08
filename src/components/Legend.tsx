import legenda from "../data/legenda.json";

type LegendItem = {
  label: string;
  description: string;
  color?: string;
};

export default function Legend() {
  return (
    <div className="mt-auto text-xl text-indigo-900">
      <h4 className="font-semibold mb-3">Legenda:</h4>

      <div className="flex flex-col gap-3">
        {(legenda as LegendItem[]).map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            {/* LEFT SYMBOL / LABEL */}
            <div
              className={`shrink-0 ${
                item.label === "color" && item.color ? "mt-1" : "mt-0"
              }`}
            >
              {item.label === "color" && item.color ? (
                // Color square
                <span
                  style={{ backgroundColor: item.color }}
                  className="w-4 h-4 rounded-sm block"
                />
              ) : (
                // HTML label
                <span
                  className="text-xl font-semibold"
                  dangerouslySetInnerHTML={{ __html: item.label }}
                />
              )}
            </div>

            {/* ARROW */}
            <span className="shrink-0 text-xl font-bold leading-none mt-0 text-indigo-900/60">
              →
            </span>

            {/* DESCRIPTION */}
            <div
              className={`text-xl leading-relaxed ${
                item.label !== "color" ? "mt-0.5" : ""
              }`}
            >
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
