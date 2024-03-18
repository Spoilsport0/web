import React from 'react';
import "./home.scss";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import cat from "../../assets/images/cats.jpg";
import img1 from "../../assets/images/image1.jpg";
import img2 from "../../assets/images/image2.jpg";
import img3 from "../../assets/images/image3.jpg";

const Home = () => {
  const redirect = useNavigate();

  return (
    <div className="home">
      <h1>Welcome to World of Task</h1>
      <div className="button">
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => redirect("/task")}>
          Task List
        </Button>
      </div>
      <div className='slider'>
      </div>
    </div>
  );
};

export default Home;
