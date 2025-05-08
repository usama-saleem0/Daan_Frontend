const ArrowRightIcon = ({ width = 24, height = 24, fill = "black" }) => {
  return (
    <svg
      fill="none"
      height={height}
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <clipPath id="clip0">
        <path d="M4 4h16v16H4z" />
      </clipPath>
      <g clipPath="url(#clip0)">
        <path
          d="M19.7 11.3l-7-7c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l5.3 5.3H4c-.6 0-1 .4-1 1s.4 1 1 1h11.6l-5.3 5.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3s.5-.1.7-.3l7-7c.4-.4.4-1 0-1.4z"
          fill={fill}
        />
      </g>
    </svg>
  );
};

export default ArrowRightIcon;
