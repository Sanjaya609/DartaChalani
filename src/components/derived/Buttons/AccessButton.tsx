import React, { ButtonHTMLAttributes } from 'react';
import { useAccess } from '../../../providers/AccessProvider';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    bgColor?: string;
}

export default function AccessButton(props: ButtonProps) {
    const { checkCreateAccess } = useAccess()
    return checkCreateAccess() ? <button {...props}></button>:<></>;
}
