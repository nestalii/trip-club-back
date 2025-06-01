import db from '../../database/Db.js';

class TripService {
    async create(trip) {
        const query = `
            INSERT INTO trips (name, date, description, category, photo_link, creator_id)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
        `;
        const values = [trip.name, trip.date, trip.description, trip.category, trip.photoLink, trip.creatorId];
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
        const values = [trip.name, trip.date, trip.description, trip.category, trip.photoLink, id];
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
        FROM trips t
        LEFT JOIN users u ON t.creator_id = u.id
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
        return db.queryMany(query, values).then(items => items.map(item => ({
            id: item.id,
            name: item.name,
            date: item.date,
            description: item.description,
            category: item.category,
            photoLink: item.photo_link,
            creator: {
                id: item.creator_id,
                firstName: item.first_name,
                lastName: item.last_name,
            }
        })));
    }

    async getById(id) {
        const query = `
            SELECT *
            FROM trips t
            LEFT JOIN users u ON t.creator_id = u.id
            WHERE id = $1
        `;
        const values = [id];
        return db.queryOne(query, values).then(item => ({
            id: item.id,
            name: item.name,
            date: item.date,
            description: item.description,
            category: item.category,
            photoLink: item.photo_link,
            creator: {
                id: item.creator_id,
                firstName: item.first_name,
                lastName: item.last_name,
            }
        }));
    }

    async registerUserTrip(userId, tripId) {
        const query = `
            INSERT INTO user_trips (user_id, trip_id)
            VALUES ($1, $2)
        `;
        const values = [userId, tripId];
        await db.queryOne(query, values);
    }
}

export default new TripService();