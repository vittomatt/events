import { DomainEvent } from './domain-event';

export abstract class AggregateRoot {
    private domainEvents: DomainEvent[] = [];

    pullDomainEvents(): DomainEvent[] {
        const domainEvents = this.domainEvents;
        this.domainEvents = [];
        return domainEvents;
    }

    record(event: DomainEvent): void {
        this.domainEvents.push(event);
    }
}