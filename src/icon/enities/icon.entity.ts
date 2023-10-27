import { UsersEntity } from "src/users/enities/users.enities";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'icon'})
export class IconEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    icon: string

}