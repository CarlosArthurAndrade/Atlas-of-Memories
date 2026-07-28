import { RowDataPacket } from "mysql2"

export default interface Note extends RowDataPacket {
    id?: number
    title: string
    messageText: string,
    color: string,
    authorId: number
    writingDate: string
}

