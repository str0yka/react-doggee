interface TickIconProps extends React.ComponentProps<'svg'> {}

export const TickIcon: React.FC<TickIconProps> = (props) => (
  <svg
    {...props}
    width="17"
    height="13"
    viewBox="0 0 17 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.801 3.35982C16.3408 2.81998 16.3408 1.94472 15.801 1.40488C15.2612 0.865039 14.3859 0.865039 13.8461 1.40488L6.58824 8.66271L2.85982 4.93429C2.31998 4.39445 1.44472 4.39445 0.904882 4.93429C0.365039 5.47414 0.365039 6.34939 0.904882 6.88924L5.61076 11.5951C6.15061 12.135 7.02586 12.135 7.56571 11.5951L15.801 3.35982Z"
      fill="#93B1FF"
      stroke="#93B1FF"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
