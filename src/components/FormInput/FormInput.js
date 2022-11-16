import "./FormInput.scss";

const FormInput = ({ id, label, type, value, name, placeholder = "", onChange}) => {
  const handleChange = (event) => {
    const text = event.target.value;
    onChange(text);
  };

  return (
    <div className="form-input">
      <label className="form-input-label" htmlFor={id}>
        {label}
      </label>
      <input
        className="form-input-input"
        type={type}
        value={value}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleChange}
      />
    </div>
  );
};

export default FormInput;
