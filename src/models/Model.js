import anner from "../utils/anner.arrays.js";
import db from "../database/db.js";

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

    edit(data, pk) {

    }

    async delete(pk) {

        let query = "DELETE FROM " + this.table + " WHERE " + this._buildPKQuery(pk)
        return await this._executeQuery(query)

    }

    async search(params = []) { // [{txt:"Salame",field:"nombre",exclusive:false}]
        // Exclusives handling
        let exclusives = params.filter(obj => obj.exclusive)
        let exclusivesObj = {}

        for (const obj of exclusives) {
            exclusivesObj[obj.field] = obj.txt
        }

        exclusives = this._buildPKQuery(exclusivesObj)



        if (exclusives) {
            exclusives = "WHERE " + exclusives
        }

        //   Non exclusives handling

        let notExclusives = params.filter(obj => !obj.exclusive)


        let cases = []

        for (const obj of notExclusives) {
            cases.push({
                field: obj.field,
                txts: anner.getAccumulated(obj.txt)
            })
        }

        for (let i = 0; i < cases.length; i++) {

            cases[i] = cases[i].txts.map(txt => this._buildCaseQuery(txt, cases[i].field, 1))
        }

        cases = cases.flat()
        cases.unshift("CASE WHEN 1=1 THEN 1 ELSE 0 END")
                
        //   Merging together

        let query = `SELECT * FROM ( SELECT *, (${cases.join('+')}) AS relevance FROM ${this.table} ${exclusives}) subquery WHERE relevance > ${+!(cases.length == 1)} ORDER BY relevance DESC`

        return await this._executeQuery(query)




    }

    async get(pk) {
        let query = "SELECT * FROM " + this.table + " WHERE " + this._buildPKQuery(pk)
        return await this._executeQuery(query)
    }

    _buildPKQuery(pk) {
        return Object.entries(pk).map(arr => `${arr[0]} = '${arr[1]}'`).join(" AND ")
    }

    _buildCaseQuery(txt, field, relevance = 1) {
        return "CASE WHEN LOWER(" + field + ") LIKE LOWER('%" + txt + "%') THEN " + relevance + " ELSE 0 END"
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