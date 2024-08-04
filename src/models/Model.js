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

        let query = "DELETE FROM " + this.table + " WHERE " + this._buildPKQuery(pk)
        let [rows] = await this.db.query(query)
        return rows

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

        cases = cases.flat().join('+')

        //   Merging together





    }

    async get(pk) {
        let query = "SELECT * FROM " + this.table + " WHERE " + this._buildPKQuery(pk)
        let [rows] = await this.db.query(query)
        return rows
    }

    _buildPKQuery(pk) {
        return Object.entries(pk).map(arr => `${arr[0]} = '${arr[1]}'`).join(" AND ")
    }

    _buildCaseQuery(txt, field, relevance = 1) {
        return "CASE WHEN " + field + " ILIKE '%" + txt + "%' THEN " + relevance + " ELSE 0 END"
    }
}
