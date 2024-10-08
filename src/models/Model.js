import anner from "../utils/anner.arrays.js";
import db from "../database/db.js";
import Filter from "../vendor/Filter/Filter.js";

class Model {
    constructor(table = "", pageSize = 15) {
        this.table = table;
        this.pageSize = pageSize
        this.db = db
    }

    
    async create(data = {}) {
        let cols = Object.keys(data)
        let placeholders = new Array(cols.length).fill('?')
        
        let query = `INSERT INTO ${this.table} (${cols.join(',')}) VALUES (${placeholders.join(',')})`
        return await this._executeQuery(query,Object.values(data))

        
    }

    async createBundle(arr = [{}]){
        let fields = Object.keys(arr[0])
        let query = "INSERT INTO "+this.table+ `(${fields.join(',')}) VALUES `
        let placeholders = arr.map(_ => `(${new Array(fields.length).fill('?').join(',')})`).join(', ')
        query += placeholders
        let values = arr.map(obj => Object.values(obj)).flat()

        return await this._executeQuery(query, values)



    }

    async edit(data, pk) {

    let updates = Object.keys(data).map(col => `${col} = ?`).join(", ");

    let query = `UPDATE ${this.table} SET ${updates} WHERE ${this._buildPKQuery(pk)}`;

    return await this._executeQuery(query, Object.values(data));

    }

    async delete(pk) {

        let query = "DELETE FROM " + this.table + " WHERE " + this._buildPKQuery(pk)
        return await this._executeQuery(query)

    }

    async search(params = [Filter]) {
        

        let filters = anner.groupBy(params, (filter => filter.exclusive))

        // Exclusives handling
        let exclusives = filters[true] || []

        let exclusivesQuery = exclusives.map(filter => filter.get()).join(' AND ')

        if (exclusivesQuery) {
            exclusivesQuery = "WHERE " + exclusivesQuery
        }

        //   Non exclusives handling

        let nonExclusives = filters[false] || []

        let nonExclusivesQuery = nonExclusives.map(filter => filter.get())
        nonExclusivesQuery.unshift("CASE WHEN 1=1 THEN 1 ELSE 0 END")
        nonExclusivesQuery = nonExclusivesQuery.join('+')

                
        //   Merging together

        let query = `SELECT * FROM ( SELECT *, (${nonExclusivesQuery}) AS relevance FROM ${this.table} ${exclusivesQuery}) subquery WHERE relevance > ${+(nonExclusives.length == 1)} ORDER BY relevance DESC`

        return await this._executeQuery(query)

    }

    async get(pk) {
        let query = "SELECT * FROM " + this.table + " WHERE " + this._buildPKQuery(pk)
        return await this._executeQuery(query)
    }

    _buildPKQuery(pk) {
        return Object.entries(pk).map(arr => `${arr[0]} = '${arr[1]}'`).join(" AND ")
    }


    async _executeQuery(query, values = []) {
        try {
            const [rows] = await this.db.query(query, values);
            return rows;
        } catch (error) {
            console.error("Database query error:", error);
            throw new Error("Error executing database query");
        }
    }
}

export default Model