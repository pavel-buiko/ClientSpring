import { useState } from "react";
import menuItems from "../../../public/assets/dataArrays/menuItems";

export default function Burger() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    document.body.classList.toggle("overflowHidden", !isMenuOpen);
  };

  const handleItemClick = (item) => {
    setActiveSubmenu(activeSubmenu === item ? null : item);
  };

  return (
    <div className="global_burger">
      <div
        className={`header__hammenu ${
          isMenuOpen ? "header__hammenu__active" : ""
        }`}
        onClick={toggleMenu}
      >
        <span className="header__hammenu__span"></span>
      </div>
      <nav
        className={`header__navigation ${
          isMenuOpen ? "header__navigation--active" : ""
        }`}
      >
        <ul className="header__navigation__menu">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="header__navigation__menu__item active"
              onClick={() => handleItemClick(index)}
            >
              <a className="header__navigation__menu__item__link" href="#">
                <span className="menu__header">{item.header}</span>
              </a>

              {activeSubmenu === index && (
                <ul className="header__navigation__submenu">
                  {item.list.map((subItem) => (
                    <li key={subItem}>
                      <a href="#">{subItem}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
