import "./navbar.scss";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.svg" alt="" />
        <span>Shivam Admin</span>
      </div>
      <div className="icons">
        <img src="/search.svg" alt="" className="icon" />
        <img src="/app.svg" alt="" className="icon" />
        <img src="/expand.svg" alt="" className="icon" />
        <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>
        <div className="user">
          <img src="https://lh3.googleusercontent.com/ogw/AF2bZyjcy503LE5pHPcXZyeH6MtyrHADkL-YKwaoG5rk_CEjxcE=s64-c-mo" alt="" />
        </div>
        <span>Shivam</span>
        <img src="/settings.svg" alt="" className="icon" />
      </div>
    </div>
  );
};
