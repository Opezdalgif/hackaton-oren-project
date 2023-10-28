import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AnswerEntity } from "../answer/enities/answer.entity";
import { TestEntity } from "src/test/enities/test.entity";

@Entity({name: 'questions'})
export class QuestionsEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    question: string

    @OneToMany(() => AnswerEntity, (answer) => answer.question)
    answer: AnswerEntity[]

    @Column({nullable: false})
    testId: number
    @ManyToOne(() => TestEntity, (test) => test.questions)
    @JoinColumn({name: 'testId'})
    test: TestEntity
}