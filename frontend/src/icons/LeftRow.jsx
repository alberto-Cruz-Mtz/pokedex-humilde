export const LeftRow = (props) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20 12H4"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
      <path
        d="M12.968 19.66l6.572-6.572a1.53 1.53 0 000-2.176L12.968 4.34"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
