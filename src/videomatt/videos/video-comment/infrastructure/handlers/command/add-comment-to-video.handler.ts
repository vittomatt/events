import { AddCommentToVideoUseCase } from '@videomatt/videos/video-comment/application/add-comment-to-video/add-comment-to-video.use-case';
import { VideoCommentAddedEvent } from '@videomatt/videos/video-comment/domain/events/video-comment-added.event';
import { VIDEO_COMMENT_TOKENS } from '@videomatt/videos/video-comment/infrastructure/di/tokens-video-comment';
import { VideoNotFoundError } from '@videomatt/videos/videos/domain/errors/video-not-found.error';
import { CommandHandler } from '@videomatt/shared/domain/event-bus/command.handler';
import { DomainEvent } from '@videomatt/shared/domain/event-bus/domain.event';
import { inject, injectable } from 'tsyringe';
import { Either } from 'fp-ts/lib/Either';

@injectable()
export class AddCommentToVideoHandler implements CommandHandler<VideoNotFoundError> {
    constructor(
        @inject(VIDEO_COMMENT_TOKENS.ADD_COMMENT_TO_VIDEO_USE_CASE)
        private readonly useCase: AddCommentToVideoUseCase
    ) {}

    async handle(event: DomainEvent): Promise<Either<VideoNotFoundError, void>> {
        const videoCommentEvent = event as VideoCommentAddedEvent;
        return this.useCase.execute({
            id: videoCommentEvent.id,
            text: videoCommentEvent.text,
            videoId: videoCommentEvent.videoId,
            userId: videoCommentEvent.userId,
        });
    }
}
