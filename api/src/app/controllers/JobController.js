const { Job, User } = require("../models");

class JobController {
  async store(req, res) {
    try {
      console.log("req", req.userId);
      const job = await Job.create({
        user_id: req.userId,
        ...req.body,
      });
      return res.status(201).json({ job: job });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async indexAllJobs(req, res) {
    try {
      const { page = 1 } = req.query;
      const limit = 10;

      const job = await Job.findAll({
        order: ["id"],
        attributes: ["id", "user_id", "job_description"],
        limit: limit,
        offset: (page - 1) * limit,
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "email"],
          },
        ],
      });
      return res.status(201).json({ job: job });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async indexMyJobs(req, res) {
    try {
      const { page = 1 } = req.query;
      const limit = 10;

      const job = await Job.findAll({
        where: { user_id: req.userId },
        order: ["id"],
        attributes: ["id", "user_id", "job_description"],
        limit: limit,
        offset: (page - 1) * limit,
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "email"],
          },
        ],
      });

      return res.status(201).json({ job: job });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async show(req, res) {
    try {
      const job = await Job.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "email"],
          },
        ],
      });

      return res.status(200).json({ job: job });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const job = await Job.findOne({
        where: { id: req.params.id },
      });

      if (!job) return res.status(404).json({ message: "Job not found" });

      if (req.userId != job.user_id)
        return res
          .status(400)
          .json({ error: "You are not the owner of this job" });

      await job.update({ job_description: req.body.job_description });

      return res.status(200).json({
        message: "update success",
        Job: job,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const job = await Job.findOne({
        where: { id: req.params.id },
      });

      if (!job) return res.status(404).json({ error: "Job not found" });

      if (req.userId != job.user_id)
        return res
          .status(400)
          .json({ error: "You are not the owner of this job" });

      await job.destroy();

      return res.status(200).json({ message: "Job removed." });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new JobController();
