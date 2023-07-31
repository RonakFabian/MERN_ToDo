import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import style from "../src/style/todo.module.css";

function CreateTask({ fetchUserData, setShowCreateTaskModal }) {
  const [payload, setPayload] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const handleSend = async (e) => {
    e.preventDefault();
    console.log(payload);
    setShowCreateTaskModal(false);

    try {
      const response = await fetch("http://localhost:3000/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log("Form submission successful:", data);
      fetchUserData();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* <Box className={style.modalBackground}></Box> */}

      <Box className={style.modal}>
        <form method="post" onSubmit={(e) => handleSend(e)}>
          <div>
            Task Title:
            <input
              type="text"
              name="title"
              value={payload.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            Task Description:
            <input
              type="text"
              name="description"
              value={payload.description}
              onChange={handleInputChange}
            />
          </div>

          <br />
          <button onClick={() => setShowCreateTaskModal(false)}>Cancel</button>
          <button type="submit">Create ToDo!</button>
        </form>
      </Box>
    </>
  );
}

export default CreateTask;
