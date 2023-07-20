import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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
      <Box sx={style}>
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
          <button type="submit">Create ToDo!</button>
          <button onClick={() => setShowCreateTaskModal(false)}>Cancel</button>
        </form>{" "}
      </Box>
    </>
  );
}

export default CreateTask;
