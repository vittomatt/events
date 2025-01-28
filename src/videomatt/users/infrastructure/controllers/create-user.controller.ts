import { CreateUserUseCase } from '@videomatt/users/application/create-user.user-case';
import { TOKEN } from '@videomatt/shared/infrastructure/di/tokens';
import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';

@injectable()
export class CreateUserController {
    constructor(@inject(TOKEN.USER.CREATE_USER_USE_CASE) private useCase: CreateUserUseCase) {}

    async execute(req: Request, res: Response) {
        const { id } = req.params;
        const { firstName, lastName } = req.body;
        await this.useCase.execute(id, firstName, lastName);
        res.status(201).send(`User created: ${id}`);
    }
}
