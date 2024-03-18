import React from 'react'
import './delete-task.scss'
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { ITask } from "../../types/gloval.typing";
import axios from "axios";
import { baseUrl } from "../../constants/url.constant";

const DeleteTask = () => {
  const redirect = useNavigate();
  const { id } = useParams();
  const handleDeleteBtnClick = () => {
        axios
          .delete(`${baseUrl}/${id}`)
          .then((response) => redirect("/task", {state: {message: "Task Deleted Successfully!!!"}}))
          .catch((error) => alert("Error!"));
  };
  const handleBackBtnClick = () => {
    redirect("/task");
  };
  return (
    <div className="delete-task">
      <h2>Delete task</h2>
      <h4>Are you sure you want to delete this task?</h4>
      <div>
        <Button variant="outlined" color="error" onClick={handleDeleteBtnClick}>
          Yes, delete it
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleBackBtnClick}
        >
          Back
        </Button>
      </div>
    </div>
  );
}

export default DeleteTask