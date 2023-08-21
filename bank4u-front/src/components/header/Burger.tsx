import cls from "./Header.module.scss"

type BurgerProps = {
    clickHandler: () => void;
}

export default function Burger({clickHandler}: BurgerProps) {
    return <div className={cls.burger} onClick={clickHandler}></div>
}