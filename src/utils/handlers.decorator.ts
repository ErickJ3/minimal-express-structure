import { RequestHandler } from "express";
import { MetadataKeys } from "./metadata.keys";

export enum Methods {
  GET = "get",
  POST = "post",
}

export interface IRouter {
  method: Methods;
  path: string;
  handlerName: string | symbol;
  middlewares?: Function[]
}

const methodDecoratorFactory = (method: Methods) => {
  return (path?: string, middlewares?:  Function[]): MethodDecorator => {
    return (target, propertyKey) => {
      const controllerClass = target.constructor;
      const routers: IRouter[] = Reflect.hasMetadata(
        MetadataKeys.ROUTERS,
        controllerClass
      )
        ? Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass)
        : [];
      routers.push({
        method,
        path: path ? path : "",
        middlewares: middlewares,
        handlerName: propertyKey,
      });
      Reflect.defineMetadata(MetadataKeys.ROUTERS, routers, controllerClass);
    };
  };
};

export const Get = methodDecoratorFactory(Methods.GET);
export const Post = methodDecoratorFactory(Methods.POST);
