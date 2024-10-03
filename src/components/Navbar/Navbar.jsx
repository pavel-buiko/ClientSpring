import Burger from "./Burger";
import Logo from "./Logo";
import MenuList from "./MenuList";

export default function Navbar() {
  return (
    <div>
      <header className="header">
        <div className="header__container">
          <Logo />
          <Burger />
          <MenuList />
        </div>
      </header>
    </div>
  );
}
