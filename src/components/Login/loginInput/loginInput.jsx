import PropTypes from "prop-types";

export default function LoginInput({
  type,
  value,
  onChange,
  name,
  placeholder,
  autoComplete,
}) {
  return (
    <input
      type={type}
      value={value}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      className="login__card__info__inputs__input"
      autoComplete={autoComplete}
    />
  );
}

LoginInput.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  name: PropTypes.string,
};
