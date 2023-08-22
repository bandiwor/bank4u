'use server';

import { clearTelephone } from '@/app/utils';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type FormDataType = {
  telephone: string
  username: string
  password: string
}

export default async function RegisterUserAction(formData: FormData) {
  let data: FormDataType = {
    telephone: clearTelephone(String(formData.get('telephone') ?? '')),
    username: String(formData.get('username') ?? ''),
    password: String(formData.get('password') ?? ''),
  };

  try {
    const response = await fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const apiData = await response.json();

    if (!response.ok) {
      cookies().set({
        name: 'formError',
        value: apiData.message,
        domain: '/register',
        httpOnly: true,
        expires: Date.now() + 10_000, // 10 секунд
      });

      return {success: false}
    }

  } catch (error) {
    console.error('Ошибка при обращении к API:', error);
  }

  redirect('/login')
}