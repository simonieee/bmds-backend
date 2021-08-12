import '../config/env';
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { routes } from './api';
import { logger, stream } from './utils/winstonLogger';
import session from 'cookie-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';

import models from './models';

var app = express();

dotenv.config();

//로그 컬러
const errMessageColor = '\x1b[33m%s\x1b[0m';

// 시퀄라이즈 모델 설정
if (process.env.DB_SYNC && process.env.DB_SYNC === 'true') {
  models.sequelize
    .sync()
    .then(() => {
      console.log('Sequelize Success');
    })
    .catch((err) => {
      console.log('Sequelize Error : ', err);
    });
}

// 요청 방어
app.disable('x-powered-by');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 크로스 오리진 설정
app.use(cors());

// Session, Cookie 설정
const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
app.use(
  session({
    name: 'session',
    keys: ['key1', 'key2'],
    cookie: {
      secure: true,
      httpOnly: true,
      expires: expiryDate,
    },
  })
);

//파일 업로드 설정
const upload = multer({
  storage: multer.memoryStorage(),
});

// 로그 설정
app.use(morgan('combined', { stream }));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// 라우터 설정
routes.forEach((route) => {
  if (route.file)
    app[route.method](
      route.path,
      [
        ...route.middleware,
        route.file === 'single'
          ? upload.single('file')
          : upload.array('files', 10),
      ],
      route.controller
    );
  else app[route.method](route.path, [...route.middleware], route.controller);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  if (err) {
    logger.error(`[Global error handler] Error: ${err.message}`);
    if (process.env.NODE_ENV !== 'production') {
      console.log(errMessageColor, '----------------------------------------');
      console.log('Error Message: \x1b[33m%s\x1b[0m', err.message);
      console.log(errMessageColor, '----------------------------------------');

      /* 에러메시지 전체보기를 하려면 아래코드 주석해제 */
      // console.log('Error : ', err);
    }
  }
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    error: err,
  });
});

module.exports = app;
