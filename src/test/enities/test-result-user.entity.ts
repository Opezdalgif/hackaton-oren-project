import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TestEntity } from "./test.entity";
import { QuestionsEntity } from "../questions/entites/questions.entity";
import { UsersEntity } from "src/users/enities/users.enities";

@Entity({name: 'test-result-user'})
export class TestResultUserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    created_at: Date

    @Column({nullable: false})
    testId: number
    @ManyToOne(() => TestEntity, (test) => test.testResultUser)
    @JoinColumn({name: 'testId'})
    test: TestEntity

    @OneToMany( () => QuestionsEntity, (questions) => questions.testResultUser)
    questions: QuestionsEntity[]

    @Column({nullable: false})
    userId: number
    @ManyToOne(() => UsersEntity, (user) => user.testsResultUser)
    @JoinColumn({name: 'userId'})
    user: UsersEntity[]

}