const db = require('../config/db');

const schoolModel = {
    async addSchool({ name, address, latitude, longitude }) {
        try {
            const [rows] = await db.query('INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)', [name, address, latitude, longitude]);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    async getAllSchools() {
        try {
            const [rows] = await db.query(`SELECT * FROM schools`);
            return rows;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = schoolModel;