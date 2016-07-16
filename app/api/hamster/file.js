import Cache from './cache';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export default class FileCache extends Cache {
  constructor() {
    super();

    let tmpDir = process.env.TMPDIR || process.env.TEMP || '/tmp';
    options = options || {}

    this.setPath(options.path || path.join(tmpDir, 'hamster-cache'));
    this.setPrefix(options.prefix || '');
  }

  setPath(p) {
    this._path = p;
  }

  getPath() {
    return this._path;
  }

  setPrefix(prefix) {
    this._prefix = prefix;
  }

  getPrefix() {
    return this._prefix;
  }

  getFilePath() {
    let hash = crypto.createHash('sha1')
      , sha1 = hash.update(key).digest('hex')
      , file = this.getPrefix() + sha1;

    return path.join(this.getPath(), sha1.substr(0, 2), sha1.substr(2, 2), file)
  }

  clear() {
    return new Promise((resolve, reject) => {
      let dir = this.getPath();
      fs.readdir(dir, (err, files) => {
        if (err) {
          reject(err);
        }

        if (!files.length) {
          return resolve(null)
        }

        let remaining = files.length;
        let removeDir = () => {
          if (!(--remaining)) {
            if (this.getPath() === dir) {
              return resolve(null)
            }

            fs.rmdir(dir, function () {
              resolve(null)
            })
          }
        };

        files.forEach(file => {
          file = path.join(dir, file);

          fs.stat(file, (err, stats) => {
            if (err) {
              reject(err);
            }

            if (stats.isDirectory()) {
              clearDir(file, (err) => {
                if (err) {
                  reject(err);
                }
                fs.rmdir(file, removeDir)
              })
            } else {
              fs.unlink(file, removeDir)
            }
          })
        })
      })
    });
  }
}