import "./FormInput.scss";

const FormInput = (props) => {
  return (
    <div className="form-input">
      <label className="form-input-label" htmlFor={props.id}>{props.label}</label>
      <input
        className="form-input-input"
        type={props.type}
        value={props.value}
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
      />
    </div>
  )
}

export default FormInput;
