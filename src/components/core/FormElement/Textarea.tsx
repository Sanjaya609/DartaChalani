import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  errors?: string
}

export default function Textarea(props: InputProps) {
  return (
    <textarea className='form-control' {...props}>
    </textarea>
  );
}
