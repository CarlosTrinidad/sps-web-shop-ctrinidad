import AccordionMui, { AccordionProps } from "@mui/material/Accordion";

const Accordion = (props: AccordionProps) => (
  <AccordionMui elevation={0} {...props} />
);

export default Accordion;
