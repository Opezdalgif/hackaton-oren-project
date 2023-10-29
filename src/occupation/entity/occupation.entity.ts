import { CompanyEntity } from "src/company/entities/company.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "occupation"})
export class OccupationEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    name: string

    @ManyToMany(() => CompanyEntity, (company) => company.occupation)
    @JoinTable({
        name: 'сompany_occupations',
        joinColumn: {
            name: 'companyId', 
            referencedColumnName: 'id', 
        },
        inverseJoinColumn: {
            name: 'occupationId', 
            referencedColumnName: 'id', 
        },
    })
    company: CompanyEntity[]
}