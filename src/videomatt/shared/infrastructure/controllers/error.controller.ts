import { NextFunction, Request, Response } from 'express';
import { injectable } from 'tsyringe';

@injectable()
export class ErrorController {
    async execute(err: Error, req: Request, res: Response, next: NextFunction) {
        console.error(err.stack);

        res.status(500).json({
            message: 'Internal server error',
            error: err.message,
        });
    }
}
