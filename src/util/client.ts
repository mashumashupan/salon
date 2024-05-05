import {
    authentication, createDirectus, rest,
    type DirectusClient,
    type AuthenticationClient,
    type RestClient,
    readOpenApiSpec,
    readFile
} from '@directus/sdk';
import type { ImageMetadata } from 'astro';
import { assert } from 'console';
import fs from 'fs';
import { type components } from '~/schema/schema';

// 配列の場合はプロパティを指定
const arrayProperties = ['process'] as const;
type ArrayProperties = typeof arrayProperties[number];
// Schemaの型定義からDirectusSDKが解釈できる型に変換
type SchemaBase = components["schemas"];
type Schema = {
    [K in keyof SchemaBase as (K extends `Items${infer Rest}` ? Uncapitalize<Rest> : never)]:
    Uncapitalize<K extends `Items${infer Rest}` ? Extract<Rest, string> : never> extends ArrayProperties ? SchemaBase[K][] : SchemaBase[K]
};

// DirectusSDKクライアントを作成する関数
type ClientType = DirectusClient<Schema> & AuthenticationClient<Schema> & RestClient<Schema>;
const getClient = async (email: string, password: string, endpoint: string) => {
    const c = createDirectus<Schema>(endpoint).with(authentication()).with(rest());
    await c.login(email, password);
    return c;
};

// DirectusからSchema情報を取得し、ファイルを保存する
async function saveSchema(email: string, password: string, endpoint: string) {
    let result;
    const client = await getClient(email, password, endpoint);
    result = await client.request(readOpenApiSpec());
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

async function getImage(client: ClientType, file: string | null): Promise<ImageMetadata> {
    if (file == null) return Promise.reject();

    const endpoint = import.meta.env.DIRECTUS_ENDPOINT;
    const fileObject = await client.request(readFile(file));
    const filename = fileObject.filename_download.split('.')[0];
    const url = `http://localhost:8055/assets/${fileObject.id}/${filename}.webp?format=webp`;
    return {
        src: url,
        format: 'webp',
        height: fileObject.height,
        width: fileObject.width
    } as ImageMetadata
}

export { saveSchema, Client, getImage };