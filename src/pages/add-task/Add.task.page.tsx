import React, { useEffect } from "react";
import "./add-task.scss";
import { TextField, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ITask } from "../../types/gloval.typing";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../constants/url.constant";
import dayjs from "dayjs";
import "./data-picker.scss"

const Addpage: React.FC = () => {
  const [start_date, SetStart] = React.useState<Date>(new Date());
  const [end_date, SetEnd] = React.useState<Date>(new Date());
  const [task, SetTask] = React.useState<Partial<ITask>>({
    condition: "to do",
    title: "",
    description: "",
    date_of_Start: start_date,
    date_of_End: end_date,
  });

  useEffect(() => {
    SetTask({
      ...task,
      date_of_Start: start_date,
      date_of_End: end_date,
    });
  }, [start_date, end_date]);

  const redirect = useNavigate();

  const ChangeHadler = (event: React.ChangeEvent<HTMLInputElement>) => {
    SetTask({
      ...task,
      [event.target.name]: event.target.value,
    });
  };

  const handleSaveBtnClick = () => {
    if (task.title === "" || task.description === "") {
      alert("Enter values");
      return;
    }

    if (start_date < new Date() || end_date < new Date()) {
      alert("Start date or end date cannot be earlier than today");
      return;
    }

    if (end_date < start_date) {
      alert("End date cannot be earlier than start date");
      return;
    }

    const data: Partial<ITask> = {
      condition: task.condition,
      description: task.description,
      title: task.title,
      date_of_Start: task.date_of_Start,
      date_of_End: task.date_of_End,
    };

    axios
      .post(baseUrl, data)
      .then((response) =>
        redirect("/task", {
          state: { message: "Task Created Successfully!!!" },
        })
      )
      .catch((error) => alert("Error!"));
  };

  const handleBackBtnClick = () => {
    redirect("/task");
  };

  return (
    <section>
      <div className="form-box">
        <div className="add-task">
        <h2 style={{ color: 'white' }}>Add new task</h2>
          <TextField
            autoComplete="off"
            label="Title"
            variant="outlined"
            name="title"
            value={task.title}
            onChange={ChangeHadler}
            InputProps={{
              style: { color: "white", borderColor: "white" }, 
            }}
            InputLabelProps={{
              style: { color: "white" }, 
            }}
          />
          <TextField
            autoComplete="off"
            label="Description"
            variant="outlined"
            name="description"
            value={task.description}
            onChange={ChangeHadler}
            InputProps={{
              style: { color: "white", borderColor: "white" }, 
            }}
            InputLabelProps={{
              style: { color: "white" }, 
            }}
          />
          <TextField
            autoComplete="off"
            label="Condition"
            variant="outlined"
            name="condition"
            value="to do"
            onChange={ChangeHadler}
            InputProps={{
              style: { color: "white", borderColor: "white" }, 
            }}
            InputLabelProps={{
              style: { color: "white" }, 
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start date"
              name="Date_of_Start"
              value={dayjs(start_date)}
              onChange={(date) => date && SetStart(date.toDate())}
              className="custom-datepicker"
              
            />
            <DatePicker
              label="End date"
              name="Date_of_End"
              value={dayjs(end_date)}
              onChange={(date) => date && SetEnd(date.toDate())}
              className="custom-datepicker"
            />
          </LocalizationProvider>
          <div>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleSaveBtnClick}
            >
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
      </div>
    </section>
  );
};

export default Addpage;
