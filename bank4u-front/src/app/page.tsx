import cls from "./page.module.scss"
import React from "react";
import Link from "next/link";

export default function page() {
    return (
        <div className={cls.Page}>
            <article className={cls.card}>
                <header className={cls.header}>4u Банк | Начните прямо сейчас!</header>
                <aside className={cls.content}>
                    <div className={cls.text}>
                        <h1>Это что-то новенькое</h1>
                        <p>Абсолютно бесплатная регистрация.</p>
                        <p>Современный онлайн-банк.</p>
                        <p>Регистрация абсолютно свободная по номеру телефона.</p>
                    </div>
                    <figure className={cls.image}>
                        <img src="./welcome-page-image.png" alt="Welcome"/>
                    </figure>
                </aside>
                <footer className={cls.footer}>
                    <Link href={'/register'} className={cls.get_started}>Давайте, зарегистрироваться!</Link>
                </footer>
            </article>
        </div>
    )
}