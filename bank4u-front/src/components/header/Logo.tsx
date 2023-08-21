import cls from "./Header.module.scss"
export default function Logo({children}: {children: string}) {
    return (
        <div className={cls.Logo}>{children}</div>
    )
}