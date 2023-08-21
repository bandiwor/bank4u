import cls from "./FormError.module.scss"

type FormErrorProps = {
    error?: string
}

export default function FormError({error}: FormErrorProps) {
    if (!error) {
        return null;
    }

    return <div className={cls.FormError}>
        {error}
    </div>
}