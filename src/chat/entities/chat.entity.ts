
import { UsersEntity } from "src/users/enities/users.enities";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany, ManyToMany } from "typeorm";
import { ChatMessageEntity } from "./chat-message.entity";


@Entity({name: 'chat'})
export class ChatEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: false})
    senderId: number
    @ManyToOne(() => UsersEntity, (user) => user.id, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'senderId'})
    sender: UsersEntity

    @Column({nullable: true})
    lastMessageId: number
    @OneToOne(() => ChatMessageEntity, (chatMessage) => chatMessage.id, {onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true})
    @JoinColumn({name: 'lastMessageId'})
    lastMessage: ChatMessageEntity

  

    @Column({unique: false})
    memberId: number
    @ManyToOne(() => UsersEntity, (user) => user.id, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'memberId'})
    member: UsersEntity

    @Column({ default: false })
    isClosed: boolean;
}