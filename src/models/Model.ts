import db from "../database/db.js";
import Filter from "../vendor/Filter/Filter.js";
import { Table, ForeignKey } from "../types/MVC-related-types.js";
import catchError from "../utils/catchError.js";
import { ConnectionError, UnknownDatabaseError, DeniedAccessDatabaseError, DuplicateEntryError } from "../errors/EError.js";
import FilterGroup from "../vendor/FilterGroup.js";
import ForeignKeyReferencesGroup from "../vendor/ForeignKeyReferencesGroup.js";


class Model<C extends string, PK extends C[]> {

    table_name = ''
    db: typeof db
    private filterGroup: FilterGroup<C> = new FilterGroup<C>()
    foreignKeys: ForeignKeyReferencesGroup<C>

    constructor(table: Table<C, PK>) {
        this.table_name = table.table_name
        this.db = db
        this.foreignKeys = new ForeignKeyReferencesGroup()
    }


    async create(data: Record<C, string | number>) {
        let cols = Object.keys(data)
        let placeholders = new Array(cols.length).fill('?')

        let query = `INSERT INTO ${this.table_name} (${cols.join(',')}) VALUES (${placeholders.join(',')})`
        return await this._executeQuery(query, Object.values(data))


    }

    async createBundle(arr: Record<C, string | number>[]) {
        let fields = Object.keys(arr[0])
        let query = "INSERT INTO " + this.table_name + `(${fields.join(',')}) VALUES `
        let placeholders = arr.map(_ => `(${new Array(fields.length).fill('?').join(',')})`).join(', ')
        query += placeholders
        let values = arr.map<string[]>(obj => Object.values(obj)).flat()

        return await this._executeQuery(query, values)

    }

    async edit(data: Record<C, string | number>, pk: Record<PK[number], string>) {

        let updates = Object.keys(data).map(col => `${col} = ?`).join(", ");

        let query = `UPDATE ${this.table_name} SET ${updates} WHERE ${this._buildPKQuery(pk)}`;

        return await this._executeQuery(query, Object.values(data));

    }

    async delete(pk: Record<PK[number], string>) {

        let query = "DELETE FROM " + this.table_name + " WHERE " + this._buildPKQuery(pk)
        return await this._executeQuery(query)

    }

    prepareSearch(): FilterGroup<C> {
        this.filterGroup = new FilterGroup<C>()
        return this.filterGroup
    }

    async search(
        min = 0,
        options: {
            sortBy?: { field: C | "relevance", order: "ASC" | "DESC" }[],
            limit?: number,
            offset?: number

        } = { limit: 15, offset: 0 }) {
        let cases = this.filterGroup.filters.map((filter: Filter<C>) => filter.get())
        if (cases.length == 0) {
            cases.push(String(min))
        }
        let casesQuery = cases.join('+')

        // SortHandle

        let sortBy = options.sortBy || []

        let sortQuery = []

        for (const sortObj of sortBy) {
            sortQuery.push(`${sortObj.field} ${sortObj.order || "ASC"}`)
        }


        // Foreign keys handle
        // Renaming from selects to avoid collisions
        
        let joins = []
        
        let selects = []

        this.foreignKeys.references.forEach((fk : ForeignKey<C, any, any>) => {
            
            let q = `LEFT JOIN ${fk.table.table_name} ON `
            let relations = []

            let renamed_columns = []

            for (const pair of fk.columns) {
                relations.push(`subquery.${pair[0]} = ${fk.table.table_name}.${pair[1]}`)

                renamed_columns.push(`${fk.table.table_name}.${pair[1]} AS ${fk.table.table_name}__${pair[1]}`)
            }

            q += relations.join(' AND ')

            joins.push(q)




            selects.push(...renamed_columns)

        } )




        
        
        


        // 

        let query = `SELECT subquery.* ${selects.length > 0 ? ', ' + selects.join(',') : ''} FROM ( SELECT *, (${casesQuery}) AS relevance FROM ${this.table_name}) subquery ${joins.join(" ")} WHERE relevance >= ${min} ORDER BY relevance DESC ${sortQuery.length > 0 ? ', ' + sortQuery.join(',') : ''} LIMIT ${options.limit || 15} OFFSET ${options.offset || 0};`


        console.log('----');
        console.log(query);
        console.log('----');        
        
        return await this._executeQuery(query)
    }

    insertJoins(){
        return this.foreignKeys
    }

    async get(pk: Record<PK[number], string>) {
        let query = "SELECT * FROM " + this.table_name + " WHERE " + this._buildPKQuery(pk)
        return await this._executeQuery(query)
    }

    _buildPKQuery(pk: Record<PK[number], string>) {
        return Object.entries(pk).map(arr => `${arr[0]} = '${arr[1]}'`).join(" AND ")
    }


    async _executeQuery(query: string, values?: string[]) {
        let [err, res] = await catchError(this.db.query(query, values))

        if (err) {

            if (err.code == "ER_BAD_DB_ERROR") {
                throw new UnknownDatabaseError()
            }
            if (err.code == "ECONNREFUSED") {
                throw new ConnectionError()
            }
            if (err.code == "ER_ACCESS_DENIED_ERROR") {
                throw new DeniedAccessDatabaseError()
            }
            if (err.code == "ER_DUP_ENTRY") {
                throw new DuplicateEntryError()
            }

            throw new Error()
        }

        db.releaseConnection(await db.getConnection())
        return res[0]

    }
}

export default Model