import { CompanyEntity } from "src/company/entities/company.entity";
import { EducationEntity } from "src/education/enities/education.entity";
import { TestEntity } from "src/test/enities/test.entity";
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

    @OneToMany(() => TestEntity, (test) => test.roleCompany, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    test: TestEntity[]

    @OneToMany(() => EducationEntity, (education) => education.roleCompany, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    education: EducationEntity[]
}