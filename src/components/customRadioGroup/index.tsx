import React, { useState } from "react";
import { useFormikContext } from "formik";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { CustomRadioGroupProps, RadioItem } from "./types";

const CustomRadioGroup = ({
  label,
  name,
  isError,
  listItems,
}: CustomRadioGroupProps) => {
  const { setFieldValue } = useFormikContext();

  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    // специальный hook из formik который передаст данные в values в форме
    setFieldValue(name, event.target.value);
  };

  return (
    <FormControl>
      <FormLabel id={name}>{label}</FormLabel>
      <RadioGroup
        aria-labelledby={name}
        name={name}
        value={value}
        onChange={handleChange}
      >
        {listItems.map((item: RadioItem) => (
          <React.Fragment key={item.id}>
            <FormControlLabel
              value={item.name}
              control={
                <Radio
                  sx={{
                    color: "#7314d9",
                    "&.Mui-checked": {
                      color: "#7314d9",
                    },
                  }}
                />
              }
              label={item.name}
            />
          </React.Fragment>
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default CustomRadioGroup;
