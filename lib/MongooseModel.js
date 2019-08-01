var schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true,
        excel: {
            name: "Name"
        }
    }
})
schema.plugin(MongoPaging.mongoosePlugin)
export default mongoose.model("NewMongooseModel", schema)
