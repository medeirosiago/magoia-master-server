/**
 * Module dependencies
 */
import { resolve } from "path";
import { addAlias } from "module-alias";

/**
 * Make aliases for run in Javascript
 */
addAlias("@app", resolve("./src/app"));
addAlias("@domain", resolve("./src/domain"));
addAlias("@api", resolve("./src/application/entrypoints/api"));
