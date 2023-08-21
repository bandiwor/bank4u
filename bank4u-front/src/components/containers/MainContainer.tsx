import cls from "./MainContainer.module.scss"
import React from "react";
export default function MainContainer({children}: {children: React.ReactNode}) {
    return (
        <main className={cls.MainContainer}>
            <div className={cls.container}>
                {children}
            </div>
        </main>
    )
}