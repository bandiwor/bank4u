import React from "react";
import Link from "next/link";
import FormContainer from "@/components/containers/FormContainer";

export default function LoginLayout({children,}: {
    children: React.ReactNode
}) {

    return (
        <FormContainer header={'Логин'} footer={(
            <div>
                <Link href="/register">Регистрация</Link>
            </div>
        )}>
            {children}
        </FormContainer>
    )
}