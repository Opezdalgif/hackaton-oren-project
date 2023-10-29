import { CompanyEntity } from "src/company/entities/company.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { QuestionsEntity } from "../questions/entites/questions.entity";
import { TestResultUserEntity } from "./test-result-user.entity";
import { RolesCompanyEntity } from "src/company/roles-company/enities/roles.company.entity";

@Entity({name: 'test'})
export class TestEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    name: string
    
    @Column({nullable: false})
    created_at: Date;

    @Column({nullable: false})
    companyId: number
    @ManyToOne(() => CompanyEntity, (company) => company.test)
    @JoinColumn({name: 'companyId'})
    company: CompanyEntity

    @OneToMany( () => QuestionsEntity, (questions) => questions.test, {onDelete:'CASCADE', onUpdate:'CASCADE'})
    questions: QuestionsEntity[]

    @OneToMany(() => TestResultUserEntity, (testResultUser) => testResultUser.test)
    testResultUser: TestResultUserEntity[]

    @Column({nullable: false})
    roleCompanyId: number
    @ManyToOne(() => RolesCompanyEntity, (rolesCompany) => rolesCompany.test)
    @JoinColumn({name: 'roleCompanyId'})
    roleCompany: RolesCompanyEntity
}