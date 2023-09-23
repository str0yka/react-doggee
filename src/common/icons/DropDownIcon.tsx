interface DropDownIconProps extends React.ComponentProps<'svg'> {}

export const DropDownIcon: React.FC<DropDownIconProps> = (props) => (
  <svg
    {...props}
    width="10"
    height="6"
    viewBox="0 0 10 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.28033 0.71967C9.57322 1.01256 9.57322 1.48744 9.28033 1.78033L5.28033 5.78033C4.98744 6.07322 4.51256 6.07322 4.21967 5.78033L0.21967 1.78033C-0.0732233 1.48744 -0.0732233 1.01256 0.21967 0.71967C0.512563 0.426777 0.987437 0.426777 1.28033 0.71967L4.75 4.18934L8.21967 0.71967C8.51256 0.426777 8.98744 0.426777 9.28033 0.71967Z"
      fill="black"
      fillOpacity="0.5"
    />
  </svg>
);
