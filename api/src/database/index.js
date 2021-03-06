import Sequelize from "sequelize";
import mongoose from "mongoose";
import databaseConfig from "../config/database";
import User from "../app/models/User";
import Employer from "../app/models/Employer";

const models = [User, Employer];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      // useUnifiedTopology: true,
    });
  }
}

export default new Database();
