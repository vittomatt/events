import { SNSEventPublisher } from '@videomatt/shared/infrastructure/broker/sns-event.publisher';
import { DomainEvent } from '@videomatt/shared/domain/event-bus/domain-event';
import { TOKEN } from '@videomatt/shared/infrastructure/di/tokens';
import { Logger } from '@videomatt/shared/domain/logger/logger';
import { SNSClient } from '@aws-sdk/client-sns';
import { inject, injectable } from 'tsyringe';

@injectable()
export class SNSVideoEventPublisher extends SNSEventPublisher {
    constructor(
        @inject(TOKEN.SHARED.SNS_CLIENT) protected readonly sns: SNSClient,
        @inject(TOKEN.SHARED.LOGGER) protected readonly logger: Logger,
        @inject(TOKEN.VIDEO.SNS_TOPIC_ARN) private readonly topicArn: string
    ) {
        super(sns, logger);
    }

    getTopic(): string {
        return this.topicArn;
    }

    isValidEvent(event: DomainEvent): boolean {
        return event.getEntity() === 'video';
    }
}
