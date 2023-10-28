import { EducationEntity } from "src/education/enities/education.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'document'})
export class DocumentEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false}) 
    name: string

    @Column({nullable: false})
    url: string

    @Column({nullable: false})
    educationId: number
    @ManyToOne(() => EducationEntity, (education) => education.documents)
    education: EducationEntity
}