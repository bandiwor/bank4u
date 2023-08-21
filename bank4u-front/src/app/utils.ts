export const formatTelephone = (telephone: string) => {
    let rawNumbers = telephone
        .replaceAll(' ', '')
        .replaceAll('-', '')
        .replaceAll('(', '')
        .replaceAll(')', '')

    if (rawNumbers.startsWith('8')) {
        rawNumbers = rawNumbers.replace('8', '+7')
    }

    if (rawNumbers.length === 12) {
        rawNumbers = '+' + rawNumbers[1] + ' (' + rawNumbers.slice(2, 5) + ') ' +
            rawNumbers.slice(5, 8) + ' - ' + rawNumbers.slice(8, 10) + ' - ' + rawNumbers.slice(10, 12)
    }

    return rawNumbers;
}

export const clearTelephone = (telephone: string): string => {
    return telephone
        .replaceAll('-', '')
        .replaceAll('+', '')
        .replaceAll(' ', '')
        .replaceAll('(', '')
        .replaceAll(')', '')
}

export const getAuthFormError = ({telephone, username, password, repeatPassword}:{
    telephone: string
    username?: string
    password: string
    repeatPassword?: string
}): string => {
    if (!(telephone && (username ?? 'default') && password && (repeatPassword ?? 'default'))) {
        return 'Заполните все поля.';
    }

    if ((repeatPassword ?? password) != password) {
        return 'Пароли не совпадают';
    }

    if (clearTelephone(telephone).length !== 11) {
        return 'Невалидный номер телефона';
    }

    return '';
}