import AccordionSummaryMui, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { styled } from "@mui/material/styles";

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <AccordionSummaryMui {...props} expandIcon={<ArrowDropDownIcon />} />
))(() => ({
  padding: 0,
  border: 0,
}));

export default AccordionSummary;
