import { Button } from "@mui/material";
import React from 'react';

export default function CustomButton(props) {
    const { setOpen } = props;

    const handleClick = () => {
        if (typeof setOpen === 'function') {
            props.guest ? setOpen(true) : setOpen(false);
        }
    };

    return (
        <Button
            className={`${props.className}`}
            variant="contained"
            color={props.color}
            size={props.size}
            onClick={handleClick}
            style={props.style}
            type={props.type}
        >
            {props.text}
        </Button >
    )
}