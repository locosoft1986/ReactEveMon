import url from 'url';
import https from 'https';
import http from 'http';
import querystring from 'querystring';
import sax from 'sax';
import MemoryCache from './memory';

const DEFAULT_URL = 'https://api.eveonline.com';

/**
 * EVE API client.
 *
 * The following list of options are recognized:
 * <ul>
 *   <li><strong>url</strong>: Fully qualified HTTP(s) URL to EVE API server</li>
 *   <li><strong>cache</strong>: Cache object that handles persisting and retrieving results from cache</li>
 * </ul>
 *
 * @exports Client as hamster.Client
 * @param {Object} options Client options
 * @see hamster.cache.FileCache
 * @constructor
 */
export default class Client {
  constructor(options = {}) {
    this._params = {};

    this.setUrl(options.url || DEFAULT_URL);
    this.setParams(options.params || {});
    this.setCache(options.cache || new MemoryCache());
  }

  /**
   * Set server URL.
   *
   * @param {String|Object} strOrObj URL string
   */
  setUrl(urlStr) {
    this._url = url.parse(urlStr)
  }

  /**
   * Get server URL.
   *
   * @param  {Boolean}       returnUrlObj Pass true to return URL object instead of string
   * @return {String|Object}              URL string or object
   */
  getUrl(returnUrlObj) {
    return returnUrlObj ? this._url : url.format(this._url)
  }

  /**
   * Set default parameter.
   *
   * @param {String} param Parameter name
   * @param {String} value Parameter value
   */
  setParam(param, value) {
    this._params[param] = value
  }

  /**
   * Set default parameters.
   *
   * @param {object} params Parameters object
   */
  setParams(params) {
    this._params = Object.assign({}, this._params, params);
  }

  /**
   * Get default parameter.
   *
   * @param  {String} param Parameter name
   * @return {String}       Parameter value
   */
  getParam(param) {
    if (typeof this._params[param] !== 'undefined') {
      return this._params[param]
    }
  }

  /**
   * Get default parameters.
   *
   * @return {Object} Parameters object
   */
  getParams() {
    return this._params
  }

  /**
   * Clear default parameters.
   */
  clearParams() {
    this._params = {};
  }

  /**
   * Set the cache object for this client.
   *
   * The cache object is responsible for storing and retrieving cached responses.
   *
   * Any cache object implementing <tt>set(key, value, duration)</tt> and
   * <tt>get(key)</tt> methods can be used as a cache backend.
   *
   * @param {Object} cache Cache object
   */
  setCache(cache) {
    this._cache = cache
  }

  /**
   * Get cache object.
   *
   * @return {Object} Cache object
   */
  getCache() {
    return this._cache
  }

