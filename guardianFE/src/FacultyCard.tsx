// Card component for faculty members on the about page.
// Contributor: Albert Luna 100%

interface FacultyCardProps {
  name: string;
  title: string;
  college: string;
  photoLink: string;
  link: string;
}
function FacultyCard(props: FacultyCardProps) {
  return (
    <div
      className="facultyCard"
      onClick={() => window.open(props.link, "_blank")}
    >
      <img src={props.photoLink} />
      <div className="facultyCardInfo">
        <h1>{props.name}</h1>
        <h2>{props.title}</h2>
        <h3>{props.college}</h3>
      </div>
    </div>
  );
}

export default FacultyCard;
