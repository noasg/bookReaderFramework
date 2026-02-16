type ArrowProps = {
  width?: number | string;
  height?: number | string;
};

export default function LeftArrow({ width = 48, height = 48 }: ArrowProps) {
  // Each arrow width (approximate from coordinates)
  const arrowWidth = 8;
  const spacing = 0; // space between arrows

  // center of the circle
  const centerX = 24;

  // positions for three arrows, centered
  const positions = [
    centerX - arrowWidth - spacing, // left arrow
    centerX, // middle arrow
    centerX + arrowWidth + spacing, // right arrow
  ];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
    >
      <circle cx="24" cy="24" r="22" fill="#312c85" />

      {positions.map((x, i) => (
        <path
          key={i}
          d={`M${x + 3} 14 L${x - 5} 24 L${x + 3} 34`} // arrow coordinates
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
