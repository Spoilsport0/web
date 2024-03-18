import { useState, useEffect } from "react";
import "./tasks.scss";
import { ITask } from "../../types/gloval.typing";
import axios from "axios";
import { baseUrl } from "../../constants/url.constant";
import { Button, Select, MenuItem } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import dayjs from "dayjs";

const Task: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<ITask[]>([]);
  const [doneTasks, setDoneTasks] = useState<ITask[]>([]);
  const location = useLocation();
  const redirect = useNavigate();

  const fetchTaskList = async () => {
    try {
      const response = await axios.get<ITask[]>(baseUrl);
      const { data } = response;
      setTasks(data);
      const inProgress = data.filter(
        (task) => task.condition === "in progress"
      );
      setInProgressTasks(inProgress);
      const done = data.filter((task) => task.condition === "done");
      setDoneTasks(done);

      if (location?.state) {
        Swal.fire({
          icon: "success",
          title: location?.state?.message,
        });
        redirect(location.pathname, { replace: true });
      }
    } catch (error) {
      alert("An Error Happened");
    }
  };

  useEffect(() => {
    fetchTaskList();
  }, []);

  const redirectToEditPage = (id: string) => {
    redirect(`/task/edit/${id}`);
  };

  const redirectToDeletePage = (id: string) => {
    redirect(`/task/delete/${id}`);
  };
  const handleConditionChange = (taskId: string, newCondition: string) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, condition: newCondition };
        }
        return task;
      });
  
      if (newCondition === "done") {
        const taskToMove = updatedTasks.find((task) => task.id === taskId)!;
        setDoneTasks((prevDoneTasks) => [...prevDoneTasks, taskToMove]);
        setInProgressTasks((prevInProgressTasks) =>
          prevInProgressTasks.filter((task) => task.id !== taskId)
        );
      } else if (newCondition === "in progress") {
        const taskToMove = updatedTasks.find((task) => task.id === taskId)!;
        setInProgressTasks((prevInProgressTasks) => [...prevInProgressTasks, taskToMove]);
        setDoneTasks((prevDoneTasks) =>
          prevDoneTasks.filter((task) => task.id !== taskId)
        );
      }
  
      return updatedTasks;
    });
  };
  

  return (
    <div className="tasks">
      <h1 className="header1">Task List</h1>
      <div className="task-container">
        {tasks.map((task) => (
          <div className="task-box" key={task.id}>
            <h2>{task.title}</h2>
            <p>Condition: {task.condition}</p>
            <p>Description: {task.description}</p>
            <p>Date of Start: {dayjs(task.date_of_Start).format("YYYY-MM-DD")}</p>
            <p>Date of End: {dayjs(task.date_of_End).format("YYYY-MM-DD")}</p>
            <div className="task-buttons">
              <Button
                variant="outlined"
                color="warning"
                sx={{ mx: 3 }}
                onClick={() => redirectToEditPage(task.id)}
              >
                <Edit />
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => redirectToDeletePage(task.id)}
              >
                <Delete />
              </Button>
            </div>
            <Select
              value={task.condition}
              onChange={(e) =>
                handleConditionChange(task.id, e.target.value as string)
              }
            >
              <MenuItem value={"done"}>Done</MenuItem>
              <MenuItem value={"in progress"}>In Progress</MenuItem>
              <MenuItem value={"to do"}>To Do</MenuItem>
            </Select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task;
