export interface IMailOptions  {
    from: string,
    to: string,
    subject: string,
    text: string
}

export enum Role {
    ADMIN = 'admin',
    USER = 'user'
}
