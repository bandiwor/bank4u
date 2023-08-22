'use client';
import React, { FormEventHandler, useState, useTransition } from 'react';
import cls from '@/app/login/Login.module.scss';
import TelephoneInput from '@/components/ui/telephone-input/TelephoneInput';
import Input from '@/components/ui/input/Input';
import Button from '@/components/ui/button/Button';
import FormError from '@/components/ui/form-error/FormError';
import ky from 'ky';
import cookie from '@/utils/cookie';
import { accessTokenCookieName, refreshTokenCookieName } from '@/constants/auth';
import storage from '@/utils/storage';
import { useRouter } from 'next/navigation';
import { clearTelephone } from '@/app/utils';

export default function LoginForm({error}: {error?: string}) {
  const [telephone, setTelephone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const router = useRouter()

  const formSendHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (!(telephone && password)) {
      setFormError('Заполните все поля формы.');
      return;
    }

    try {
      const response = await ky.post('http://localhost:3000/api/login', {
        body: JSON.stringify({
          telephone: clearTelephone(telephone),
          password
        })
      });
      const { access_token, refresh_token } = await response.json<{
        access_token?: string
        refresh_token?: string
      }>();

      if (!(access_token && refresh_token)) {
        setFormError('Не удалось получить токены доступа.')
        return;
      }

      cookie().set(accessTokenCookieName, access_token);
      storage().set<string>(refreshTokenCookieName, refresh_token);
      router.push('/');

    } catch (e) {
      setFormError('Не удалось авторизоваться.')
      console.error(e);
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
      <FormError error={formError || error}/>
    </form>
  )
}