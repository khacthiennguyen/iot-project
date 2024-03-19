const db = require("../models");
const Employee = db.employee;

exports.create = (req, res) => {
  if (!req.body.employeeId) {
    res.status(400).send({ message: "Id Employee khong duoc trong" });
    return;
  }
  if (!req.body.employeeName) {
    res.status(400).send({ message: "employeeName khong duoc trong" });
    return;
  }
  if (!req.body.employeePassword) {
    res.status(400).send({ message: "employeePassword khong duoc trong" });
    return;
  }


  const employee = new Employee({
    employeeId: req.body.employeeId,
    employeeName: req.body.employeeName,
    employeePhone: req.body.employeePhone,
    employeePassword: req.body.employeePassword,
    enable: true,
  })

  employee
    .save(employee)
    .then((data) => {
      res.status(201).send(data)
    })
    .catch((error) => {
      res.status(500).send({
        message:
          err.message || "Đã có lỗi xảy ra khi lưu dữ liệu vào bảng Employee",
      });
    })

}


//Find all Employee
exports.findAll = (req, res) => {
  // const day = req.query.day;
  // var condition = day ? { day: { $regex: new RegExp(day), $options: "i" } } : {};
  Employee.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Có lỗi trong khi tìm Tat ca Employee",
      });
    });
};

//Find all Employee Activate
exports.findAllAcivate = (req, res) => {
  Employee.find({ enable: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Có lỗi trong khi tìm Tat ca Employee Activate",
      });
    });
};


//Find a single Employee with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Employee.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Employee with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Sensor with id=" + id });
    });
};


//Update a Employee identified by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Employee.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Employee with id=${id}. Maybe Employee was not found!`,
        });
      } else res.send({ message: "Employee was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Employee with id=" + id,
      });
    });
};

//Delete a Employee with the specified id
exports.delete = (req, res) => {
  const id = req.params.id;
  Employee.findOneAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`,
        });
      } else {
        res.send({
          message: "Employe was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Employee with id=" + id,
      });
    });
};


//Delete all Employee from the database
exports.deleteAll = (req, res) => {
  Employee.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Sensor were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all sensor.",
      });
    });
};






