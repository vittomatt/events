import { UserRepository } from '@videomatt/users/domain/repositories/user.repository';
import { USER_TOKENS } from '@videomatt/users/infrastructure/di/tokens-user';
import { EventBus } from '@videomatt/shared/domain/event-bus/event-bus';
import { TOKEN } from '@videomatt/shared/infrastructure/di/tokens';
import { User } from '@videomatt/users/domain/models/write/user';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateUserUseCase {
    constructor(
        @inject(USER_TOKENS.REPOSITORY) private readonly repository: UserRepository<User>,
        @inject(TOKEN.EVENT_BUS) private readonly eventBus: EventBus
    ) {}

    async execute({ id, firstName, lastName }: { id: string; firstName: string; lastName: string }) {
        const user = User.create({ id, firstName, lastName });
        this.repository.add(user);
        this.eventBus.publish(user.pullDomainEvents());
    }
}
