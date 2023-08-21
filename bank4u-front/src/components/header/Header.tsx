import {HeaderLinks} from "@/components/header/types";
import cls from "./Header.module.scss";
import React from "react";
import HeaderContainer from "@/components/header/HeaderContainer";

type HeaderProps = {
    links: HeaderLinks
}

export default async function Header({links}: HeaderProps) {
    return (
        <header className={cls.Header}>
            <HeaderContainer links={links}/>
        </header>
    )
}