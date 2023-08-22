'use client';

import React, { FormEventHandler, startTransition, useState, useTransition } from 'react';
import cls from '@/app/register/Register.module.scss';
import RegisterUserAction from '@/actions/registerAction';
import TelephoneInput from '@/components/ui/telephone-input/TelephoneInput';
import Input from '@/components/ui/input/Input';
import Button from '@/components/ui/button/Button';
import FormError from '@/components/ui/form-error/FormError';

export default function RegisterForm({error}: {error?: string}) {
  const [telephone, setTelephone] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  const formSubmitHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    if (!(telephone && username && password && repeatPassword)) {
      setFormError('Заполните все поля формы')
      event.preventDefault()
      return
    }

    if (password !== repeatPassword) {
      setFormError('Пароли не совпадают')
      event.preventDefault()
      return
    }

    setFormError('');
  }

  return (
    <form className={cls.Register} onSubmit={formSubmitHandler} action={RegisterUserAction}>
      <TelephoneInput placeholder={'Номер телефона'} value={telephone}
                      changeCallback={(value)=>setTelephone(value)}
      />

      <Input autoComplete={'on'} id={'username'} name={'username'} type="text" placeholder={'Имя пользователя'} value={username} onChange={e=>setUsername(e.target.value)}/>
      <Input autoComplete={'on'} id={'password'} name={'password'} type="password" placeholder={'Пароль'} value={password} onChange={e=> setPassword(e.target.value)} />
      <Input autoComplete={'on'} id={'repeatPassword'} name={'repeatPassword'} type="password" placeholder={'Повторите пароль'} value={repeatPassword} onChange={e=>setRepeatPassword(e.target.value)}/>
      <Button type={"submit"} className={cls.submit_button}>Готово!</Button>
      <FormError error={error || formError}/>
    </form>
  )
}