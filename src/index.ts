import { app } from "./config/koa";
import { connect } from "./config/mongoose";
import { logger } from "./config/winston";

const mongodbUri = process.env.MONGODB_URI;
connect(mongodbUri).then(() => {
    const port = process.env.PORT || 3000;
    return app.listen(port, () => {
        logger.info(`Server running on port ${port}`);
    });
}).catch(err => logger.error(err));