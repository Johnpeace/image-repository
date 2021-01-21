import {uploadOne} from "../controllers/image-controller";
import { uploadImageMiddleware } from "../middlewares/image-middleware";

const Route = (router) => {
  router.post("/upload", uploadOne);
  return router;
};

export default Route;
