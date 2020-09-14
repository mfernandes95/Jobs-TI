const { User } = require("../models");

class UserController {
  async verifyEmail(req, res) {
    try {
      const userExists = await User.findOne({
        where: { email: req.body.email },
      });
      if (userExists) return res.status(200).json({ ok: true });
      if (!userExists) return res.status(200).json({ ok: false });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  // async store(req, res) {
  //   try {
  //     const userExists = await User.findOne({
  //       where: { email: req.body.email },
  //     });
  //     if (userExists)
  //       return res.status(400).json({ error: "user already exists!" });
  //     const user = await User.create(req.body);
  //     return res.status(201).json({ user: user });
  //   } catch (error) {
  //     return res.status(400).json({ message: error.message });
  //   }
  // }
}

module.exports = new UserController();
