import { createDirectus, rest } from '@directus/sdk';

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

export const client = createDirectus<Schema>('http://localhost:8055').with(rest());