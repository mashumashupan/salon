import fs from "node:fs";
import generateSchema from "openapi-typescript"
import { saveSchema } from "../util/client";
import { loadEnv } from "vite";
const { DIRECTUS_EMAIL } = loadEnv(process.env.DIRECTUS_EMAIL ?? '', process.cwd(), "");
const { DIRECTUS_PASSWORD } = loadEnv(process.env.DIRECTUS_PASSWORD ?? '', process.cwd(), "");
const { DIRECTUS_ENDPOINT } = loadEnv(process.env.DIRECTUS_ENDPOINT ?? '', process.cwd(), "");

// save schema
await saveSchema(DIRECTUS_EMAIL!!, DIRECTUS_PASSWORD!!, DIRECTUS_ENDPOINT!!);

// read schema
const contents = await generateSchema(new URL("../schema/schema.json", import.meta.url));

// write schema to type definition file
fs.writeFileSync("src/schema/schema.d.ts", contents, "utf8");
process.exit();