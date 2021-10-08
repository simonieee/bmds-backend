import Customer from './customer';
import Expert from './expert';
import Auth from './auth';
import Field from './field';
import Faq from './faq';
import Voucher from './voucher';
import Notice from './notice';
import File from './file';

export const routes = [
  ...Customer,
  ...Expert,
  ...Auth,
  ...Field,
  ...Faq,
  ...Voucher,
  ...Notice,
  ...File,
];
