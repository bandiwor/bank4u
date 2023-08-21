import React from "react";
import Link from "next/link";
import FormContainer from "@/components/containers/FormContainer";

export default function RegisterLayout({children}:{children: React.ReactNode}) {
    return (
        <FormContainer header={'Регистрация'} footer={(
            <div>
                <Link href="/login">Авторизация</Link>
            </div>
        )}>
            {children}
        </FormContainer>
    )
}