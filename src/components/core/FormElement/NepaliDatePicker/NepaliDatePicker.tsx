import React from 'react'
import { NepaliDatePicker as NepaliPicker } from "datepicker-nepali-reactjs";

interface DateProps {
    id?: string;
    name?: string;
    className?: string;
    placement?: string;
    popperModifiers?: { [key: string]: any };
    wrapperClassName?: string;
    handleChange: (date: string | boolean | undefined) => void;
    handleBlur?: () => void;
    value?: any;
    minDate?: any;
    maxDate?: any;
    minTime?: any;
    maxTime?: any;
    showTimeSelect?: boolean;
    disabled?: boolean;
}
function NepaliDatePicker(props: DateProps) {
    const { handleChange, className, value } = props
    return (
        <div className="form-control-icon rft">
            <NepaliPicker
                defaultDate={value}
                onDateSelect={handleChange}
                className={`w-100 py-1 ${className}`}
            />
            <i className="ic-calendar"></i>

        </div>
    )
}

export default NepaliDatePicker