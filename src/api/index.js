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

export const routes = [
  // 사용자
  ...Customer,
  ...Expert,
  ...Auth,
  ...Field,
  ...CustomerField,
  ...ExpertField,

  // 이용권 및 결제
  ...Voucher,

  //관리자
  ...Faq,
  ...Notice,

  //공통 모듈
  ...File,
];
