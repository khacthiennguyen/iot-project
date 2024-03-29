
const db = require("../models");
const Sensor = db.sensor;
//Bổ sung thêm ngày
const moment = require("moment");
moment.locale("vi");

// Create and Save a new Cambien
exports.create = (req, res) => {
  // Validate request
  if (!req.body.temperature) {
    res.status(400).send({ message: "Nhiệt độ không thể rỗng!" });
    return;
  }

  // Tạo 1 đối tượng cảm biến
  const sensor = new Sensor({
    day: req.body.day,
    time:req.body.time,
    temperature: req.body.temperature,
    humidity: req.body.humidity,
    location: req.body.location,
    enable: true,
  });

  // Save đối tượng cảm biến đó vào trong db
  sensor
    .save(sensor)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Đã có lỗi xảy ra khi lưu dữ liệu vào bảng Sensor",
      });
    });
};

//Retrieve all Cảm biến/ find by receive day from the database
exports.findAll = (req, res) => {
  const day = req.query.day;
  var condition = day ? { day: { $regex: new RegExp(day), $options: "i" } } : {};
  //{
  //  ngaynhan: '12/05/2023'  
  //  }
  Sensor.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Có lỗi trong khi tìm ngày nhận",
      });
    });
};


exports.findAllActivate = (req, res) => {
  const day = req.query.day;
  var condition = day ? { day: { $regex: new RegExp(day), $options: "i" }, enable: true } : { enable: true };
  Sensor.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Có lỗi trong khi tìm ngày nhận",
      });
    });
};


//Retrieve a single object
//Find a single CamBien with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Sensor.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Sensor with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Sensor with id=" + id });
    });
};

//Update an object
//Update a CamBien identified by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Sensor.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Sensor with id=${id}. Maybe CamBien was not found!`,
        });
      } else res.send({ message: "Sensor was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Sensor with id=" + id,
      });
    });
};

//Delete an object
//Delete a Cambien with the specified id
exports.delete = (req, res) => {
  const id = req.params.id;

  Sensor.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Cambien with id=${id}. Maybe Sensor was not found!`,
        });
      } else {
        res.send({
          message: "Sensor was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Sensor with id=" + id,
      });
    });
};

//Delete all objects
//Delete all Cambien from the database
exports.deleteAll = (req, res) => {
  Sensor.deleteMany({})
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

