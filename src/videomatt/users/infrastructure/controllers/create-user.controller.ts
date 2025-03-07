import { InMemoryCommandEventBus } from '@videomatt/shared/infrastructure/event-bus/in-memory-command-event-bus';
import { UserAlreadyExistsError } from '@videomatt/users/domain/errors/user-already-exists.error';
import { HttpResponse } from '@videomatt/shared/infrastructure/controllers/http-response';
import { CreateUserDTO } from '@videomatt/users/domain/dtos/create-user.dto';
import { TOKEN } from '@videomatt/shared/infrastructure/di/tokens';
import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { match } from 'fp-ts/lib/Either';

@injectable()
export class CreateUserController {
    constructor(
        @inject(TOKEN.COMMAND_EVENT_BUS)
        private readonly eventBus: InMemoryCommandEventBus
    ) {}

    async execute(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const { firstName, lastName } = req.body;

            const event = CreateUserDTO.create({ id: userId, firstName, lastName });

            const result = await this.eventBus.publish(event);

            match(
                (error: UserAlreadyExistsError) => {
                    return HttpResponse.domainError(res, error, 400);
                },
                () => {
                    return res.status(201).send({ userId });
                }
            )(result);
        } catch (error) {
            return HttpResponse.internalServerError(res);
        }
    }
}
