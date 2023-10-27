import { BaseEntity, Column, PrimaryGeneratedColumn , Entity, ManyToMany, JoinTable, OneToMany, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { SessionEntity } from "src/auth/enities/session.entity";
import { AccountRoleEnum } from "src/common/enums/account-role.enum";
import { IconEntity } from "src/icon/enities/icon.entity";
import { CompanyEntity } from "src/company/entities/company.entity";

@Entity({name: 'users'})
export class UsersEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    firstName: string | null;

    @Column({nullable: true})
    lastName: string | null;

    @Column({nullable: true})
    phoneNumber: string | null;

    @Column({nullable:false})
    email: string

    @Column({nullable: false})
    passwordHash: string;

    @Column({nullable:true}) 
    pushToken: string; 

    @Column({enum: AccountRoleEnum,nullable: false, default: AccountRoleEnum.User})
    role: AccountRoleEnum;

    @OneToMany(() => SessionEntity, (session) => session.user,{onDelete: 'CASCADE'})
    sessions: SessionEntity[]; 

    @Column({nullable: true})
    companyId: number | null;
    @ManyToOne(() => CompanyEntity, (company) => company.users)
    @JoinColumn({name: 'companyId'})
    company: CompanyEntity

    @Column({nullable: true})
    icon: string
}