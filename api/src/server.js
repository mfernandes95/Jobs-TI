const app = require("./app");
const swaggerJsDoc = require("./swagger.json");
const swaggerUi = require("swagger-ui-express");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc));

app.listen(process.env.PORT || 3333);
