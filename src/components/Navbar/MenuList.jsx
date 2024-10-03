import menuItems from "../../../public/assets/dataArrays/menuItems";

export default function MenuList() {
  return (
    <nav className="header__navigation">
      <ul className="header__navigation__menu">
        {menuItems.map((item) => {
          return (
            <li key={item.header} className="header__navigation__menu__item">
              <a href="">
                <span className="menu__header">{item.header}</span>
              </a>
              <ul className="header__navigation__submenu">
                {item.list.map((subItem, index) => {
                  return <li key={index}>{subItem}</li>;
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
