export const TOKEN = {
    DB: Symbol('DB'),
    MONGO_DB: Symbol('MONGO_DB'),
    LOGGER: Symbol('LOGGER'),
    ERROR_CONTROLLER: Symbol('ERROR_CONTROLLER'),
    DOMAIN_EVENT_BUS: Symbol('DOMAIN_EVENT_BUS'),
    DEFERRED_DOMAIN_EVENT_BUS: Symbol('DEFERRED_DOMAIN_EVENT_BUS'),
    COMMAND_EVENT_BUS: Symbol('COMMAND_EVENT_BUS'),
    QUERY_EVENT_BUS: Symbol('QUERY_EVENT_BUS'),
    WORKER_USER: Symbol('WORKER_USER'),
    WORKER_VIDEO: Symbol('WORKER_VIDEO'),
    SNS_CLIENT: Symbol('SNS_CLIENT'),
    SQS_CLIENT: Symbol('SQS_CLIENT'),
    EVENT_BRIDGE_CLIENT: Symbol('EVENT_BRIDGE_CLIENT'),
};
