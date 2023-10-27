import { ChatMessageStatusEnum } from "src/common/enums/chat-message-status.enum";
import { ChatMessageTypeEnum } from "src/common/enums/chat-messate-type.enum";
import { UsersEntity } from "src/users/enities/users.enities";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { ChatEntity } from "./chat.entity";


@Entity({name: 'chat-message'})
export class ChatMessageEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string

    @CreateDateColumn()
    createdAt: Date

    @Column({default: false})
    isRead: boolean

    @Column({enum: ChatMessageTypeEnum, default: ChatMessageTypeEnum.user})
    type: ChatMessageTypeEnum

    @Column()
    senderId: number
    @OneToMany(() => UsersEntity, (user) => user.id, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'senderId'})
    sender: UsersEntity[]

    @Column()
    chatId: number
    @ManyToOne(() => ChatEntity, (chat) => chat.id, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'chatId'})
    chat: ChatEntity
}