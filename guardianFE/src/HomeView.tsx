function HomeView() {
  return (
    <div>
      <div className="banner">
        <img src="cyber_img.svg" alt="Policy Image" className="midBanner" />

        <h2 className="bannerUpperText" style={{ fontSize: "30px" }}>
          DePaul Guardian Dashboard
        </h2>
        <h2 className="bannerLowerText" style={{ fontSize: "26px" }}>
          DePaul University's Cybersecurity Clinic
        </h2>
      </div>
      <h1>Quick Actions</h1>
    </div>
  );
}

export default HomeView;
