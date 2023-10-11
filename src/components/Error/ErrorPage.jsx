import { Result } from 'antd';
import React from 'react';

export default function ErrorPage(props) {
  return (
    <div className='h-screen flex items-center justify-center bg-white'>
      <Result
        status='error'
        title='Submission Failed'
        subTitle='Please check and modify the following information before resubmitting.'
      ></Result>
    </div>
  );
}
