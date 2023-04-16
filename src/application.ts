import express, { Application as ExApplication, Handler } from "express";
import { controllers } from "./controllers";
import { MetadataKeys } from "./utils/metadata.keys";
import { IRouter } from "./utils/handlers.decorator";

class Application {
  private readonly _instance: ExApplication;

  get instance(): ExApplication {
    return this._instance;
  }

  constructor() {
    this._instance = express();
    this._instance.use(express.json());
    this.registerRouters();
  }

  private registerRouters() {
    const info: Array<{ api: string; handler: string }> = [];

    controllers.forEach((controllerClass) => {
      const controllerInstance: { [handleName: string]: Handler } =
        new controllerClass() as any;

      const basePath: string = Reflect.getMetadata(
        MetadataKeys.BASE_PATH,
        controllerClass
      );

      const routers: IRouter[] = Reflect.getMetadata(
        MetadataKeys.ROUTERS,
        controllerClass
      );

      const exRouter = express.Router();

      routers.forEach(({ method, path, handlerName, middlewares }) => {
        exRouter[method](
          path,
          middlewares as any,
          controllerInstance[String(handlerName)].bind(controllerInstance)
        );

        info.push({
          api: `${method.toLocaleUpperCase()} ${basePath + path}`,
          handler: `${controllerClass.name}.${String(handlerName)}`,
        });
      });
      this._instance.use(basePath, exRouter);
    });

    console.table(info);
  }
}

export default new Application();
