import "./FormSelect.scss"

const FormSelect = ({ id, label, values, name, placeholder = "", onChange}) => {
  const handleChange = (event) => {
    const text = event.target.value;
    onChange(text);
  };

  return (
    <div className="form-input">
      {label && <label className="form-input-label" htmlFor={id}>{label}</label>}
      <select
        className="form-input-select"
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleChange}
      >
        <option value="" disabled selected>{placeholder}</option>
        {
          values.map((value) => {
            return <option value={value}>{value}</option>
          })
        }
      </select>
    </div>
  )
}

export default FormSelect;
