import 'components/FormSelect/FormSelect.scss';

const FormSelect = ({
  id,
  label,
  value,
  options,
  name,
  onChange,
  className = '',
  placeholder = '',
  ...rest
}) => {
  const handleChange = (event) => {
    const text = event.target.value;
    onChange(text);
  };

  return (
    <div className="form-input">
      {label && (
        <label className="form-input__label" htmlFor={id}>
          {label}
        </label>
      )}
      <select
        className={`form-input__select ${className}`}
        name={name}
        id={id}
        value={value}
        onChange={handleChange}
        onBlur={handleChange}
        {...rest}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => {
          return (
            <option key={option.key} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelect;
