export const VIDEO_TOKEN = {
    // Storage
    DB_MODEL: Symbol('VIDEO_DB_MODEL'),
    DB_MODEL_READ: Symbol('VIDEO_DB_MODEL_READ'),

    // SNS
    SNS_TOPIC_ARN: Symbol('SNS_VIDEO_TOPIC_ARN'),
    SNS_EVENT_PRODUCER: Symbol('SNS_VIDEO_EVENT_PRODUCER'),
    IN_MEMORY_EVENT_PUBLISHER: Symbol('IN_MEMORY_VIDEO_EVENT_PUBLISHER'),

    // Consumers
    SQS_EVENT_VIDEO_CREATED_CONSUMER: Symbol('SQS_EVENT_VIDEO_CREATED_CONSUMER'),
    IN_MEMORY_EVENT_VIDEO_CREATED_SUBSCRIBER: Symbol('IN_MEMORY_EVENT_VIDEO_CREATED_SUBSCRIBER'),
    IN_MEMORY_EVENT_COMMENT_ADDED_SUBSCRIBER: Symbol('IN_MEMORY_EVENT_COMMENT_ADDED_SUBSCRIBER'),

    // Handlers
    CREATE_VIDEO_HANDLER: Symbol('CREATE_VIDEO_HANDLER'),
    CREATE_VIDEO_READ_HANDLER: Symbol('CREATE_VIDEO_READ_HANDLER'),
    GET_VIDEOS_HANDLER: Symbol('GET_VIDEOS_HANDLER'),
    INCREASE_AMOUNT_OF_COMMENTS_HANDLER: Symbol('INCREASE_AMOUNT_OF_COMMENTS_HANDLER'),

    // SQS
    SQS_VIDEO_CREATED_QUEUE_URL: Symbol('SQS_VIDEO_CREATED_QUEUE_URL'),

    // Controllers
    PUBLISH_VIDEO_CONTROLLER: Symbol('PUBLISH_VIDEO_CONTROLLER'),
    GET_VIDEOS_CONTROLLER: Symbol('GET_VIDEOS_CONTROLLER'),

    // Use Cases
    PUBLISH_VIDEO_USE_CASE: Symbol('PUBLISH_VIDEO_USE_CASE'),
    GET_VIDEOS_USE_CASE: Symbol('GET_VIDEOS_USE_CASE'),
    CREATE_VIDEO_READ_USE_CASE: Symbol('CREATE_VIDEO_READ_USE_CASE'),
    INCREASE_AMOUNT_OF_COMMENTS_USE_CASE: Symbol('INCREASE_AMOUNT_OF_COMMENTS_USE_CASE'),

    // Repositories
    REPOSITORY: Symbol('VIDEO_REPOSITORY'),
    VIDEO_READ_REPOSITORY: Symbol('VIDEO_READ_REPOSITORY'),
    GET_VIDEOS_REPOSITORY: Symbol('GET_VIDEOS_REPOSITORY'),
};
