const { User } = require("../models");
const { Car } = require("../models");

class CarController {
  async store(req, res) {
    try {
      const data = req.body;
      const car = await Car.create({
        ...data,
        user_id: req.userId,
      });
      return res.status(201).json({ car: car });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async index(req, res) {
    try {
      const { page = 1 } = req.query;

      const limit = 2;

      const cars = await Car.findAll({
        where: { user_id: req.userId },
        order: ["id"],
        attributes: ["id", "brand", "model", "year", "fuel", "color", "price"],
        limit: limit,
        offset: (page - 1) * limit,
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "name", "email"],
          },
        ],
      });

      return res.status(200).json({ car: cars });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async show(req, res) {
    try {
      const car = await Car.findOne({
        where: { id: req.params.id },
      });

      if (!car) return res.status(404).json({ message: "Car not found" });

      return res.status(200).json({ car: car });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const car = await Car.findOne({
        where: { id: req.params.id },
      });

      if (!car) return res.status(404).json({ message: "Car not found" });

      await car.update(req.body);

      return res.status(200).json({
        message: "update success",
        car: car,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const car = await Car.findOne({
        where: { id: req.params.id },
      });

      if (!car) return res.status(404).json({ error: "Car not found" });

      await car.destroy();

      return res.status(200).json({ message: "Car removed." });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new CarController();
