import {
    authentication, createDirectus, rest,
    type DirectusClient,
    type AuthenticationClient,
    type RestClient,
    readOpenApiSpec
} from '@directus/sdk';
import { assert } from 'console';
import fs from 'fs';
import { type components } from '~/schema/schema';

// Schemaの型定義からDirectusSDKが解釈できる型に変換
type SchemaBase = components["schemas"];
type Schema = {
    [K in keyof SchemaBase as (K extends `Items${infer Rest}` ? Uncapitalize<Rest> : never)]: SchemaBase[K][]
};

// DirectusSDKクライアントを作成する関数
type ClientType = DirectusClient<Schema> & AuthenticationClient<Schema> & RestClient<Schema>;
const getClient = (async (email: string, password: string, endpoint: string) => {
    const c = createDirectus<Schema>(endpoint).with(authentication()).with(rest());
    await c.login(email, password);
    return c;
});

// DirectusからSchema情報を取得し、ファイルを保存する
async function saveSchema(email:string, password:string, endpoint: string) {
    const result = await (await getClient(email, password, endpoint)).request(readOpenApiSpec());
    fs.writeFileSync('src/schema/schema.json', JSON.stringify(result, null, 2));
}

/**
 * DirectusSDKクライアント作成用クラス
 * create()を呼び出してクライアントを取得する
 */
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

export { saveSchema, Client };