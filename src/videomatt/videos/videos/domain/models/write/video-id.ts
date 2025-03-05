import { InvalidUUIDError } from '@videomatt/shared/domain/errors/invalid-uuid.error';
import { BaseValueObject } from '@videomatt/shared/domain/value-object';

export class VideoId extends BaseValueObject {
    constructor(public readonly value: string) {
        super();
        this.ensureUUID(value);
    }

    private ensureUUID(value: string) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(value)) {
            throw new InvalidUUIDError();
        }
    }
}
