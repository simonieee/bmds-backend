import Admin from './admin';
import Customer from './customer';
import Expert from './expert';
import Auth from './auth';
import Field from './field';
import CustomerField from './customer.field';
import ExpertField from './expert.field';
import Faq from './faq';
import Voucher from './voucher';
import Notice from './notice';
import File from './file';
import Schedule from './schedule';

export const routes = [
  // 사용자
  ...Admin,
  ...Customer,
  ...Expert,
  ...Auth,
  ...Field,
  ...CustomerField,
  ...ExpertField,

  // 멘토링
  ...Schedule,

  // 이용권 및 결제
  ...Voucher,

  //관리자
  ...Faq,
  ...Notice,

  //공통 모듈
  ...File,
];
