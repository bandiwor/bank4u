import React from "react";
import LoginForm from '@/app/login/form';
import { cookies } from 'next/headers';

export default function Login() {
  const error = cookies().get('formError')?.value;

  return <LoginForm error={error}/>
}