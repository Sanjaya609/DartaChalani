import { LabelHTMLAttributes } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  errors?: string
}

export default function Label(props: LabelProps) {
  return (
    <label {...props}>
    </label>
  );
}
