import { VideoReadRepository } from '@videomatt/videos/videos/domain/repositories/video-read.repository';
import { FilterOperator, Filters } from '@videomatt/shared/domain/repositories/filters';
import { VIDEO_TOKEN } from '@videomatt/videos/videos/infrastructure/di/tokens-video';
import { VideoRead } from '@videomatt/videos/videos/domain/models/read/video.read';
import { Criteria } from '@videomatt/shared/domain/repositories/criteria';
import { inject, injectable } from 'tsyringe';
import { fold } from 'fp-ts/lib/Option';

@injectable()
export class IncreaseAmountOfCommentsUseCase {
    constructor(
        @inject(VIDEO_TOKEN.VIDEO_READ_REPOSITORY) private readonly repository: VideoReadRepository<VideoRead>
    ) {}

    async execute(videoId: string, commentId: string) {
        const commentExists = await this.repository.check(commentId);
        if (commentExists) {
            return;
        }

        const criteria = Criteria.create().addFilter(Filters.create('id', FilterOperator.EQUALS, videoId));
        const videoOption = await this.repository.searchById(criteria);

        fold(
            async () => {
                throw new Error('Video not found');
            },
            async (video: VideoRead) => {
                video.increaseAmountOfComments();
                await this.repository.update(video);
                await this.repository.save(commentId);
            }
        )(videoOption);
    }
}
