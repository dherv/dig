export const Rank3on5 = ({ size = 24 }) => {
  const color = "#eab308";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="128" height="128" fill="transparent" />
      <rect
        x="8.5"
        y="94.5"
        width="14"
        height="19"
        fill={color}
        stroke={color}
      />
      <rect
        x="32.5"
        y="74.5"
        width="14"
        height="39"
        fill={color}
        stroke={color}
      />
      <rect
        x="56.5"
        y="54.5"
        width="14"
        height="59"
        fill={color}
        stroke={color}
      />
      <rect
        x="80.5"
        y="34.5"
        width="14"
        height="79"
        fill="transparent"
        stroke={color}
      />
      <rect
        x="104.5"
        y="14.5"
        width="14"
        height="99"
        fill="transparent"
        stroke={color}
      />
    </svg>
  );
};