  /**
   * Gets a path name relative to the current path set with Client#setUrl().
   *
   * This method also supports a short hand syntax for path names, e.g.,
   * <tt>'server:ServerStatus'</tt> would translate to <tt>/server/ServerStatus.xml.aspx</tt>.
   *
   * @param  {String} path Relative path
   * @return {String}      Full path name
   */
  getPathName(path) {
    let basePath = this.getUrl(true).pathname.replace(/^\/*|\/*$/g, '');

    if (path[0] !== '/') {
      path = path.replace(':', '/') + '.xml.aspx';
    }
    if (basePath) {
      basePath = '/' + basePath;
    }
    return basePath + '/' + path.replace(/^\/*|\/*$/g, '');
  }

  /**
   * Get request URL with specified path and params as a URL object.
   *
   * @param  {String} path   Request path
   * @param  {Object} params Query string parameters
   * @return {Object}        URL object
   */
  getRequestUrl(path, params = {}) {
    let baseUrl = this.getUrl(true)
      , defaultParams = this.getParams();

    let mergedParams = Object.assign({}, defaultParams, params);
    let requestUrl = Object.assign({}, baseUrl);

    requestUrl.pathname = this.getPathName(path);
    requestUrl.path = requestUrl.pathname;

    if (Object.keys(mergedParams).length > 0) {
      requestUrl.search = '?' + querystring.stringify(mergedParams);
      requestUrl.path += requestUrl.search;
    }
    return requestUrl
  }

  /**
   * Takes a URL object and returns a string that will be used as the cache key
   * for the resource located at the URL.
   *
   * Currently this just returns a URL string with query string parameters sorted
   * alphabetically.
   *
   * @param  {Object} urlObj URL object
   * @return {String}        Cache key
   */
  getCacheKey(urlObj) {
    let newUrlObj = Object.assign({}, urlObj);

    if (urlObj.search) {
      let oldQuery = querystring.parse(urlObj.search.substr(1));
      let newQuery = {};
      // Reconstruct query with alphabetical key ordering
      Object.keys(oldQuery).sort().forEach(key => {
        newQuery[key] = oldQuery[key]
      });

      // Insertion order should be guaranteed.
      newUrlObj.search = '?' + querystring.stringify(newQuery);
      newUrlObj.path = newUrlObj.pathname + newUrlObj.search
    }

    return url.format(newUrlObj)
  }


  /**
   * Parses an EVE API response from either an XML string or a readable stream.
   * A callback will be invoked and passed either an error or result object.
   *
   * @param  {String|Stream} xml API response
   * @param  {Function}      cb  Result callback
   */
  parse(xml) {
    return new Promise((resolve, reject) => {
      let parser = sax.createStream(true, {trim: true})
        , result = {}
        , current = result
        , parents = []
        , currentTag
        , keys;

      parser.on('error', err => reject(err));

      parser.on('end', () => {
        if (result && result.eveapi && result.eveapi.error) {
          reject({
            error: result.eveapi.error,
            code: result.eveapi.errorCode
          });
        } else if (!result || !result.eveapi || !result.eveapi.result) {
          reject({error: 'Invalid API response structure.'})
        } else {
          if (result.eveapi.currentTime) {
            result.eveapi.result.currentTime = result.eveapi.currentTime
          }
          if (result.eveapi.cachedUntil) {
            result.eveapi.result.cachedUntil = result.eveapi.cachedUntil
          }
          resolve(result.eveapi.result);
        }
      });

      parser.on('opentag', tag => {
        currentTag = tag;
        tag.alias = tag.name;
        tag.result = current;
        parents.push(tag);

        if (tag.name === 'row') {
          current.push({...tag.attributes});
        } else {
          if (tag.name === 'rowset') {
            keys = tag.attributes.key.split(',');
            tag.alias = tag.attributes.name;

            current[tag.alias] = [];
            current = current[tag.alias];
            return;
          } else if (tag.name === 'error') {
            current.errorCode = tag.attributes.code ? tag.attributes.code : null
          }

          current[tag.alias] = {};
          current = current[tag.alias];
        }
      });

      parser.on('closetag', tagName => {
        current = parents.pop().result;
        let parentTag = parents[parents.length - 1];

        if (parentTag && parentTag.name === 'rowset') {
          keys = parentTag.attributes.key.split(',')
        }
      });

      parser.on('text', text => {
        parents[parents.length - 1].result[currentTag.name] = text
      });

      if (xml.pipe) {
        xml.pipe(parser);
      } else {
        parser.write(xml);
        parser.end();
      }
    });
  }

  /**
   * Send HTTP request to API server and parse response.
   *
   * @param  {String}   path   Request path
   * @param  {Object}   params Query string parameters
   * @return  {Promise}       Result
   */
  fetch(path, params) {
    return new Promise((resolve, reject) => {

      let options = this.getRequestUrl(path, params)
      , cacheKey = this.getCacheKey(options)
      , cache = this.getCache();

      cache.read(cacheKey).then(value => {
        if (typeof value === 'string') {
          return resolve(JSON.parse(value));
        }

        let httpObj = options.protocol === 'https:' ? https : http
          , request = httpObj.get(options);

        options.headers = {'User-Agent': 'hamster.js'};

        request.on('error', err => {
          reject(err);
        });

        request.on('response', response => {
          if (response.statusCode !== 200) {
            return reject({response, error: `Unsupported HTTP response: ${response.statusCode}`});
          } else {
            return this.parse(response).then(result => {

              let currentTime = Date.parse(result.currentTime)
                , cachedUntil = Date.parse(result.cachedUntil)
                , duration = cachedUntil - currentTime;

              console.log(result)
              return cache.write(cacheKey, JSON.stringify(result), duration).then(() => resolve(result));
            });

          }
        })
      })
    });

  }
}