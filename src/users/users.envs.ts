import { UnexpectedError } from '@shared/domain/errors/unexpected.error';

import dotenv from 'dotenv';
import { config as dotenvSafeConfig } from 'dotenv-safe';
import { z } from 'zod';

function nonEmptyStr(name: string) {
    return z.string().min(1, `${name} is required`);
}

let envConfig: EnvVars | null = null;

export const envSchema = z.object({
    NODE_ENV: z.enum(['docker', 'dev', 'prod']).default('dev'),

    USERS_PORT: z.coerce.number().min(1),

    USERS_POSTGRES_DB_SHARD_1_SHARD_NAME: nonEmptyStr('USERS_POSTGRES_DB_SHARD_1_SHARD_NAME'),
    USERS_POSTGRES_DB_SHARD_1_HOST: nonEmptyStr('USERS_POSTGRES_DB_SHARD_1_HOST'),
    USERS_POSTGRES_DB_SHARD_1_USER: nonEmptyStr('USERS_POSTGRES_DB_SHARD_1_USER'),
    USERS_POSTGRES_DB_SHARD_1_PASSWORD: nonEmptyStr('USERS_POSTGRES_DB_SHARD_1_PASSWORD'),
    USERS_POSTGRES_DB_SHARD_1_NAME: nonEmptyStr('USERS_POSTGRES_DB_SHARD_1_NAME'),
    USERS_POSTGRES_DB_SHARD_1_PORT: z.coerce.number().min(1),

    USERS_POSTGRES_DB_SHARD_2_SHARD_NAME: nonEmptyStr('USERS_POSTGRES_DB_SHARD_2_SHARD_NAME'),
    USERS_POSTGRES_DB_SHARD_2_HOST: nonEmptyStr('USERS_POSTGRES_DB_SHARD_2_HOST'),
    USERS_POSTGRES_DB_SHARD_2_USER: nonEmptyStr('USERS_POSTGRES_DB_SHARD_2_USER'),
    USERS_POSTGRES_DB_SHARD_2_PASSWORD: nonEmptyStr('USERS_POSTGRES_DB_SHARD_2_PASSWORD'),
    USERS_POSTGRES_DB_SHARD_2_NAME: nonEmptyStr('USERS_POSTGRES_DB_SHARD_2_NAME'),
    USERS_POSTGRES_DB_SHARD_2_PORT: z.coerce.number().min(1),

    AWS_REGION: nonEmptyStr('AWS_REGION'),
    AWS_PROFILE: z.string().optional(),
    AWS_ACCESS_KEY_ID: z.string().optional(),
    AWS_SECRET_ACCESS_KEY: z.string().optional(),

    AWS_SNS_ENDPOINT: nonEmptyStr('AWS_SNS_ENDPOINT').url(),
    AWS_SQS_ENDPOINT: nonEmptyStr('AWS_SQS_ENDPOINT').url(),
    AWS_EVENT_BRIDGE_ENDPOINT: nonEmptyStr('AWS_EVENT_BRIDGE_ENDPOINT').url(),

    SQS_USER_CREATED_QUEUE_URL: nonEmptyStr('SQS_USER_CREATED_QUEUE_URL').url(),
    SQS_VIDEO_CREATED_QUEUE_URL: nonEmptyStr('SQS_VIDEO_CREATED_QUEUE_URL').url(),

    SNS_VIDEO_TOPIC_ARN: nonEmptyStr('SNS_VIDEO_TOPIC_ARN'),
    EVENT_BRIDGE_USER_TOPIC_ARN: nonEmptyStr('EVENT_BRIDGE_USER_TOPIC_ARN'),
});

export type EnvVars = z.infer<typeof envSchema>;

export function initEnvs() {
    const env = process.env.NODE_ENV ?? 'dev';
    const path = {
        dev: '.env',
        prod: '.env.prod',
    }[env];

    dotenv.config({ path });

    if (process.env.NODE_ENV !== 'prod') {
        dotenvSafeConfig({
            path,
            example: '.env.example',
            allowEmptyValues: true,
        });
    }

    const parsed = envSchema.safeParse(process.env);
    if (!parsed.success) {
        console.error('❌ Invalid environment variables:', parsed.error.format());
        throw new UnexpectedError('Invalid environment variables');
    }

    envConfig = parsed.data;
    return envConfig;
}

export function getEnvs(): EnvVars {
    if (!envConfig) {
        throw new UnexpectedError('You must call initEnvs() before getEnvs()');
    }
    return envConfig;
}
