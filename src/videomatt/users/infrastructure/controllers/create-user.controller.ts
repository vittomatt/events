import { CommandEventBus } from '@videomatt/shared/domain/event-bus/command-even-bus';
import { CreateUserDTO } from '@videomatt/users/domain/dtos/create-user.dto';
import { TOKEN } from '@videomatt/shared/infrastructure/di/tokens';
import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';

@injectable()
export class CreateUserController {
    constructor(@inject(TOKEN.COMMAND_EVENT_BUS) private eventBus: CommandEventBus) {}

    async execute(req: Request, res: Response) {
        const { userId } = req.params;
        const { firstName, lastName } = req.body;

        const event = CreateUserDTO.create({ id: userId, firstName, lastName });
        this.eventBus.publish(event);

        res.status(201).send({ userId });
    }
}
