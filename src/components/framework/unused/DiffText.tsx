import { diffWords } from "diff";

type DiffTextProps = {
  baseText: string;
  compareText: string;
};

export default function DiffText({ baseText, compareText }: DiffTextProps) {
  const diff = diffWords(baseText, compareText);

  return (
    <p className="leading-7 text-indigo-900">
      {diff.map((part, index) => {
        if (part.added) {
          return (
            <span
              key={index}
              className="font-bold text-green-700 bg-green-100/50 rounded px-0.5"
            >
              {part.value}
            </span>
          );
        }

        if (part.removed) {
          return (
            <span
              key={index}
              className="underline text-red-600 decoration-red-400"
            >
              {part.value}
            </span>
          );
        }

        return <span key={index}>{part.value}</span>;
      })}
    </p>
  );
}
