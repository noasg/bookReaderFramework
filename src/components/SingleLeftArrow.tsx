type ArrowProps = {
  width?: number | string;
  height?: number | string;
};

export default function TripleLeftArrow({
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
      {/* Three left arrows */}
      <path
        d="M22 12 L14 20 L22 28"
        stroke="#312c85"
        strokeWidth={3.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30 12 L22 20 L30 28"
        stroke="#312c85"
        strokeWidth={3.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38 12 L30 20 L38 28"
        stroke="#312c85"
        strokeWidth={3.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
