import { md5 } from 'js-md5';

const PASSWORD = 'Valantis';
const timestamp =new Date().toISOString().slice(0, 10).replace(/-/g,'');

const string = `${PASSWORD}_${timestamp}`
const xAuth = md5(string)

export const URL_FIRST ='http://api.valantis.store:40000/';
export const URL_SECOND ='https://api.valantis.store:41000/';

export const headers = {
  'X-Auth': xAuth,
  'Content-Type': 'application/json'
};