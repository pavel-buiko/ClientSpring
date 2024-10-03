import Cards from "./Cards";
import ProjectSearch from "./ProjectSearch";
export default function ProjectCards() {
  return (
    <div className="main__cards">
      <div className="cards-container">
        <ProjectSearch />
        <Cards />
      </div>
    </div>
  );
}
