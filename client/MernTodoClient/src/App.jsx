import { useEffect, useState } from "react";
import Task from "../components/Task";
import CreateTask from "../components/CreateTask";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

function App() {
  const [todos, setTodos] = useState([{}]);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    fetch("http://localhost:3000/todo", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      });
  };

  return (
    <>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Task Management
            </Typography>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => setShowCreateTaskModal(true)}
            >
              Add Task
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      {showCreateTaskModal && (
        <CreateTask
          fetchUserData={fetchUserData}
          setShowCreateTaskModal={setShowCreateTaskModal}
        />
      )}

      <div>
        <ul style={{ listStyleType: "none" }}>
          {todos.length > 0 &&
            todos.map((todo) => (
              <Task
                key={todo.index}
                todo={todo}
                fetchUserData={fetchUserData}
              />
            ))}
        </ul>
      </div>
    </>
  );
}

export default App;
