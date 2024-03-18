import React from "react";
import "./edit-task.scss";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { ITask } from "../../types/gloval.typing";
import axios from "axios";
import { baseUrl } from "../../constants/url.constant";
const EditTask: React.FC = () => {
  const [task, SetTask] = React.useState<Partial<ITask>>({
    title: "",
    description: "",
  });
  const redirect = useNavigate();
  const { id } = useParams();
  const ChangeHadler = (event: React.ChangeEvent<HTMLInputElement>) => {
    SetTask({
      ...task,
      [event.target.name]: event.target.value,
    });
  };

  React.useEffect(() => {
    axios.get<ITask>(`${baseUrl}/${id}`).then((response) =>
      SetTask({
        title: response.data.title,
        description: response.data.description,
      })
    );
  }, []);
  const handleSaveBtnClick = () => {
     if (task.description === "" || task.title === "") {
          alert("Enter values");
          return;
        }
    
        const data: Partial<ITask> = {
          description: task.description,
          title: task.title,
        };
        axios
          .put(`${baseUrl}/${id}`, data)
          .then((response) => redirect("/task", {state: {message: "Task Updated Successfully!!!"}}))
          .catch((error) => alert("Error!"));
  };
  const handleBackBtnClick = () => {
    redirect("/task");
  };
  return (
    <div className="edit-task">
      <h2>Edit task</h2>
      <TextField
        autoComplete="off"
        label="Description"
        variant="outlined"
        name="condition"
        value={task.description}
        onChange={ChangeHadler}
      />
      <TextField
        autoComplete="off"
        label="Title"
        variant="outlined"
        name="title"
        value={task.title}
        onChange={ChangeHadler}
      />
      <div>
        <Button variant="outlined" color="primary" onClick={handleSaveBtnClick}>
          Save
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
};

export default EditTask;
