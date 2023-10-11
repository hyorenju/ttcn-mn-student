import { Result } from 'antd';
import React from 'react';
import { ButtonCustom } from '../Button';

export function NotFound(props) {
  return (
    <div>
      <Result
        status='404'
        title='404'
        subTitle='Xin lỗi. Không tìm thấy trang'
        extra={<ButtonCustom type='primary' title='Quay lại trang chủ'></ButtonCustom>}
      />
    </div>
  );
}
