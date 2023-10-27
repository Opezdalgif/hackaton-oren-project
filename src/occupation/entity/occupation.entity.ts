import { CompanyEntity } from "src/company/entities/company.entity";
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "occupation"})
export class OccupationEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    name: string

    @ManyToMany(() => CompanyEntity, (company) => company.occupation)
    company: CompanyEntity[]
}