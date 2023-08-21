import cls from "./Header.module.scss"
import {HeaderLink, HeaderLinks} from "@/components/header/types";
import Link from "next/link";
import React from "react";

type LinksProps = {
    links: HeaderLinks
    isVisible: boolean
    clickHandler: () => void
}

type LinkProps = HeaderLink;

function HeaderLink({label, href}: Omit<LinkProps, 'id'>) {
    return (
        <Link href={href ?? '#'} className={cls.link}>{label}</Link>
    )
}

export default function Links({links, isVisible, clickHandler}: LinksProps) {
    return (
        <nav className={`${cls.links} ${isVisible ? cls.visible : ''}`} onClick={clickHandler}>
            {
                links.map(({id, label, href}) =>
                    <HeaderLink key={id} label={label} href={href} />
                )
            }
        </nav>
    )
}