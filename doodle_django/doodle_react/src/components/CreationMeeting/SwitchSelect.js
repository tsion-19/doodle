import { brown } from "@mui/material/colors";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Select, { components } from "react-select";
import { alpha, styled } from "@mui/material/styles";

const PinkSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: brown[300],
    "&:hover": {
      backgroundColor: alpha(brown[200], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: brown[200],
  },
}));

const options = [
  { value: "Zoom", label: "Zoom", icon: "images/zoom.png" },
  { value: "GoogleMeet", label: "Google Meet", icon: "images/meet.png" },
  {
    value: "MicrosoftTeams",
    label: "Microsoft Teams",
    icon: "images/teams.png",
  },
];

const { SingleValue, Option } = components;
const IconOption = (props) => (
  <Option {...props}>
    <img
      src={require("../" + props.data.icon)}
      style={{ width: 16, marginBottom: -2 }}
      alt={props.data.label}
    />
    <nobr
      style={{
        marginLeft: 5,
        marginTop: "auto",
        marginBottom: "auto",
      }}>
      {props.data.label}
    </nobr>
  </Option>
);

const IconSingleValue = (props) => (
  <SingleValue {...props}>
    <img
      src={require("../" + props.data.icon)}
      style={{ width: 16, marginBottom: -2 }}
      alt={props.data.label}
    />
    <nobr style={{ marginLeft: 5, color: "#59483e", fontWeight: "bold" }}>
      {props.data.label}
    </nobr>
  </SingleValue>
);

const SwitchSelect = ({
  checked,
  setChecked,
  setVideo,
  onExpand,
  onContraction,
}) => {
  const handleVideoChange = (selectedOption) => {
    setVideo(selectedOption.value);
  };

  return (
    <div
      className="switch"
      style={{
        paddingLeft: 50,
        paddingRight: 50,
        marginTop: 0,
      }}>
      <FormControlLabel
        control={<PinkSwitch checked={checked} onChange={setChecked} />}
        label={
          <span style={{ fontFamily: "Quicksand, sans-serif" }}>
            Video conferencing
          </span>
        }
      />
      {checked === true && (
        <Select
          style={{ fontFamily: "Quicksand !important" }}
          img
          defaultValue={options[0]}
          options={options}
          onMenuOpen={() => onExpand(0)}
          onMenuClose={() => onContraction(0)}
          onChange={handleVideoChange}
          components={{ SingleValue: IconSingleValue, Option: IconOption }}
        />
      )}
    </div>
  );
};

export default SwitchSelect;
