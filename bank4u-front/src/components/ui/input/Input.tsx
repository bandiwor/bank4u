import cls from "./Input.module.scss";
import {InputHTMLAttributes} from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>

export default function Input({className, ...props}: InputProps) {
    return <input
        className={`${className ?? ''} ${cls.Input}`}
        {...props}
    />
}