export type TelegramMessageType = {
    message: {
        from: {
            id: number,
            first_name: string,
            userName: string
        },
        chat: {
            id: number,
        }
        text: string,
    }
}
