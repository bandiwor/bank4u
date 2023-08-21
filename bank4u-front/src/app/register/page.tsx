'use client';
import cls from "@/app/register/Register.module.scss";
import TelephoneInput from "@/components/ui/telephone-input/TelephoneInput";
import React, {FormEventHandler, useState} from "react";
import ky from "ky";
import Input from "@/components/ui/input/Input";
import Button from "@/components/ui/button/Button";
import FormError from "@/components/ui/form-error/FormError";
import {clearTelephone, getAuthFormError} from "@/app/utils";
import { useRouter } from 'next/navigation';


export default function Register() {
    const [telephone, setTelephone] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [formError, setFormError] = useState<string>('');
    const router = useRouter();

    const formSendHandler: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault()

        const formError = getAuthFormError({telephone, username, password, repeatPassword});

        if (formError) {
            setFormError(formError);
            return;
        }
        setFormError('');

        try {
          const res = await ky.post('http://localhost:3000/api/register', {
            body: JSON.stringify({
              telephone: clearTelephone(telephone),
              username: username,
              password: password
            }),
          })

          const body = await res.json<{ok: boolean}>();
          router.replace('/login');

        } catch (error) {
          setFormError('Не удалось')
          console.log(error);
        }
    }

    return (
        <form className={cls.Register} onSubmit={formSendHandler}>
            <TelephoneInput placeholder={'Номер телефона'} value={telephone}
                            changeCallback={(value)=>setTelephone(value)}
            />

            <Input autoComplete={'on'} id={'username'} name={'username'} type="text" placeholder={'Имя пользователя'} value={username} onChange={e=>setUsername(e.target.value)}/>
            <Input autoComplete={'on'} id={'password'} name={'password'} type="password" placeholder={'Пароль'} value={password} onChange={e=> setPassword(e.target.value)} />
            <Input autoComplete={'on'} id={'repeatPassword'} name={'repeatPassword'} type="password" placeholder={'Повторите пароль'} value={repeatPassword} onChange={e=>setRepeatPassword(e.target.value)}/>
            <Button type={"submit"} className={cls.submit_button}>Готово!</Button>
            <FormError error={formError}/>
        </form>
    )
}