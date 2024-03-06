const { default: mongoose } = require("mongoose");

module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            day: String,
            time: String,
            temperature: String,
            humidity: String,
            location: String

        },
        { timestamps: true }
    );


    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });


    const Sensor = mongoose.model("sensor", schema);

    return Sensor

}