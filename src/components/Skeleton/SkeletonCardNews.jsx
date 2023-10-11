import { Skeleton } from 'antd';
import React from 'react';

function SkeletonCardNews(props) {
  return (
    <div className='bg-white flex flex-row gap-3'>
      <Skeleton.Image
        style={{
          width: 150,
          height: 150,
        }}
        active
      />
      <Skeleton
        active
        title={{
          width: 300,
        }}
        paragraph={{
          rows: 3,
          width: [300, 300, 300],
        }}
      />
    </div>
  );
}

export default SkeletonCardNews;
