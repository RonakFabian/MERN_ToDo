import { useState } from "react";
import Box from "@mui/material/Box";
import style from "../src/style/todo.module.css";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

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
        <Typography variant="h2" textAlign={"center"} className={style.aa}>
          Create TODO:
        </Typography>
        <br />
        <form method="post" onSubmit={(e) => handleSend(e)}>
          <Box>
            <TextField
              type="text"
              name="title"
              value={payload.title}
              required
              onChange={handleInputChange}
              label="TODO Title"
              color="secondary"
              fullWidth
            />
          </Box>
          <br />

          <Box>
            <TextField
              type="text"
              name="description"
              value={payload.description}
              required
              onChange={handleInputChange}
              label="TODO Description"
              color="secondary"
              fullWidth
            />
          </Box>
          <br />
          <Box textAlign={"center"}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowCreateTaskModal(false)}
            >
              Cancel
            </Button>
            &nbsp; &nbsp;
            <Button variant="contained" color="secondary" type="submit">
              Add
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}

export default CreateTask;
