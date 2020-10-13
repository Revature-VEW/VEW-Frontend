import { Answer } from '../models/answer';

/** return fresh array of test answers */
export function getTestAnswers(): Answer[] {
    const date = new Date('December 17, 1995 03:24:00');
    return [
        {
            creationDate: date,
            lastModifiedDate: date,
            answerId: 1,
            question: {
                creationDate: null,
                lastModifiedDate: null,
                questionId: 13,
                user: null,
                question: null,
                approved: false,
                totalUpvotes: 0,
                totalDownvotes: 0,
                tags: []
            },
            answer: 'Dakota knows',
            user: {
                userId: 5,
                email: null,
                password: null,
                firstName: 'Test',
                lastName: 'One',
                role: null
            },
            totalUpVotes: 0,
            totalDownVotes: 0
        },
        {
            creationDate: date,
            lastModifiedDate: date,
            answerId: 2,
            question: {
                creationDate: null,
                lastModifiedDate: null,
                questionId: 13,
                user: null,
                question: null,
                approved: false,
                totalUpvotes: 0,
                totalDownvotes: 0,
                tags: []
            },
            answer: 'Yes.',
            user: {
                userId: 5,
                email: null,
                password: null,
                firstName: 'Test',
                lastName: 'One',
                role: null
            },
            totalUpVotes: 0,
            totalDownVotes: 0
        },
        {
            creationDate: date,
            lastModifiedDate: date,
            answerId: 3,
            question: {
                creationDate: null,
                lastModifiedDate: null,
                questionId: 13,
                user: null,
                question: null,
                approved: false,
                totalUpvotes: 0,
                totalDownvotes: 0,
                tags: []
            },
            answer: 'No.',
            user: {
                userId: 5,
                email: null,
                password: null,
                firstName: 'Test',
                lastName: 'One',
                role: null
            },
            totalUpVotes: 0,
            totalDownVotes: 0
        },
        {
            creationDate: date,
            lastModifiedDate: date,
            answerId: 4,
            question: {
                creationDate: null,
                lastModifiedDate: null,
                questionId: 13,
                user: null,
                question: null,
                approved: false,
                totalUpvotes: 0,
                totalDownvotes: 0,
                tags: []
            },
            answer: 'It still works.',
            user: {
                userId: 5,
                email: null,
                password: null,
                firstName: 'Test',
                lastName: 'One',
                role: null
            },
            totalUpVotes: 0,
            totalDownVotes: 0
        },
        {
            creationDate: date,
            lastModifiedDate: date,
            answerId: 5,
            question: {
                creationDate: null,
                lastModifiedDate: null,
                questionId: 13,
                user: null,
                question: null,
                approved: false,
                totalUpvotes: 0,
                totalDownvotes: 0,
                tags: []
            },
            answer: 'Answer from deployed website.',
            user: {
                userId: 5,
                email: null,
                password: null,
                firstName: 'Test',
                lastName: 'One',
                role: null
            },
            totalUpVotes: 0,
            totalDownVotes: 0
        }
    ];
}
