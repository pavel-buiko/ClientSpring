import PropTypes from "prop-types";

export default function LoginButton({ onClick, label, type }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="login__card__info__buttons__button"
    >
      {label}
    </button>
  );
}

LoginButton.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
};
