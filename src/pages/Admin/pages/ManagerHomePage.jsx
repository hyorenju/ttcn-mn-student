import AdminPage from '@/assets/img/Logo/AdminPage.svg';
import { Image, Result } from 'antd';

function ManagerHomePage() {
  return (
    <div className='flex justify-center items-center'>
      <Result
        status='success'
        title='Đăng nhập thành công !'
        subTitle='Chào mừng bạn đến với website quản lí sinh viên của khoa Công Nghệ Thông Tin'
        icon={<Image src={AdminPage} preview={false} width={600} />}
      />
    </div>
  );
}

export default ManagerHomePage;
