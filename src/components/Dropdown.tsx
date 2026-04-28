import { FormControl, InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
interface Option {
  value: string | number;
  label: string;
}
interface DropdownProps {
  label: string;
  value: string | number;
  options: Option[];
  onChange: (event: SelectChangeEvent<string | number|"all">) => void;
  fullWidth?: boolean;
}
const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  options,
  onChange,
  fullWidth = true,
}) => {
  const labelId = `${label.replace(/\s+/g, "-").toLowerCase()}-label`;
  return (
    <FormControl fullWidth={fullWidth} variant="standard">
      <Select
        labelId={labelId}
        id={`${labelId}-select`}
        value={value}
        label={label}
        onChange={onChange}
        sx={{fontFamily:"manrope"}}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value} sx={{fontFamily:"manrope"}}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;