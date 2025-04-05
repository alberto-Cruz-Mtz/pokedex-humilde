export const RightRow = (props) => {
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
        d="M4 12h16"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
      <path
        d="M11.033 4.34L4.46 10.911a1.53 1.53 0 000 2.176l6.573 6.573"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
