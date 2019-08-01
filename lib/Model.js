import { Mongoose } from "mongoose"

export default {
    /**
     * Create new Booking in Mongodb Atlas (Only for development.)
     * This api saves the provided hotel object data into database against the schema.
     * @param {Object} booking
     * @param {Object} callback
     */
    save: (data, callback) => {
        var Obj = new NewModel(data)
        Obj.save(callback)
    },
    updateOneById: (data, id, callback) => {
        NewModel.updateOne({ _id: id }, data, callback)
    },
    /**
     * Create new Booking in Mongodb Atlas (Only for development.)
     * This api saves the provided hotel object data into database against the schema.
     * @param {Object} booking
     * @param {Object} callback
     */
    deleteAll: (callback) => {
        NewModel.remove().exec(callback)
    },
    /**
     * Create new Booking in Mongodb Atlas (Only for development.)
     * This api saves the provided hotel object data into database against the schema.
     * @param {Object} filter
     * @param {Object} callback
     */
    search: (filter, callback) => {
        NewModel.paginate(filter).then((result) => {
            callback(null, result)
        })
    }
}
