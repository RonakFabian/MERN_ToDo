/* eslint-disable react/prop-types */
import { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditTask from "../components/EditTask";
import style from "../src/style/todo.module.css";
import Modal from "@mui/material/Modal";

function Task({ todo, fetchUserData }) {
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(
        `https://mern-todo-a9sn.onrender.com/todo/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log("Form submission successful:", data);
      fetchUserData();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <>
      {showEditTaskModal && (
        <Modal open={showEditTaskModal}>
          <EditTask
            fetchUserData={fetchUserData}
            setShowEditTaskModal={setShowEditTaskModal}
            todo={todo}
          />
        </Modal>
      )}

      <Card
        className={style.taskCard}
        sx={{
          marginBottom: "50px",
          borderRadius: "10px",
          padding: "15px",
        }}
      >
        <Box
          className={style.ag}
          sx={{
            textAlign: "center",
            typography: "subtitle2",
            fontFamily: "Monospace",
            fontWeight: "bold",
            fontSize: "2rem",
            textTransform: "capitalize",
          }}
        >
          {todo.title}
        </Box>
        <Box
          sx={{
            typography: "subtitle2",
            textAlign: "center",
            fontFamily: "Monospace",
            padding: "10px",
          }}
        >
          {todo.description}
        </Box>
        <Box
          sx={{
            textAlign: "center",
            typography: "subtitle2",
            fontFamily: "Monospace",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => deleteTodo(String(todo._id))}
          >
            Delete
          </Button>
          &nbsp;
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setShowEditTaskModal(true)}
          >
            Edit
          </Button>
        </Box>
      </Card>
    </>
  );
}

export default Task;
