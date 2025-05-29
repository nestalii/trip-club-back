import db from '../../database/Db.js';

class TripService {
    async create(trip) {
        const query = `
            INSERT INTO trips (name, date, description, category, photo_link, creator_id)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
        `;
        const values = [trip.name, trip.date, trip.description, trip.category, trip.photo_link, trip.creator_id];
        await db.queryOne(query, values);
    }

    async update(id, trip) {
        const query = `
            UPDATE trips
            SET name        = $1,
                date        = $2,
                description = $3,
                category    = $4,
                photo_link  = $5
            WHERE id = $6
        `;
        const values = [trip.name, trip.date, trip.description, trip.category, trip.photo_link, id];
        await db.queryOne(query, values);
    }

    async delete(id) {
        const query = `
            DELETE
            FROM trips
            WHERE id = $1
        `;
        const values = [id];
        await db.queryOne(query, values);
    }

    async getAll(queryParams) {
        let query = `
        SELECT *
        FROM trips
        `

        const values = [];
        if (queryParams) {
            if (queryParams.search) {
                query += ' WHERE name ILIKE $1';
                values.push(`%${queryParams.search}%`);
            }

            if (queryParams.category) {
                query += values.length ? ' AND' : ' WHERE';
                query += ' category = $' + (values.length + 1);
                values.push(queryParams.category);
            }

            if (queryParams.order) {
                query += ' ORDER BY date ' + queryParams.order;
            }
        }

        return db.queryMany(query, values);
    }

    async getById(id) {
        const query = `
            SELECT *
            FROM trips
            WHERE id = $1
        `;
        const values = [id];
        return db.queryOne(query, values);
    }
}

export default new TripService();