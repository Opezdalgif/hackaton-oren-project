import { CompanyEntity } from "src/company/entities/company.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'test'})
export class TestEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    name: string

    @Column({nullable: false})
    companyId: number
    @ManyToOne(() => CompanyEntity, (company) => company.test)
    @JoinColumn({name: 'companyId'})
    company: CompanyEntity
}