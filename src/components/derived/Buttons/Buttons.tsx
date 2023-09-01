import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor?: string;
}

export default function Button(props: ButtonProps) {
  return <button {...props}></button>;
}
