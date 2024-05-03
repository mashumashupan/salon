import fs from "node:fs";
import openapiTS from "openapi-typescript";
import astToString from "openapi-typescript"
import { saveSchema } from "../util/client";
import { loadEnv } from "vite";
const { DIRECTUS_EMAIL } = loadEnv(process.env.DIRECTUS_EMAIL ?? '', process.cwd(), "");
const { DIRECTUS_PASSWORD } = loadEnv(process.env.DIRECTUS_PASSWORD ?? '', process.cwd(), "");
const { DIRECTUS_ENDPOINT } = loadEnv(process.env.DIRECTUS_ENDPOINT ?? '', process.cwd(), "");

// save schema
await saveSchema(DIRECTUS_EMAIL!!, DIRECTUS_PASSWORD!!, DIRECTUS_ENDPOINT!!);

// read schema
const ast = await openapiTS(new URL("../schema/schema.json", import.meta.url));
const contents = await astToString(ast);

// write schema to type definition file
fs.writeFileSync("./schema.d.ts", contents);
