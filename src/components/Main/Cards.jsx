import { useSelector } from "react-redux";

export default function Cards() {
  const { filteredObjects } = useSelector((state) => state.search);

  return (
    <div className="main__cards__container">
      {filteredObjects.map((arrayItem) => {
        return (
          <article key={arrayItem.title} className="main__cards__article">
            <a className="main__cards__article__item" href="#">
              <div className="main__cards__article__item__icon">
                <img
                  className="main__cards__article__item__image"
                  src={arrayItem.imgSrc}
                  alt="card image"
                />
              </div>
              <div className="main__cards__article__item__details">
                <h4 className="main__cards__article__item__details__header">
                  {arrayItem.title}
                </h4>
                <p className="main__cards__article__item__details__text">
                  {arrayItem.description}
                </p>
              </div>
            </a>
          </article>
        );
      })}
    </div>
  );
}
