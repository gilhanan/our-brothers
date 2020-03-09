declare namespace Express {
    export interface Request {
        user?: {
            user_id: string;
            admin: boolean;
            volunteer: boolean;
        };
    }
}