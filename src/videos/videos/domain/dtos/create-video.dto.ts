import { DTO } from '@shared/domain/dtos/dto';

export class CreateVideoDTO extends DTO {
    static readonly type = 'CreateVideoDTO';

    private constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly description: string,
        public readonly url: string,
        public readonly userId: string
    ) {
        super();
    }

    static create({
        id,
        title,
        description,
        url,
        userId,
    }: {
        id: string;
        title: string;
        description: string;
        url: string;
        userId: string;
    }) {
        return new CreateVideoDTO(id, title, description, url, userId);
    }
}
