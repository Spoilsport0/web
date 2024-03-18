import React, { useEffect } from 'react';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import cat from "../../assets/images/cats.jpg";
import image1 from "../../assets/images/image1.jpg"
import image2 from "../../assets/images/image2.jpg"
import image3 from "../../assets/images/image3.jpg"
import image4 from "../../assets/images/image4.jpg"
import "./home.scss";

const Home2 = () => {
  const redirect = useNavigate();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'app.js';
    script.async = true;
    document.body.appendChild(script);

    // Не потрібно видаляти скрипт після розмонтовування
    // return () => {
    //   document.body.removeChild(script);
    // };
  }, []);

  return (
    <>
      <div className="slider">
        <div className="list">
          <div className="item">
            <img src={image1} alt="image1" />
          </div>
          <div className="item active">
            <img src={image2} alt="image2" />
          </div>
          <div className="item">
            <img src={image3} alt="image3" />
          </div>
          <div className="item">
            <img src={image4} alt="image4" />
          </div>
        </div>
        <div className="circle">
          LUN DEV YOUTUBE - coding and design website - coding and design website
        </div>
        <div className="content">
          <div>menu</div>
          <div>restaurant</div>
          <button>See More</button>
        </div>
        <div className="arow">
          <button id="prev"></button>
          <button id="next"></button>
        </div>
      </div>

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
        <img src={cat} alt="cat" />
      </div>
    </>
  );
};

export default Home2;
