import { VideoCommentMother } from './video-comment.mother';
import { VideoDescriptionMother } from './video-description.mother';
import { VideoIdMother } from './video-id.mother';
import { VideoTitleMother } from './video-title.mother';
import { VideoUrlMother } from './video-url.mother';

import { ExtractPrimitives } from '@shared/domain/models/extract-primitives';
import { UserIdMother } from '@tests/shared/users/domain/user-id.mother';
import { VideoCommentPrimitives } from '@videos/video-comment/domain/models/video-comment';
import { Video, VideoPrimitives } from '@videos/videos/domain/models/video';

export class VideoMother {
    static create(params?: Partial<VideoPrimitives>): Video {
        const primitives: VideoPrimitives = {
            id: params?.id ?? VideoIdMother.create().value,
            title: params?.title ?? VideoTitleMother.create().value,
            description: params?.description ?? VideoDescriptionMother.create().value,
            url: params?.url ?? VideoUrlMother.create().value,
            userId: params?.userId ?? UserIdMother.create().value,
            comments: params?.comments ?? [VideoCommentMother.create().toPrimitives()],
            ...params,
        };

        return Video.fromPrimitives(primitives as ExtractPrimitives<Video> & { comments: VideoCommentPrimitives[] });
    }
}
