import './FormInput.scss';

const FormInput = ({
  id,
  label,
  type,
  value,
  name,
  className = '',
  placeholder = '',
  onChange,
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
      {type === 'textarea' ? (
        <textarea
          className={`form-input__input ${className}`}
          value={value}
          name={name}
          id={id}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleChange}
          {...rest}
        />
      ) : (
        <input
          className={`form-input__input ${className}`}
          type={type}
          value={value}
          name={name}
          id={id}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleChange}
          {...rest}
        />
      )}
    </div>
  );
};

export default FormInput;
