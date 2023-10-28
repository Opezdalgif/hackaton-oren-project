import { CompanyEntity } from "src/company/entities/company.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'roles-company'})
export class RolesCompanyEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    nameRole: string
    
    @Column({nullable: false})
    companyId: number
    @ManyToOne(() => CompanyEntity, (company) => company.rolesCompany)
    @JoinColumn({name: 'companyId'})
    company: CompanyEntity
}