import { inject, injectable } from 'tsyringe';

import { TOKEN } from '@videomatt/shared/infrastructure/di/tokens';
import { EventBus } from '@videomatt/shared/domain/event-bus/event-bus';
import { UserRepository } from '@videomatt/users/domain/repositories/user.repository';
import { User } from '@videomatt/users/domain/models/user';

@injectable()
export class CreateUserUseCase {
    constructor(
        @inject(TOKEN.USER.REPOSITORY) private readonly repository: UserRepository<User>,
        @inject(TOKEN.SHARED.EVENT_BUS) private readonly eventBus: EventBus
    ) {}

    async execute(userId: string, userFirstName: string, userLastName: string) {
        const user = User.create(userId, userFirstName, userLastName);
        this.repository.add(user);
        this.eventBus.publish(user.pullDomainEvents());
    }
}
