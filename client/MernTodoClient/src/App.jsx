import { useEffect, useState } from "react";
import Task from "../components/Task";
import CreateTask from "../components/CreateTask";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import style from "./style/todo.module.css";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Modal from "@mui/material/Modal";

function App() {
  const [todos, setTodos] = useState([{}]);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");

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
  const todoList = todos
    .filter((todo) => {
      return searchInput.toLowerCase() === ""
        ? todo
        : todo.title.toLowerCase().includes(searchInput) ||
            todo.description.toLowerCase().includes(searchInput);
    })
    .map((todo) => (
      <Task key={todo.index} todo={todo} fetchUserData={fetchUserData} />
    ));

  const OnSearchInput = (e) => {
    console.log(e.target.value);
    setSearchInput(e.target.value);
  };

  return (
    <>
      <Box>
        <Box sx={{ padding: "10px" }}>
          <TextField
            id="outlined-basic"
            label="Search for a TODO..."
            variant="outlined"
            fullWidth
            color="primary"
            size="small"
            sx={{
              marginRight: "5px",
              color: "white",
              fontColor: "white",
            }}
            onChange={(e) => OnSearchInput(e)}
            InputProps={{
              style: { color: "white" },
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box className={style.header}>
          <Typography variant="h2" component="div" className={style.ag}>
            TODOs
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setShowCreateTaskModal(true)}
          >
            <AddBoxIcon />
            &nbsp;Add Task
          </Button>
        </Box>
      </Box>

      {showCreateTaskModal && (
        <Modal open={showCreateTaskModal}>
          <CreateTask
            fetchUserData={fetchUserData}
            setShowCreateTaskModal={setShowCreateTaskModal}
          />
        </Modal>
      )}
      <Grid
        style={{
          padding: "20px",
          maxWidth: "1000px",
          margin: "auto",
        }}
      >
        <div>{todoList}</div>
      </Grid>
    </>
  );
}

export default App;
