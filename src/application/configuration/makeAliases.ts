/**
 * Module dependencies
 */
import { resolve } from 'path';
import { addAlias } from 'module-alias';

/**
 * Applicationd dependencies
 */
const { NODE_ENV } = process.env;

/**
 * Constants enviroment
 */
const PRODUCTION = NODE_ENV === 'production';

/**
 * Define baseUrl based in app enviroment
 */
/* istanbul ignore next */
const baseUrl = PRODUCTION ? './build/server' : './src';

/**
 * Make aliases for run in Javascript
 */
addAlias('@application', resolve(`${baseUrl}/application`));
addAlias('@domain', resolve(`${baseUrl}/domain`));
addAlias('@api', resolve(`${baseUrl}/application/entrypoints/api`));
addAlias('@app', resolve(`${baseUrl}/application/entrypoints/app`));
addAlias('@mocks', resolve('./mocks'));