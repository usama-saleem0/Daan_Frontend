const ArrowLeftIcon = ({ width = 24, height = 24, fill = "black" }) => {
  return (
    <svg
      fill="none"
      height={height}
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.3 12.7l7 7c.4.4 1 .4 1.4 0s.4-1 0-1.4l-5.3-5.3h11.6c.6 0 1-.4 1-1s-.4-1-1-1H7.4l5.3-5.3c.4-.4.4-1 0-1.4-.2-.2-.4-.3-.7-.3s-.5.1-.7.3l-7 7c-.4.4-.4 1 0 1.4z"
        fill={fill}
      />
    </svg>
  );
};

export default ArrowLeftIcon;
