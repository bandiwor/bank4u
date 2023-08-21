'use client';
import TelephoneInput from "@/components/ui/telephone-input/TelephoneInput";
import React, {FormEventHandler, useState} from "react";
import Button from "@/components/ui/button/Button";
import cls from "./Login.module.scss";
import FormError from "@/components/ui/form-error/FormError";
import Input from "@/components/ui/input/Input";
import {clearTelephone, getAuthFormError} from "@/app/utils";
import ky from "ky";

export default function Login() {
    const [telephone, setTelephone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [formError, setFormError] = useState<string>('');

    const formSendHandler: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault()

        const formError = getAuthFormError({telephone, password});

        if (formError) {
            setFormError(formError);
            return;
        }
        setFormError('');

        try {
          const request = await ky.post('http://localhost:3000/api/login', {
            body: JSON.stringify({
              telephone: clearTelephone(telephone),
              password: password
            })
          })

          const body = await request.json<{access_token: string, refresh_token: string}>()


        } catch (error) {
          setFormError('Войти не удалось')
        }
    }

    return (
        <form className={cls.Login} onSubmit={formSendHandler}>
            <TelephoneInput placeholder={'Номер телефона'} value={telephone}
                            changeCallback={(value)=>setTelephone(value)}
            />
            <Input
                autoComplete={'on'} id={'password'} name={'password'} type="password" placeholder={'Пароль'}
                value={password} onChange={e=> setPassword(e.target.value)}
            />
            <Button type={"submit"} className={cls.submit_button}>Готово!</Button>
            <FormError error={formError}/>
        </form>
    )
}