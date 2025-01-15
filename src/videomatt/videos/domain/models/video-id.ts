import { BaseValueObject } from '@videomatt/shared/domain/value-object';

export class VideoId extends BaseValueObject {
    constructor(public readonly value: string) {
        super();
    }
}