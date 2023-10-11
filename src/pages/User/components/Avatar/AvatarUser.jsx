import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

export function AvatarUser(props) {
  return (
    <div>
      <Avatar
        className='flex justify-center items-center'
        size={{
          xs: 38,
          sm: 40,
          md: 50,
          lg: 52,
          xl: 55,
          xxl: 60,
        }}
        icon={<UserOutlined />}
      />
    </div>
  );
}
