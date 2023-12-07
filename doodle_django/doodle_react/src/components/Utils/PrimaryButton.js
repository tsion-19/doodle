import { brown } from "@mui/material/colors";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const PrimaryButton = ({ text, functionOnClick }) => {
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(brown[600]),
    backgroundColor: brown[300],
    "&:hover": {
      backgroundColor: brown[300],
    },
  }));
  return (
    <ColorButton
      onClick={(e) => functionOnClick(e)}
      variant="contained"
      type="submit">
      {text}
    </ColorButton>
  );
};

export default PrimaryButton;
