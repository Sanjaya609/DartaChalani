import React from 'react';
import {
  Accordion as RAccordion,
  AccordionItem as RAccordionItem,
  AccordionHeader as RAccordionHeader,
  AccordionProps,
  AccordionItemProps,
  AccordionHeaderProps
} from 'reactstrap';

interface AccordionProperties extends AccordionProps {
  children?: React.ReactNode;
}

interface AccordionItemProperties extends AccordionItemProps {
  children?: React.ReactNode;
}
interface AccordionHeaderProperties extends AccordionHeaderProps {
  children?: React.ReactNode;
}

export default function Accordion(props: AccordionProperties) {
  return <RAccordion {...props} />;
}

function AccordionHeader(props: AccordionHeaderProperties) {
  return <RAccordionHeader {...props} />;
}
function AccordionItem(props: AccordionItemProperties) {
  return <RAccordionItem {...props} />;
}

export { Accordion, AccordionHeader, AccordionItem };
