import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { capitalizeFirstLetter } from "../../../utils/text";

interface CategoryFilterProps {
  values: string[];
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ values }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [checked, setChecked] = useState<string[]>(
    searchParams.getAll("category") || []
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (checked.includes(value)) {
      setChecked(checked.filter((v) => v !== value));
    } else {
      setChecked([...checked, value]);
    }
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      
      setSearchParams({
        ...Object.fromEntries(searchParams),
        category: checked,
      });
    }

    return () => {
      mounted = false;
    };
  }, [checked, searchParams, setSearchParams, navigate]);

  return (
    <>
      <FormGroup aria-labelledby="category-group-label">
        {values.map((category) => (
          <FormControlLabel
            key={category}
            value={category}
            checked={checked.includes(category)}
            control={<Checkbox color="secondary" onChange={handleChange} />}
            label={capitalizeFirstLetter(category)}
          />
        ))}
      </FormGroup>
    </>
  );
};

export default CategoryFilter;
