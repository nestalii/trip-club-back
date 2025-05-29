import pg from 'pg';

export const client = new pg.Client(process.env.DATABASE_URL)

class Db {
    async queryOne(query, values) {
        const result = await client.query(query, values);
        return result.rows[0];
    }

    async queryMany(query, values) {
        const result = await client.query(query, values);
        return result.rows;
    }
}

export default new Db();