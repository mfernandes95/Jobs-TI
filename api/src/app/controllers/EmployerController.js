const { Employer, User } = require("../models");

class EmployerController {
  async store(req, res) {
    try {
      const userExists = await User.findOne({
        where: { email: req.body.email },
      });

      if (userExists)
        return res.status(400).json({ error: "user already exists!" });

      const user = await User.create(req.body);

      const employer = await Employer.create({
        user_id: user.id,
        ...req.body,
      });
      return res.status(201).json({ employer: employer });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async show(req, res) {
    try {
      console.log("reqq", req.userId);
      const employee = await Employer.findOne({
        where: { id: req.userId },
        // order: ["id"],
        // attributes: ["id", "brand", "model", "year", "fuel", "color", "price"],
        // limit: limit,
        // offset: (page - 1) * limit,
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "name", "email"],
          },
        ],
      });

      console.log(employee);

      return res.status(200).json({ employee: employee });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new EmployerController();
