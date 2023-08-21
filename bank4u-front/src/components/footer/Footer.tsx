import cls from "./Footer.module.scss"
export default function Footer() {
    return (
        <footer className={cls.Footer}>
            <div className={cls.container}>
                Все права банка защищены &copy;
            </div>
        </footer>
    )
}