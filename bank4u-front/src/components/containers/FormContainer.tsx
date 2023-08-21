import cls from "./FormContainer.module.scss";
import {ReactNode} from "react";

type FormContainerProps = {
    header?: ReactNode
    children?: ReactNode
    footer?: ReactNode
}

export default function FormContainer({header, children, footer}: FormContainerProps) {
    return (
        <div className={cls.FormContainer}>
            <div className={cls.form_container}>
                <header className={cls.header}>{header ?? 'Форма'}</header>
                {children}
                {
                    footer && (
                        <footer className={cls.footer}>
                            {footer}
                        </footer>
                    )
                }
            </div>
        </div>
    )
}