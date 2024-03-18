import "./navbar.scss";
import { Menu, Close } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState } from "react";
const Navbar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

   const toggleNavBar = () => {
      if (window.innerWidth < 500) {
         setOpen(!open);
      }
   };

   const menuStyle = open ? "menu open" : "menu";
  return (
    <div className="navbar">
      <div className="title">World of task</div>
      <div className="condition">
      <Menu onClick={toggleNavBar} />
      </div>
         <div className={menuStyle}>
        <ul>
        <Close className="close" onClick={toggleNavBar} />
          <li onClick={toggleNavBar}>
            <Link to="/">Home</Link>
          </li>
          <li onClick={toggleNavBar}>
            <Link to="/task">Task</Link>
          </li>
          <li onClick={toggleNavBar}>
            <Link to="/task/add">Add Task</Link>
          </li>
          <li onClick={toggleNavBar}>
            <Link to="/login">Log in</Link>
          </li>
          <li onClick={toggleNavBar}>
            <Link to="/signup">Register</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;


