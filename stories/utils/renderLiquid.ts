import { Template } from "liquidjs";
import { unflatten } from "flat";
import defaultSettings from "./defaultSettings";

export interface Args {
  [key: string]: any;
}

function renderLiquid(engine: any, template: Template[], args: Args): string {
  let str = JSON.stringify(args);
  str = str.replace(/shopify:\/\/shop_images\//g, "https://cdn.shopify.com/s/files/1/0046/5069/6817/files/");
  args = JSON.parse(str);

  args = { 
    ...args,
    ...defaultSettings
  }

  const unflattenedArgs = unflatten(args);

  return engine.renderSync(template, unflattenedArgs);
}

export default renderLiquid;