import { Question } from './question';
import { User } from './user';

export class Answer {
    answerId?: number;
    answer?: string;
    totalUpVotes?: number;
    totalDownVotes?: number;
    creationDate?: Date;
    lastModifiedDate?: Date;
    question?: Question;
    user?: User;
}
