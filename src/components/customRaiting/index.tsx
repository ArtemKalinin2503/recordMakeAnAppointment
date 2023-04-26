import React, { useState } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import { rating } from "./consts";
import { RatingProps } from "./types";
import {
  StyledButtom,
  StyledMain,
  StyledRadioButton,
  StyledRadioButtonWrapper,
  StyledRadioItem,
  StyledSpan,
  StyledTitle,
  StyledWrapperRating,
} from "./customRating.styled";

const CustomRating = () => {
  const [value, setValue] = useState<string | number>('5');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleSubmit = () => {
    console.log("value rating: ", value);
  };

  return (
    <StyledMain>
      <FormControl>
        <StyledTitle>
          Насколько Вы довольны качеством обслуживания ?
        </StyledTitle>
        <RadioGroup value={value} onChange={handleChange}>
          <StyledRadioButtonWrapper>
            {rating?.map((item: RatingProps) => (
              <StyledRadioButton
                value={item.value}
                control={<StyledRadioItem onChange={() => setValue(item.value)} />}
                label={item.label}
              />
            ))}
          </StyledRadioButtonWrapper>
        </RadioGroup>
      </FormControl>
      <StyledWrapperRating>
        <StyledSpan onClick={() => setValue("1")}>
          {value === "1" ? (
            <SentimentVeryDissatisfiedIcon
              color="error"
              style={{ width: "80px", height: "80px" }}
            />
          ) : (
            <SentimentVeryDissatisfiedIcon
              color="disabled"
              style={{ width: "80px", height: "80px" }}
            />
          )}
        </StyledSpan>
        <StyledSpan onClick={() => setValue("2")}>
          {value === "2" ? (
            <SentimentDissatisfiedIcon
              color="warning"
              style={{ width: "80px", height: "80px" }}
            />
          ) : (
            <SentimentDissatisfiedIcon
              color="disabled"
              style={{ width: "80px", height: "80px" }}
            />
          )}
        </StyledSpan>
        <StyledSpan onClick={() => setValue("3")}>
          {value === "3" ? (
            <SentimentSatisfiedIcon
              color="warning"
              style={{ width: "80px", height: "80px" }}
            />
          ) : (
            <SentimentSatisfiedIcon
              color="disabled"
              style={{ width: "80px", height: "80px" }}
            />
          )}
        </StyledSpan>
        <StyledSpan onClick={() => setValue("4")}>
          {value === "4" ? (
            <SentimentSatisfiedAltIcon
              color="success"
              style={{ width: "80px", height: "80px" }}
            />
          ) : (
            <SentimentSatisfiedAltIcon
              color="disabled"
              style={{ width: "80px", height: "80px" }}
            />
          )}
        </StyledSpan>
        <StyledSpan onClick={() => setValue("5")}>
          {value === "5" ? (
            <SentimentVerySatisfiedIcon
              color="success"
              style={{ width: "80px", height: "80px" }}
            />
          ) : (
            <SentimentVerySatisfiedIcon
              color="disabled"
              style={{ width: "80px", height: "80px" }}
            />
          )}
        </StyledSpan>
      </StyledWrapperRating>
      <StyledButtom onClick={handleSubmit}>Отправить</StyledButtom>
    </StyledMain>
  );
};

export default CustomRating;
