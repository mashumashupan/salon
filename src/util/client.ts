import {
    authentication, createDirectus, rest,
    type DirectusClient,
    type AuthenticationClient,
    type RestClient,
    readOpenApiSpec
} from '@directus/sdk';
import { assert } from 'console';
import fs from 'fs';

interface Process {
    id: number;
    number: number;
    title: string;
    description: string;
    annotation: string;
}

interface Schema {
    process: Process[];
}

type ClientType = DirectusClient<Schema> & AuthenticationClient<Schema> & RestClient<Schema>;
const getClient = (async (email: string, password: string, endpoint: string) => {
    const c = createDirectus<Schema>(endpoint).with(authentication()).with(rest());
    await c.login(email, password);
    return c;
});

export async function saveSchema(email:string, password:string, endpoint: string) {
    const result = await (await getClient(email, password, endpoint)).request(readOpenApiSpec());
    fs.writeFileSync('src/schema/schema.json', JSON.stringify(result, null, 2));
}

class Client {
    private email = import.meta.env.DIRECTUS_EMAIL;
    private password = import.meta.env.DIRECTUS_PASSWORD;
    private endpoint = import.meta.env.DIRECTUS_ENDPOINT;

    constructor() {
        assert(this.email, 'env.DIRECTUS_EMAIL is not set');
        assert(this.password, 'env.DIRECTUS_PASSWORD is not set');
        assert(this.endpoint, 'env.DIRECTUS_ENDPOINT is not set');
    }
    
    async create(): Promise<ClientType> {
        return await getClient(this.email!!, this.password!!, this.endpoint!!);
    }
}

export default Client;