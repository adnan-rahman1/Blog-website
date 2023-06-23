import IconButton from "@mui/material/IconButton";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Paper from "@mui/material/Paper";
import Cancel from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import InputBase from "@mui/material/InputBase";
import { useTheme } from "@mui/material/styles";

import styled from "@emotion/styled";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  flex: 1,
}));
const StyledPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  border: 0,
  height: "50px",
}));
const SearchSection = ({
  searchKeyword,
  searchOrder,
  handleSearchKeyword,
  handleSearchOrder,
  handleShowSearchField,
}) => {
  const theme = useTheme();
  return (
    <StyledPaper elevation={0} component="form">
      <IconButton disableRipple disabled aria-label="menu">
        <SearchIcon color="secondary" />
      </IconButton>
      <StyledInputBase
        autoFocus
        onChange={handleSearchKeyword}
        value={searchKeyword}
        key="searchKeyword"
        name="searchKeyword"
        placeholder={searchKeyword == "" ? "Search Posts" : searchKeyword}
      />
      <ToggleButtonGroup
        style={{ marginRight: "2px" }}
        size="small"
        key="searchOrder"
        orientation="horizontal"
        value={searchOrder}
        exclusive
        onChange={handleSearchOrder}
      >
        <ToggleButton
          style={{
            background: "inherit",
            color:
              searchOrder == "desc"
                ? theme.palette.success.main
                : theme.palette.error.main,
            border: 0,
          }}
          disableRipple
          value="desc"
        >
          <ArrowUpwardIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton
          style={{
            background: "inherit",
            color:
              searchOrder == "asc"
                ? theme.palette.success.main
                : theme.palette.error.main,
            border: 0,
          }}
          disableRipple
          value="asc"
        >
          <ArrowDownwardIcon fontSize="small" />
        </ToggleButton>
      </ToggleButtonGroup>
      <IconButton
        disableRipple
        title="Close Search"
        aria-label="directions"
        onClick={handleShowSearchField}
      >
        <Cancel color="error" />
      </IconButton>
    </StyledPaper>
  );
};

export default SearchSection;
