import "./FormInput.scss";

const FormInput = (props) => {
  const handleChange = (event) => {
    const text = event.target.value;
    props.onChange(text);
  };

  return (
    <div className="form-input">
      <label className="form-input-label" htmlFor={props.id}>
        {props.label}
      </label>
      <input
        className="form-input-input"
        type={props.type}
        value={props.value}
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        onChange={handleChange}
        onBlur={handleChange}
      />
    </div>
  );
};

export default FormInput;
