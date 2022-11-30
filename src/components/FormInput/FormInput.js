import "./FormInput.scss";

const FormInput = ({ id, label, type, value, name, className = "", placeholder = "", onChange, ...rest}) => {
  const handleChange = (event) => {
    const text = event.target.value;
    onChange(text);
  };

  return (
    <div className="form-input">
      {label && <label className="form-input-label" htmlFor={id}>{label}</label>}
      <input
        className={`form-input-input ${className}`}
        type={type}
        value={value}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleChange}
        {...rest}
      />
    </div>
  );
};

export default FormInput;
