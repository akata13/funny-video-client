import React from 'react';
import { sumBy } from 'lodash';
import cx from 'classnames';
import moment from 'moment';

export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const renderStatus = (status, label) => {
  const className = status
    ? `badge-${`${status}`.replace(/\s+/g, '-').toLowerCase()}`
    : '';
  return (
    <span className={cx('badge', 'badge-primary', className)}>{label}</span>
  );
};

export const renderDate = (date) =>
  date ? moment(date).format('DD-MM-YYYY') : '';

export const renderDateTime = (date) =>
  date ? (
    <div>
      {moment(date).format('DD-MM-YYYY')}
      <br />
      {moment(date).format('HH:mm:ss')}
    </div>
  ) : (
    ''
  );

export const renderCustomerInfo = (customer) => {
  return customer ? (
    <div>
      <p>
        <b>{customer.name}</b>
      </p>
      <p>
        <em title="Phone">
          <i className="zmdi zmdi-phone" /> {customer.phone}
        </em>
      </p>
    </div>
  ) : (
    false
  );
};

export const renderUserInfo = (user) => {
  return user ? (
    <div>
      <p>
        <b>{user.name}</b>
      </p>
      <p>
        <em>
          <i className="fa fa-user-md" /> {user.role}
        </em>
      </p>
    </div>
  ) : (
    false
  );
};

export const renderMoney = (price) => {
  // return Number(price).toLocaleString("vi-VN");
  return !!Number(price) ? Number(price).toLocaleString('vi-VN') : price;
};

export const renderTotal = (orderItems) => {
  return sumBy(
    orderItems,
    (orderItem) => (orderItem.price - orderItem.discount) * orderItem.quantity
  ).toLocaleString('vi-VN');
};

export const renderNumberFixed = (number, fixed = 2) =>
  number && !isNaN(number) ? Number(number).toFixed(fixed) : 0;

export const renderNameIcon = (name) => {
  if (!name.trim()) return 'NN';
  var matches = (name.trim() || '').match(/\b(\w)/g);
  var acronym = matches.join('');
  return acronym.slice(-2).toUpperCase();
};

export const getIOSNotch = (height) => {
  return [812, 896, 844, 926].indexOf(height) >= 0 ? 44 : 20;
};

export const numberFormat = (num, hide) => {
  const value = num.toFixed(0);
  const rs = value.replace(/(?=(\d{3})+(?!\d))/g, '.');
  return hide ? rs.replace(/[0-9\.]/g, '*') : rs;
};
