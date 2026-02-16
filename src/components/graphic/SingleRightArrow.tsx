type ArrowProps = {
  width?: number | string;
  height?: number | string;
};

export default function TripleRightArrow({
  width = 54,
  height = 40,
}: ArrowProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 54 40"
      width={width}
      height={height}
      fill="none"
    >
      {/* Three right arrows, perfectly centered horizontally */}
      <path
        d="M32 12 L40 20 L32 28"
        stroke="#312c85"
        strokeWidth={3.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 12 L32 20 L24 28"
        stroke="#312c85"
        strokeWidth={3.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 12 L24 20 L16 28"
        stroke="#312c85"
        strokeWidth={3.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
