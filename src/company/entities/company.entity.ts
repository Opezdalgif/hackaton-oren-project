import { OccupationEntity } from "src/occupation/entity/occupation.entity";
import { TestEntity } from "src/test/enities/test.entity";
import { UsersEntity } from "src/users/enities/users.enities";
import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolesCompanyEntity } from "../roles-company/enities/roles.company.entity";

@Entity({name: "company"})
export class CompanyEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    name: string

    @Column({nullable: true})
    icon: string | null

    @ManyToMany(() => OccupationEntity, (occupation) => occupation.company)
    occupation: OccupationEntity[]

    @OneToMany(() => TestEntity, (test) => test.company)
    test: TestEntity[]

    @OneToMany(() => UsersEntity, (users) => users.company)
    users: UsersEntity[]
    
    @OneToMany(() => RolesCompanyEntity, (rolesCompany) => rolesCompany.company)
    rolesCompany: RolesCompanyEntity[]
}