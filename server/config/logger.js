import { configure, getLogger } from 'log4js';
import config from '../../log-config.json';

configure(config);

const iLogger = getLogger('info');
const eLogger = getLogger('error');

export { iLogger, eLogger };
