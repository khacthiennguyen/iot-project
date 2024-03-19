module.exports = (mongoose) => {
    const schema = mongoose.Schema(
      {
        employeeId :String,
        employeeName : String,
        employeePhone: String,
        employeePassword: String,
        enable : Boolean,
      },
      { timestamps: true }
    );

    schema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });

    const Employee = mongoose.model("employee",schema)

    return Employee;
  };
