import { brown } from "@mui/material/colors";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const SecondaryButton = ({ text, functionOnClick }) => {
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(brown[200]),
    backgroundColor: brown[50],
    "&:hover": {
      backgroundColor: brown[50],
    },
  }));
  return (
    <ColorButton
      style={{ color: "#59483e" }}
      onClick={(e) => functionOnClick(e)}
      variant="contained"
      type="submit">
      {text}
    </ColorButton>
  );
};

export default SecondaryButton;
