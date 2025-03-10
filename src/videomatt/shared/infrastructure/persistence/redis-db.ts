import { getEnvs } from '@videomatt/shared/infrastructure/envs/init-envs';
import { createClient, RedisClientType } from 'redis';

export class RedisDB {
    private readonly client: RedisClientType;

    constructor() {
        const envs = getEnvs();
        const { REDIS_HOST, REDIS_PORT } = envs;

        this.client = createClient({
            url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
        });

        this.client.on('error', (err) => console.error('Redis Client Error', err));
    }

    public async connect() {
        try {
            await this.client.connect();
            console.log('✅ Connected to Redis successfully');
        } catch (error) {
            console.error('❌ Error connecting to Redis:', error);
            throw error;
        }
    }

    public async getValue(key: string): Promise<string | null> {
        try {
            const value = await this.client.get(key);
            return value;
        } catch (error) {
            console.error('❌ Error getting value from Redis:', error);
            throw error;
        }
    }

    public async setValue(key: string, value: string): Promise<void> {
        try {
            await this.client.set(key, value);
            console.log(`✅ Key ${key} set successfully`);
        } catch (error) {
            console.error('❌ Error setting value in Redis:', error);
            throw error;
        }
    }

    public async disconnect() {
        try {
            await this.client.disconnect();
            console.log('✅ Disconnected from Redis successfully');
        } catch (error) {
            console.error('❌ Error disconnecting from Redis:', error);
            throw error;
        }
    }
}
