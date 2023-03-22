import React from "react";
import { Controller } from "react-hook-form";
import { TextField, FormLabel } from "@mui/material";

const InputField = ({
  formlabel,
  name,
  errors,
  helperText,
  control,
  placeholder,
  max,
  type,
  value,
  required,
  rows,
  height,
  fullWidth,
  multiline,
  min,
  lineHeight,
  disabled,
  color,
  size,
  textTransform,
}) => {
  return (
    <>
      <FormLabel
        sx={{
          fontStyle: "normal",
          fontWeight: 400,
          fontSize: size,
          lineHeight: lineHeight,
          color:{color},
        }}
      >
        {formlabel}
        <span style={{color:'red'}}>{required}</span>
      </FormLabel>
      <Controller
        name={name}
        control={control}
        sx={{
          pb: 0,
          // mt: 10,
        }}
        render={({ field }) => (
          <TextField
            {...field}
            disabled={disabled}
            variant="filled"
            InputProps={{ disableUnderline: true,}}
            type={type}
            error={errors}
            helperText={helperText}
            color="primary"
            inputProps={{
              max: max,
              min:min,
              style: { paddingTop: "16px", paddingBottom: "15px",
              height:{height},fontSize:"16px",textTransform:textTransform,
              color:"#A8A8A8",backgroundColor:"#F6F6F6",},
            }}
            value={value}
            placeholder={placeholder}
            rows={rows}
            fullWidth={fullWidth}
            multiline={multiline}
            sx={{
              width: "100%",
              pb: 0,
            }}
          />
        )}
      />
    </>
  );
};

export default InputField;
