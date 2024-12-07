/**
 * Module dependencies
 */
import { resolve } from 'path';
import { addAlias } from 'module-alias';

/**
 * Make aliases for run in Javascript
 */
addAlias('@application', resolve('./src/application'));
addAlias('@domain', resolve('./src/domain'));
addAlias('@api', resolve('./src/application/entrypoints/api'));