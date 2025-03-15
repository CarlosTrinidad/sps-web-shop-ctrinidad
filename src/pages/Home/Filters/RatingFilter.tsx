import { useEffect, useState } from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Rating from "../../../components/Rating/Rating";
import { useSearchParams } from "react-router";

const RatingFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [value, setValue] = useState<string>(searchParams.get("rating") || "");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    let mounted = true;

    if (mounted && value) {
      setSearchParams((searchParams) => {
        searchParams.set("rating", value);
        return searchParams;
      });
    }

    return () => {
      mounted = false;
    };
  }, [value, searchParams, setSearchParams]);

  return (
    <>
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        name="radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        {[5, 4, 3, 2, 1, 0].map((rate) => (
          <FormControlLabel
            key={rate}
            value={rate.toString()}
            control={<Radio color="secondary" />}
            label={<Rating value={rate} />}
          />
        ))}
      </RadioGroup>
    </>
  );
};

export default RatingFilter;
