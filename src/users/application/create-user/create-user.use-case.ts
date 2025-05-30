import { DomainEventBus } from '@shared/domain/event-bus/domain-event-bus';
import { TOKEN } from '@shared/infrastructure/di/tokens';
import { UserAlreadyExistsError } from '@users/domain/errors/user-already-exists.error';
import { User } from '@users/domain/models/user';
import { UserRepository } from '@users/domain/repositories/user.repository';
import { USER_TOKEN } from '@users/infrastructure/di/user.tokens';

import { inject, injectable } from 'tsyringe';

type CreateUserUseCaseInput = {
    id: string;
    firstName: string;
    lastName: string;
};

@injectable()
export class CreateUserUseCase {
    constructor(
        @inject(USER_TOKEN.REPOSITORY) private readonly repository: UserRepository<User>,
        @inject(TOKEN.DOMAIN_EVENT_BUS) private readonly eventBus: DomainEventBus
    ) {}

    async execute({ id, firstName, lastName }: CreateUserUseCaseInput): Promise<void> {
        const userRead = await this.repository.searchById(id);
        if (userRead.isOk() && userRead.value) {
            throw new UserAlreadyExistsError();
        }

        const newUser = User.create({ id, firstName, lastName });
        const result = await this.repository.add(newUser);
        if (result.isErr()) {
            throw result.error;
        }

        await this.eventBus.publish(newUser.pullDomainEvents());
    }
}
