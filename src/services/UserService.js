import db from '../../database/Db.js';

class UserService {
    async getUserTrips(id, role) {
        let query = `
                SELECT 
                    t.id,
                    t.name,
                    t.date,
                    t.description,
                    t.category,
                    t.photo_link,
                    c.first_name as "creatorFirstName",
                    c.last_name as "creatorLastName"
                FROM trips t
            `;
        if (role === 'USER') {
            query += `
                JOIN user_trips ut ON ut.trip_id = t.id
                JOIN users u ON u.id = ut.user_id
                LEFT JOIN users c ON c.id = t.creator_id
                WHERE u.id = $1
            `;
        } else {
            query += `
                JOIN users c ON c.id = t.creator_id
                WHERE t.creator_id = $1
            `;
        }
        return db.queryMany(query, [id]).then(items => items.map(item => ({
            id: item.id,
            name: item.name,
            date: item.date,
            description: item.description,
            category: item.category,
            photoLink: item.photo_link,
            creatorFirstName: item.creatorFirstName,
            creatorLastName: item.creatorLastName
        })));
    }

    async update(id, user) {
        const query = `
            UPDATE users
            SET first_name  = $1,
                last_name   = $2,
                avatar_link = $3
            WHERE id = $4
        `;
        const values = [user.firstName, user.lastName, user.avatarLink, id];
        await db.queryOne(query, values);
    }

    async delete(id) {
        const query = `
            DELETE
            FROM users
            WHERE id = $1
        `;
        const values = [id];
        await db.queryOne(query, values);
    }
}

export default new UserService();