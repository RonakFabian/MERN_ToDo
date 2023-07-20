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

function Task({ todo, fetchUserData }) {
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/todo/${id}`, {
        method: "DELETE",
      });
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
        <EditTask
          fetchUserData={fetchUserData}
          setShowEditTaskModal={setShowEditTaskModal}
          todo={todo}
        />
      )}
      <li key={String(todo._id)}>
        <Card sx={{ minWidth: 275, flexGrow: 1 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {todo.index}
            </Typography>
            <Typography variant="h3" component="div">
              {todo.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Description:
            </Typography>
            <Typography variant="h5">{todo.description}</Typography>
            <Checkbox defaultChecked />
            <button onClick={() => deleteTodo(String(todo._id))}>Delete</button>
            <button onClick={() => setShowEditTaskModal(true)}>Edit</button>
          </CardContent>
        </Card>
      </li>
    </>
  );
}

export default Task;
