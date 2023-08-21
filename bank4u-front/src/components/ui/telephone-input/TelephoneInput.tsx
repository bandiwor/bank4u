import cls from "@/app/register/Register.module.scss";
import {ChangeEventHandler} from "react";
import {formatTelephone} from "@/app/utils";
import Input from "@/components/ui/input/Input";

type TelephoneInputProps = {
    placeholder?: string
    value: string
    changeCallback: (value: string) => void
}

export default function TelephoneInput({placeholder, value, changeCallback}: TelephoneInputProps) {
    const changeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
        changeCallback(formatTelephone(event.target.value))
    }

    return (
        <Input
            autoComplete={'on'}
            type="tel"
            name={'telephone'}
            className={cls.input}
            placeholder={placeholder}
            value={value}
            onChange={changeHandler}
            id={'telephone'}
        />
    )
}