import { NotificationStatusEnum } from "src/common/enums/notification-status.enum";
import { UsersEntity } from "src/users/enities/users.enities";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'notification'})
export class NotificationEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false, enum: NotificationStatusEnum})
    type: NotificationStatusEnum

    @CreateDateColumn()
    createdAt: Date

    @Column({nullable: false})
    userId: number
    @OneToMany(() => UsersEntity, user => user.id, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'userId'})
    user: UsersEntity

    @Column({nullable: false})
    senderId: number
    @ManyToOne(() => UsersEntity, user => user.id, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'senderId'})
    sender: UsersEntity
}