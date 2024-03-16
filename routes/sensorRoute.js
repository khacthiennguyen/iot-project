module.exports = app => {
  const sensor = require("../controllers/sensorController");

  var router = require("express").Router();

  // Tạo mới một đối tượng cảm biến
  router.post("/", sensor.create);

  // Retrieve all Cambien
  router.get("/", sensor.findAll);

  // Retrieve all Cambien activate
  router.get("/activate", sensor.findAllActivate);

  // Retrieve a single Cambien with id
  router.get("/:id", sensor.findOne);

  // Update a Cambien with id
  router.put("/:id", sensor.update);

  // Delete a Cambien with id
  router.delete("/:id", sensor.delete);

  // Delete all Cảm biến
  router.delete("/", sensor.deleteAll);






  app.use('/api/sensor', router);
}
