export type TelegramCallbackMessageType = {
    callback_query: {
        from: {
            id: number,
            first_name: string,
            userName: string
        },
        message: {
            message_id: number,
            chat: {
                id: number,
            }
        },
        data: string,
    }
}