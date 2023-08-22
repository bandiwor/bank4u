'use server';

import { clearTelephone } from '@/app/utils';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type FormDataType = {
  telephone: string
  password: string
}

export default async function LoginUserAction(formData: FormDataType) {
  let data: FormDataType = {
    telephone: clearTelephone(String(formData.telephone ?? '')),
    password: String(formData.password ?? ''),
  };

  try {
    const response = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const apiData = await response.json();
    if (response.ok) {
      return apiData;

    } else {
      cookies().set({
        name: 'formError',
        value: apiData.message,
        domain: '/login',
        httpOnly: true,
        expires: Date.now() + 10_000, // 10 секунд
      });
    }

  } catch (error) {
    console.error('Ошибка при обращении к API:', error);
  }

  redirect('/')
}
