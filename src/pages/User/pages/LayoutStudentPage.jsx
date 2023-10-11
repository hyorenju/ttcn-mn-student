import { FormOutlined, HomeOutlined, InfoCircleOutlined, SolutionOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Footer } from '../components/Layout/Footer';

function LayoutPageStudent(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const studentId = location.pathname.split('/')[2];
  const addIcon = () => {
    if (location.pathname === `/student/${studentId}/infor`) {
      return '2';
    }
    if (location.pathname === `/student/${studentId}/points`) {
      return '3';
    }
    if (location.pathname === `/student/${studentId}/declare`) {
      return '4';
    }
    if (location.pathname === `/student/${studentId}`) {
      return '1';
    } else return '0';
  };
  const items = [
    {
      key: '1',
      icon: <HomeOutlined style={{ fontSize: '16px' }} />,
      label: 'Trang chủ',
      onClick: () => {
        navigate(`/student/${studentId}`);
      },
    },
    {
      key: '2',
      icon: <SolutionOutlined style={{ fontSize: '16px' }} />,
      label: 'Thông tin cá nhân',
      onClick: () => {
        navigate(`/student/${studentId}/infor`);
      },
    },
    {
      key: '3',
      icon: <InfoCircleOutlined style={{ fontSize: '16px' }} />,
      label: 'Điểm',
      onClick: () => {
        navigate(`/student/${studentId}/points`);
      },
    },
    {
      key: '4',
      icon: <FormOutlined style={{ fontSize: '16px' }} />,
      label: 'Cập nhật thông tin',
      onClick: () => {
        navigate(`/student/${studentId}/declare`);
      },
    },
  ];
  return (
    <div>
      <div>
        <div className='bg-orange-400 h-[46px]'>
          <div className='w-[1100px] mx-auto'>
            <Menu
              triggerSubMenuAction={'click'}
              style={{ fontSize: '18px', textTransform: 'uppercase', color: 'white' }}
              mode='horizontal'
              defaultSelectedKeys={[addIcon()]}
              items={items}
              className='bg-orange-400 flex justify-around'
            />
          </div>
        </div>
      </div>
      <div className='bg-slate-200 '>
        <div className='max-w-[1100px] mx-auto bg-slate-100 pb-8 min-h-[90vh]'>
          <Outlet />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default LayoutPageStudent;
