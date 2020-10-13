import { Question } from '../models/question';

/** return fresh array fo test questions */
export function getTestQuestions(): Question[] {
    const date = new Date('December 17, 1995 03:24:00');
    return [
        {
            questionId: 1,
            question: 'What is Java?',
            approved: true,
            totalUpvotes: 2,
            totalDownvotes: 3,
            creationDate: date,
            lastModifiedDate: date,
            user: {
                userId: 5,
                email: null,
                password: null,
                firstName: 'Test',
                lastName: 'One',
                role: null
            }
        },
        {
            questionId: 2,
            question: 'Where is Dakota?',
            approved: true,
            totalUpvotes: 10,
            totalDownvotes: 3,
            creationDate: date,
            lastModifiedDate: date,
            user: {
                userId: 5,
                email: null,
                password: null,
                firstName: 'Test',
                lastName: 'One',
                role: null
            }
        },
        {
            questionId: 3,
            question: 'Who is Dakota?',
            approved: true,
            totalUpvotes: 12,
            totalDownvotes: 1,
            creationDate: date,
            lastModifiedDate: date,
            user: {
                userId: 5,
                email: null,
                password: null,
                firstName: 'Test',
                lastName: 'One',
                role: null
            }
        },
        {
            questionId: 13,
            question: 'Why is Dakota?',
            approved: true,
            totalUpvotes: 25,
            totalDownvotes: 0,
            creationDate: date,
            lastModifiedDate: date,
            user: {
                userId: 5,
                email: null,
                password: null,
                firstName: 'Test',
                lastName: 'One',
                role: null
            }
        },
    ];
}
