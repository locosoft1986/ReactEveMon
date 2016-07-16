import Client from './client';
import Cache from './cache';
import FileCache from './file';
import MemoryCache from './memory';

/**
 * @namespace
 */
let hamster = new Client();


export default {hamster, Cache, FileCache, MemoryCache};