export type UserAuthRequestBody = {
    telephone?: string
    username?: string
    password?: string
}

export type UserRefreshRequestBody = {
    refreshToken: string
}

export type UserRegisterRequestBody = UserAuthRequestBody
export type UserLoginRequestBody = Omit<UserAuthRequestBody, 'username'>
