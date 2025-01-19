import { DomainEvent } from '@videomatt/shared/domain/event-bus/domain-event';

export interface EventBus {
    publish(event: DomainEvent[]): void;
}