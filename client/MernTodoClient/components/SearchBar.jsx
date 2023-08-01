import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, Box, InputAdornment } from "@mui/material";

function SearchBar() {
  const [searchInput, setSearchInput] = useState("");

  const OnSearchInput = (e) => {
    console.log(e.target.value);
    setSearchInput(e.target.value);
  };

  return (
    <Box sx={{ padding: "10px" }}>
      <TextField
        id="outlined-basic"
        label="Search for a TODO..."
        variant="outlined"
        fullWidth
        color="secondary"
        size="small"
        sx={{
          marginRight: "5px",
          color: "white",
          fontColor: "white",
        }}
        onChange={(e) => OnSearchInput(e)}
        InputProps={{
          style: { color: "white", labelColor: "white" },
          endAdornment: (
            <InputAdornment position="start" color="secondary">
              <SearchIcon color="secondary" />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

export default SearchBar;
