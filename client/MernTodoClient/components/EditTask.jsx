import { useEffect, useState } from "react";
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
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

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
      <Box sx={style}>
        <form method="put" onSubmit={(e) => handleUpdateSend(e)}>
          <div>
            Task Title:
            <input
              type="text"
              name="title"
              defaultValue={todo.title}
              onChange={handleUpdateChangeInput}
            />
          </div>
          <div>
            Task Description:
            <input
              type="text"
              name="description"
              defaultValue={todo.description}
              onChange={handleUpdateChangeInput}
            />
          </div>
          <br />
          <button type="button" onClick={() => setShowEditTaskModal(false)}>
            Cancel
          </button>
          <button type="submit">Edit</button>
        </form>
      </Box>
    </>
  );
}

export default EditTask;
