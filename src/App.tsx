import React from "react";
import Navbar from "./components/navbar/Navbar";
import {BrowserRouter, Route, Routes } from "react-router-dom";
import Task from "./pages/tasks/Tasks.page";
import Home from "./pages/home/Home.page";
import Addpage from "./pages/add-task/Add.task.page";
import EditTask from "./pages/edit-task/EditTask.page";
import DeleteTask from "./pages/delete-task/DeleteTask.page";
import Login from "./pages/login/Login";
import Signup from "./pages/Signup/Signup";
const App: React.FC = () => {
  return (
    <div>
      {/*Navbar*/}
      <Navbar />
      {/*Wrapper*/}
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/task">
            <Route index element={<Task />}/>
            <Route path="add" element={<Addpage />} />
            <Route path="edit/:id" element={<EditTask />} />
            <Route path="delete/:id" element={<DeleteTask />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
