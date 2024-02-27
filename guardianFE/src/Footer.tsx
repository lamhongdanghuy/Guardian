function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="bubbles">
          {[...Array(128)].map((_, index) => (
            <div
              key={index}
              className="bubble"
              style={
                {
                  "--size": `${2 + Math.random() * 4}rem`, // Your custom CSS properties
                  "--distance": `${6 + Math.random() * 4}rem`,
                  "--position": `${-5 + Math.random() * 110}%`,
                  "--time": `${2 + Math.random() * 2}s`,
                  "--delay": `${-1 * (2 + Math.random() * 2)}s`,
                } as React.CSSProperties
              } // Casting to React.CSSProperties
            ></div>
          ))}
        </div>
        <div className="content"></div>
      </div>
    </footer>
  );
}

export default Footer;
