import { groupBy } from "../utils/anner.arrays.js";
import db from "../database/db.js";
import Filter from "../vendor/Filter/Filter.js";
import { Table } from "../types/MVC-related-types.js";
import catchError from "../utils/catchError.js";
import { ConnectionError } from "../errors/EError.js";
import SearchQuery from "../vendor/SearchQuery.js";


class Model<C extends string, PK extends C[]>{

    private table : Table<C, PK>
    table_name = ''
    db : typeof db
    private search_object : SearchQuery<C>

    constructor(table : Table<C, PK>) {
        this.table = table;
        this.table_name = table.table_name
        this.db = db
    }

    
    async create(data : Record<C, string | number>) {
        let cols = Object.keys(data)
        let placeholders = new Array(cols.length).fill('?')
        
        let query = `INSERT INTO ${this.table_name} (${cols.join(',')}) VALUES (${placeholders.join(',')})`
        return await this._executeQuery(query,Object.values(data))

        
    }

    async createBundle(arr : Record<C, string | number>[]){
        let fields = Object.keys(arr[0])
        let query = "INSERT INTO "+this.table_name+ `(${fields.join(',')}) VALUES `
        let placeholders = arr.map(_ => `(${new Array(fields.length).fill('?').join(',')})`).join(', ')
        query += placeholders
        let values = arr.map<string[]>(obj => Object.values(obj)).flat()

        return await this._executeQuery(query, values)

    }

    async edit(data : Record<C, string | number>, pk : Record<PK[number], string>) {

    let updates = Object.keys(data).map(col => `${col} = ?`).join(", ");

    let query = `UPDATE ${this.table_name} SET ${updates} WHERE ${this._buildPKQuery(pk)}`;

    return await this._executeQuery(query, Object.values(data));

    }

    async delete(pk : Record<PK[number], string>) {

        let query = "DELETE FROM " + this.table_name + " WHERE " + this._buildPKQuery(pk)
        return await this._executeQuery(query)

    }

    // async search(params : Filter<C>[] = [], min = 0) : SearchQuery<C>{
        
    //     let cases = params.map((filter : Filter<C>) => filter.get())
    //     if (cases.length == 0) {
    //         cases.push(String(min))
    //     }
    //     let casesQuery = cases.join('+')

    //     let query = `SELECT * FROM ( SELECT *, (${casesQuery}) AS relevance FROM ${this.table_name}) subquery WHERE relevance >= ${min} ORDER BY relevance DESC`

    //     return await this._executeQuery(query)

    // }

    search() : SearchQuery<C>{
        this.search_object = new SearchQuery<C>()
        return this.search_object
    }

    async executeSearch(min = 0){
        let cases = this.search_object.filters.map((filter : Filter<C>) => filter.get())
        if (cases.length == 0) {
            cases.push(String(min))
        }
        let casesQuery = cases.join('+')

        let query = `SELECT * FROM ( SELECT *, (${casesQuery}) AS relevance FROM ${this.table_name}) subquery WHERE relevance >= ${min} ORDER BY relevance DESC`

        return await this._executeQuery(query)
    }

    async get(pk : Record<PK[number], string>) {
        let query = "SELECT * FROM " + this.table_name + " WHERE " + this._buildPKQuery(pk)
        return await this._executeQuery(query)
    }

    _buildPKQuery(pk : Record<PK[number], string>) {
        return Object.entries(pk).map(arr => `${arr[0]} = '${arr[1]}'`).join(" AND ")
    }


    async _executeQuery(query : string, values? : string[]) {
        let [err , res] = await catchError(this.db.query(query, values), [ConnectionError])

        if (err) {
            
        }

        db.releaseConnection(await db.getConnection())
        return res
        
    }
}

export default Model