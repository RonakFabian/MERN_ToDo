import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import style from "../src/style/todo.module.css";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

function EditTask({ fetchUserData, setShowEditTaskModal, todo }) {
  const [updatePayload, setUpdatedPayload] = useState({
    title: "",
    description: "",
    completed: false,
  });

  useEffect(() => {
    setUpdatedPayload(todo);
  }, []);

  const todoID = String(todo._id);

  const handleUpdateSend = async (e) => {
    e.preventDefault();
    console.log(e);

    try {
      const response = await fetch(`http://localhost:3000/todo/${todoID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatePayload),
      });
      const data = await response.json();
      console.log("Form submission successful:", data);
      fetchUserData();
      setShowEditTaskModal(false);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleUpdateChangeInput = (e) => {
    const { name, value } = e.target;
    setUpdatedPayload((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <Box className={style.modal}>
        <Typography variant="h2" textAlign={"center"} className={style.aa}>
          Edit TODO:
        </Typography>
        <br />
        <form method="put" onSubmit={(e) => handleUpdateSend(e)}>
          <Box>
            <TextField
              type="text"
              name="title"
              defaultValue={todo.title}
              required
              onChange={handleUpdateChangeInput}
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
              defaultValue={todo.description}
              required
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
              type="button"
              onClick={() => setShowEditTaskModal(false)}
            >
              Cancel
            </Button>
            &nbsp; &nbsp;
            <Button variant="contained" color="secondary" type="submit">
              Edit
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}

export default EditTask;
