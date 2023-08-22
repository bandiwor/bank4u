import RegisterForm from '@/app/register/form';
import { cookies } from 'next/headers';

export default function Register() {
  const error = cookies().get('formError')?.value;
  return <RegisterForm error={error}/>
}