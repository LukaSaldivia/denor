import anner from "../utils/anner.arrays";
import db from "../database/db";

class Model {
    constructor(table = "", pageSize = 15) {
        this.table = table;
        this.pageSize = pageSize
        this.db = db
    }

    create(data) {

    }

    edit(data, pk) {

    }

    async delete(pk) {

        let query = "DELETE FROM " + this.table + " WHERE " + this._buildPKQuery(pk) + " RETURNING *"
        return this._executeQuery(query)

    }

    async search(params) { // [{q:"Salame",field:"nombre",exclusive:false}]
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

        cases = cases.flat().unshift("CASE WHEN 1=1 THEN 1 ELSE 0")
        cases = cases.join('+')

        //   Merging together

        // let query = `SELECT *,(${cases}) as relevance FROM ${this.table} HAVING relevance > ${+!cases.length}`




    }

    async get(pk) {
        let query = "SELECT * FROM " + this.table + " WHERE " + this._buildPKQuery(pk)
        return this._executeQuery(query)
    }

    _buildPKQuery(pk) {
        return Object.entries(pk).map(arr => `${arr[0]} = '${arr[1]}'`).join(" AND ")
    }

    _buildCaseQuery(txt, field, relevance = 1) {
        return "CASE WHEN " + field + " ILIKE '%" + txt + "%' THEN " + relevance + " ELSE 0 END"
    }

    async _executeQuery(query, params = []){
        try {
            const [rows] = await this.db.query(query, params);
            return rows;
        } catch (error) {
            console.error("Database query error:", error);
            throw new Error("Error executing database query");
        }
    }
}
