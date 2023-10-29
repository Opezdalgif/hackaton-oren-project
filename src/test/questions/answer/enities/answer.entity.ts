import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { QuestionsEntity } from "../../entites/questions.entity";

@Entity({name: "answer-question"})
export class AnswerEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    text: string

    @Column({nullable: false})
    isCorrect: boolean

    @Column({nullable: false})
    questionId: number
    @ManyToOne(() => QuestionsEntity, (question) => question.answer,{onDelete:'CASCADE', onUpdate:'CASCADE'})
    @JoinColumn({name: 'questionId'})
    question: QuestionsEntity
}