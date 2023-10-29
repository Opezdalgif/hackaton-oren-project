import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AnswerEntity } from "../answer/enities/answer.entity";
import { TestEntity } from "src/test/enities/test.entity";
import { TestResultUserEntity } from "src/test/enities/test-result-user.entity";

@Entity({name: 'questions'})
export class QuestionsEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    question: string

    @OneToMany(() => AnswerEntity, (answer) => answer.question, {onDelete:'CASCADE', onUpdate:'CASCADE'})
    answer: AnswerEntity[]

    @Column({nullable: true})
    testId: number | null
    @ManyToOne(() => TestEntity, (test) => test.questions,{onDelete:'CASCADE', onUpdate:'CASCADE'})
    @JoinColumn({name: 'testId'})
    test: TestEntity

    @Column({nullable: true})
    testResultUserId: number | null
    @ManyToOne(() => TestResultUserEntity, (testResultUser) => testResultUser.questions)
    testResultUser: TestResultUserEntity
}