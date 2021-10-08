/**
 * S3Manager
 * --
 * 파일관리 객체
 *
 */
import AWS from 'aws-sdk';
import { logger } from './winstonLogger';
import storage from '../config/StorageConfig';
import FileType from 'file-type';
import { v4 } from 'uuid';

const { BUCKET_NAME, REGION, ACCESS_KEY, SECRET_ACCESS_KEY } = storage;

export default class S3Manager {
  /**
   * 생성자
   */
  constructor() {
    // 싱글톤으로 생성
    this.bucketName = BUCKET_NAME;
    AWS.config.update({
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY,
      region: REGION,
    });
    this.S3 = new AWS.S3({ apiVersion: '2006-03-01' });
  }

  /**
   * REVIEW
   * 업로드
   * --
   */
  async upload(folderName, file, callback = null, errorHandller = null) {
    // 키 생성
    const fileType = await FileType.fromBuffer(file);
    const { mime } = fileType;
    const guid = v4();
    const params = {
      Bucket: BUCKET_NAME,
      ACL: 'public-read',
      Key: `${folderName}/${guid}`,
      Body: file,
      ContentType: mime,
      // ContentType: 'image/png',
    };

    // S3로 업로드
    this.S3.upload(params, (uploadError, data) => {
      if (uploadError) {
        logger.error(`[S3Manager][upload] Error: ${uploadError.message}`);
        if (errorHandller) {
          errorHandller(uploadError);
        } else {
          return null;
        }
      } else {
        // return folderName;
        if (callback) {
          return callback(params.Key);
        }
      }
    });
  } // close func

  /**
   * 멀티업로드
   * --
   */
  uploads(
    folderName = 'upload',
    files = [],
    callback = null,
    errorHandller = null
  ) {
    if (files.length < 1) {
      return null;
    }

    try {
      const filesLength = files.length - 1;
      let result = [];

      // 파일목록 반복
      files.forEach((file, index) => {
        this.upload(
          folderName,
          file.buffer,
          // 성공콜백
          (f) => {
            result.push(f);
            // 업로드 완료시
            if (filesLength === index) {
              if (callback) {
                callback(result);
              } else {
                return result;
              }
            }
          },
          // 에러핸들러
          (err) => {
            if (errorHandller) {
              errorHandller(err);
            } else {
              return err;
            }
          }
        ); // upload
      }); // forEach
    } catch (err) {
      logger.error(`[S3Manager][uploads] Error: ${uploadError.message}`);
      throw new Error(err);
    }
  }

  /**
   *
   */
  deleteObject(Key, successHandller = null, errorHandller = null) {
    const params = {
      Bucket: 'store.dsu2020.com',
      Key,
    };

    // 삭제로직
    this.S3.deleteObject(params, (err, data) => {
      if (err) {
        if (errorHandller) errorHandller(err);
        else return err;
      } else {
        if (successHandller) successHandller(data);
        else return data;
      }
    });
  }

  /**
   *
   */
  deleteObjects(keys = [], successHandller = null, errorHandller = null) {
    const params = {
      Bucket: 'store.dsu2020.com',
      Delete: {
        Objects: keys,
        Quiet: false,
      },
    };

    // 삭제로직
    this.S3.deleteObjects(params, (err, data) => {
      if (err) {
        if (errorHandller) errorHandller(err);
        else return err;
      } else {
        if (successHandller) successHandller(data);
        else return data;
      }
    });
  }

  /**
   *
   */
  createFolder(folderName, file, callback = null) {
    const guid = guidGenerator();
    this.S3.upload(
      {
        Bucket: BUCKET,
        Key: `${folderName}/${guid}`,
        Body: file,
      },
      (err2, data) => {
        if (err2) {
          console.log(`[AWS][s3.getObject] Error: `, err2);
          return null;
        } else {
          if (callback) {
            return callback(folderName);
          }
        }
      }
    );
  } // close func

  /**
   * REVIEW
   * 업로드 프로미스
   * --
   */
  async _upload(folderName, file) {
    return await new Promise(async (resolove, reject) => {
      // 키 생성
      const { mimetype, buffer } = file;
      const guid = v4();
      const params = {
        Bucket: BUCKET_NAME,
        ACL: 'public-read',
        Key: `${folderName}/${guid}`,
        Body: buffer,
        ContentType: mimetype,
      };

      // S3로 업로드
      this.S3.upload(params, (uploadError, data) => {
        if (uploadError) {
          reject(uploadError);
          logger.error(`[S3Manager][_upload] Error: ${uploadError.message}`);
        } else {
          resolove(data);
        }
      });
    });
  } // close func

  /**
   * REVIEW
   * 멀티 업로드 프로미스
   * --
   */
  async _multiUpload(folderName, files) {
    return await new Promise(async (resolove, reject) => {
      try {
        if (files.length === 0) {
          return false;
        }
        const uploadPromise = files.map(async (item) => {
          const uploadResult = await this._upload(folderName, item);
          return uploadResult;
        });

        const result = await Promise.all(uploadPromise);

        resolove(result);
      } catch (error) {
        logger.error(`[S3Manager][_multiUpload] Error: ${uploadError.message}`);
        reject(error);
      }
    });
  }
}
