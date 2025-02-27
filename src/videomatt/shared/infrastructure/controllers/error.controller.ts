import { HttpResponse } from '@videomatt/shared/infrastructure/controllers/http-response';
import { NextFunction, Request, Response } from 'express';
import { injectable } from 'tsyringe';

@injectable()
export class ErrorController {
    async execute(err: Error, req: Request, res: Response, next: NextFunction) {
        console.error(err.stack);
        return HttpResponse.internalServerError(res);
    }
}
