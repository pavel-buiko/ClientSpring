import logo from "../../../public/assets/images/spring.png";

export default function Logo() {
  return (
    <div className="header__icon">
      <img src={logo} alt="header icon" className="header__icon__image" />
    </div>
  );
}
