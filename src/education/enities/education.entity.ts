import { CompanyEntity } from "src/company/entities/company.entity";
import { RolesCompanyEntity } from "src/company/roles-company/enities/roles.company.entity";
import { DocumentEntity } from "src/document/enities/document.entity";
import { UsersEntity } from "src/users/enities/users.enities";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'education'})
export class EducationEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    name: string

    @Column({nullable: false})
    description: string

    @Column({nullable: false})
    userId: number
    @ManyToOne(() => UsersEntity, (user) => user.educations)
    user: UsersEntity

    @Column({nullable: false})
    companyId: number
    @ManyToOne(() => CompanyEntity, (company) => company.educations)
    company: CompanyEntity

    @OneToMany(() => DocumentEntity, (document) => document.education)
    documents: DocumentEntity[]

    @Column({nullable: false})
    roleCompanyId: number
    @ManyToOne(() => RolesCompanyEntity, (rolesCompany) => rolesCompany.test)
    @JoinColumn({name: 'roleCompanyId'})
    roleCompany: RolesCompanyEntity
}