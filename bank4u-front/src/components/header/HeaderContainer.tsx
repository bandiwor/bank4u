'use client';

import cls from "@/components/header/Header.module.scss";
import Logo from "@/components/header/Logo";
import Links from "@/components/header/Links";
import Burger from "@/components/header/Burger";
import React, {useState} from "react";
import {HeaderLinks} from "@/components/header/types";

type HeaderContainerProps = {
    links: HeaderLinks
}

export default function HeaderContainer({links}: HeaderContainerProps) {
    const [isMobileVisible, setIsMobileVisible] = useState(false);

    const hideMenu = () => {
      setIsMobileVisible(false)
    }

    const showMenu = () => {
        setIsMobileVisible(true)
    }

    return (
        <div className={cls.container}>
            <Logo>4u</Logo>
            <Links links={links} isVisible={isMobileVisible} clickHandler={hideMenu}/>
            <Burger clickHandler={showMenu}/>
        </div>
    )
}