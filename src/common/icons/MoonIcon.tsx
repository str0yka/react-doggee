interface MoonIconProps extends React.ComponentProps<'svg'> {}

export const MoonIcon: React.FC<MoonIconProps> = (props) => (
  <svg
    {...props}
    width="44"
    height="44"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M44 26.913C41.3186 28.8539 38.0103 30 34.4309 30C25.4823 30 18.2281 22.8365 18.2281 14C18.2281 8.19781 21.3557 3.11694 26.037 0.311707C24.8152 0.10675 23.5596 0 22.2788 0C9.97456 0 0 9.84973 0 22C0 34.1503 9.97456 44 22.2788 44C32.8728 44 41.7397 36.6982 44 26.913Z"
      fill="#93B1FF"
    />
  </svg>
);
