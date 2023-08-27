import s from './Checkbox.module.scss';

export const Checkbox: React.FC<InputProps> = ({ label, ...props }) => (
  <label className={s.checkboxContainer}>
    <input
      {...props}
      className={s.checkbox}
      type="checkbox"
    />
    <div className={s.customCheckbox} />
    <span className={s.checkboxLabel}>{label}</span>
  </label>
);
