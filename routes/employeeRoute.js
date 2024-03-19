module.exports = app => {
    const employee = require("../controllers/employeeController")

    var router = require("express").Router();

    // Tao moi mot employee
    router.post("/", employee.create)

    //Tim tat ca employee
    router.get("/", employee.findAll)

    //Tim tat ca employee activate
    router.get("/activate", employee.findAllAcivate)

    //Tim employee with id
    router.get("/:id", employee.findOne)

    //Update employee with id
    router.put("/:id", employee.update)

    //delete employee with id
    router.delete("/:id", employee.delete)

    //delete all employee
    router.delete("/", employee.deleteAll)






    app.use('/api/employee', router);
}