// Member Card component for team members under a project
// Contributor: Albert Luna

interface MemberCardProps {
  name: string;
  role: string;
  email: string;
}

function MemberCard(props: MemberCardProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid white",
        width: "46%",
        padding: ".5em",
        borderRadius: "1em",
      }}
    >
      <h1 style={{ fontSize: "32px", marginLeft: "0vw", marginRight: "auto" }}>
        {props.name}
      </h1>
      <h1 style={{ fontSize: "32px", marginLeft: "0vw", marginRight: "auto" }}>
        {props.email}
      </h1>
    </div>
  );
}

export default MemberCard;
