export const TOKEN = {
    SHARED: {
        LOGGER: Symbol('LOGGER'),
        ERROR_CONTROLLER: Symbol('ERROR_CONTROLLER'),
        EVENT_BUS: Symbol('EVENT_BUS'),
        SNS_CLIENT: Symbol('SNS_CLIENT'),
        SQS_CLIENT: Symbol('SQS_CLIENT'),
    },
    USER: {
        // Storage
        DB_MODEL: Symbol('USER_DB_MODEL'),
        REPOSITORY: Symbol('USER_REPOSITORY'),

        // AWS
        SNS_TOPIC_ARN: Symbol('SNS_USER_TOPIC_ARN'),
        SNS_EVENT_PUBLISHER: Symbol('SNS_USER_EVENT_PUBLISHER'),

        SQS_USER_CREATED_QUEUE_URL: Symbol('SQS_USER_CREATED_QUEUE_URL'),
        SQS_EVENT_PUBLISHED_CONSUMER: Symbol('SQS_USER_EVENT_PUBLISHED_CONSUMER'),

        // Application
        INCREASE_AMOUNT_OF_VIDEOS_ON_VIDEO_PUBLISHED_HANDLER: Symbol(
            'INCREASE_AMOUNT_OF_VIDEOS_ON_VIDEO_PUBLISHED_HANDLER'
        ),
        INCREASE_AMOUNT_OF_VIDEOS_USE_CASE: Symbol('INCREASE_AMOUNT_OF_VIDEOS_USE_CASE'),
        CREATE_USER_CONTROLLER: Symbol('CREATE_USER_CONTROLLER'),
        CREATE_USER_USE_CASE: Symbol('CREATE_USER_USE_CASE'),
    },
    VIDEO: {
        // Storage
        DB_MODEL: Symbol('VIDEO_DB_MODEL'),
        REPOSITORY: Symbol('VIDEO_REPOSITORY'),

        // AWS
        SNS_TOPIC_ARN: Symbol('SNS_VIDEO_TOPIC_ARN'),
        SNS_EVENT_PUBLISHER: Symbol('SNS_VIDEO_EVENT_PUBLISHER'),

        SQS_EVENT_PUBLISHED_CONSUMER: Symbol('SQS_VIDEO_EVENT_PUBLISHED_CONSUMER'),
        SQS_VIDEO_PUBLISHED_QUEUE_URL: Symbol('SQS_VIDEO_PUBLISHED_QUEUE_URL'),

        // Application
        PUBLISH_VIDEO_CONTROLLER: Symbol('PUBLISH_VIDEO_CONTROLLER'),
        PUBLISH_VIDEO_USE_CASE: Symbol('PUBLISH_VIDEO_USE_CASE'),
    },
};
