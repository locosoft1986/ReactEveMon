import Cache from './cache';

export default class MemoryCache extends Cache {
  constructor() {
    super();

    this._cache = {};
  }

  /**
   * Store value in cache.
   *
   * @param {String}   key      Cache key
   * @param {String}   value    Cache Value
   * @param {Number}   duration Number of seconds this cache entry will live
   * @return {Promise}
   */
  write(key, value, duration) {
    return new Promise(resolve => {
      let expireTime = this.getCurrentTime() + duration;

      this._cache[key] = {
        value: value,
        expireTime: expireTime
      };

      resolve();
    });
  }

  /**
   * Retrieve value from cache.
   *
   * @param  {String}   key Cache key
   * @param  {Function} cb  Callback
   * @return {Promise}       Cache value
   */
  read(key) {
    return new Promise(resolve => {
      let value;

      if (this._cache[key] && this.getCurrentTime() < this._cache[key].expireTime) {
        value = this._cache[key].value
      }

      resolve(value);
    });
  }
}
