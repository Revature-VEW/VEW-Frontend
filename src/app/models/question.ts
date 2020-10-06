import { User } from './user';
import { Tag } from './tag';

export class Question {
    questionId?: number;
    question?: string;
    approved?: boolean;
    totalUpvotes?: number;
    totalDownvotes?: number;
    creationDate?: Date;
    lastModifiedDate?: Date;
    user?: User;
    tags?: Tag[];
}
