// Member Card component for team members under a project
// Contributor: Albert Luna 100%

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
        border: "2px solid #33689c",
        backgroundColor: "#f6f7f8",
        width: "46%",
        padding: ".5em",
        borderRadius: "1em",
        margin: ".25em",
        color: "#33689c",
      }}
    >
      <h1 style={{ fontSize: "32px", marginLeft: "0vw", marginRight: "auto" }}>
        {props.name}
      </h1>
      <h1
        style={{
          fontSize: "24px",
          marginLeft: "0vw",
          marginRight: "auto",
          color: "#6e7c85",
        }}
      >
        {props.email}
      </h1>
    </div>
  );
}

export default MemberCard;
