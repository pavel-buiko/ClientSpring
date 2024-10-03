import PropTypes from "prop-types";

export default function LoginButton({ onClick, label }) {
  return (
    <button onClick={onClick} className="login__card__info__buttons__button">
      {label}
    </button>
  );
}

LoginButton.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
};
