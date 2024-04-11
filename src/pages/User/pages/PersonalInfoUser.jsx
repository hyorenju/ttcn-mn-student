import { studentApi } from '@/API/Student';
import { ButtonCustom } from '@/components/Button';
import { messageErrorToSever } from '@/components/Message';
import { notificationError, notificationSuccess } from '@/components/Notification';
import {
  AreaChartOutlined,
  CarryOutOutlined,
  FileImageOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Avatar, Drawer, Space, Upload } from 'antd';
import { useState } from 'react';
import { ChartColumnBasic, ChartLiquid } from '../../Admin/components/Chart';
import { FormInfoUser } from '../components/Form/FormInfoUser';
import { DefaultLayoutPage } from '../components/Layout/DefaultLayoutPage';
import { ModalChangePassword, ModalFormChangeEmail } from '../components/ModalForm';
import { ModalStudentStatus } from '../components/Modal';

function PersonalInfoUser() {
  const dataStudentLocal = JSON.parse(localStorage.getItem('info_student'));
  const [openDrawerPoint, setOpenDrawerPoint] = useState(false);
  const [openModalFormChangePassword, setOpenModalFormChangePassword] = useState(false);
  const [openModalFormChangeEmail, setOpenModalFormChangeEmail] = useState(false);
  const [openModalStudentStatus, setOpenModalStudentStatus] = useState(false);

  const { data } = useQuery({
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
    queryKey: ['getDataPoint'],
    queryFn: async () => await studentApi.statistic(),
  });

  const uploadAvatar = useMutation({
    mutationKey: ['uploadAvatarUser'],
    mutationFn: async (file) => {
      const fileFormData = new FormData();
      fileFormData.append('file', file.file);
      return await studentApi.updateAvatar(fileFormData);
    },
    onSuccess: (res) => {
      if (res && res.success === true) {
        localStorage.setItem('info_student', JSON.stringify(res.data));
        notificationSuccess(`Upload file thành công`);
      } else messageErrorToSever(res, 'Upload file thất bại');
    },
  });

  const props = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    customRequest: (file) => uploadAvatar.mutate(file),
    beforeUpload: (file) => {
      const isSize = file.size / 1024 / 1024 < 2;
      const isPNG = file.type === 'image/jpeg' || 'image/png';
      if (!isPNG) {
        notificationError(`${file.name} không phải định dạng ảnh`);
        return false;
      }
      if (!isSize) {
        notificationError(`${file.name} không được vượt quá 2MB`);
        return false;
      }
      return true;
    },
  };

  const handleOpenChangeFormPassword = (open) => {
    if (!open) {
      setOpenModalFormChangePassword(false);
    }
  };
  const handleOpenChangeFormEmail = (open) => {
    if (!open) {
      setOpenModalFormChangeEmail(false);
    }
  };
  const handleClickUpdatePhoneNumber = () => {
    setOpenModalFormChangePassword(true);
  };
  const handleClickShowPoint = () => {
    setOpenDrawerPoint(true);
  };
  const handleClickUpdateEmail = () => {
    setOpenModalFormChangeEmail(true);
  };
  const handleClickStatusList = () => {
    setOpenModalStudentStatus(true);
  };

  return (
    <>
      <DefaultLayoutPage>
        <section className='p-4 bg-white'>
          <h1 className='lg:ml-10 xl:ml-20 pl-6 xl:pl-8 xl:mb-12 border-l-8 border-primary-color uppercase text-primary-color font-semibold text:xl lg:text-3xl xl:text-4xl mb-4'>
            Thông tin cá nhân
          </h1>
          <div className='py-8'>
            <div className='flex flex-col md:flex-row items-center gap-10'>
              <div className='w-[30%] flex flex-col items-center h-[350px] lg:h-[600px] gap-9 pb-8 md:pb-0 border-b-2 border-primary-color md:border-r-2 md:border-b-0'>
                <Avatar
                  size={{
                    xs: 100,
                    sm: 150,
                    md: 150,
                    lg: 150,
                    xl: 170,
                    xxl: 200,
                  }}
                  icon={<UserOutlined />}
                  src={dataStudentLocal?.avatar ? <img src={dataStudentLocal?.avatar} alt='avatar_student' /> : ''}
                />
                <Space direction='vertical' size={20}>
                  <div className='flex flex-col lg:flex-row gap-2'>
                    <Upload {...props}>
                      <ButtonCustom
                        loading={uploadAvatar.isLoading}
                        title='Đổi ảnh đại diện'
                        icon={<FileImageOutlined />}
                      />
                    </Upload>
                    <ButtonCustom
                      title='Đổi mật khẩu'
                      icon={<LockOutlined />}
                      handleClick={handleClickUpdatePhoneNumber}
                    />
                  </div>
                  <div className='flex flex-col lg:flex-row gap-2'>
                    <ButtonCustom title='Đổi email' icon={<MailOutlined />} handleClick={handleClickUpdateEmail} />
                    <ButtonCustom
                      handleClick={handleClickShowPoint}
                      title={'Điểm học tập'}
                      icon={<AreaChartOutlined />}
                    />
                    <ButtonCustom
                      handleClick={handleClickStatusList}
                      title={'Tình trạng'}
                      icon={<CarryOutOutlined />}
                    />
                  </div>
                </Space>
              </div>
              <div className='w-[70%] flex justify-center lg:px-16'>
                <FormInfoUser />
              </div>
            </div>
          </div>
        </section>
        <ModalChangePassword open={openModalFormChangePassword} onOpenChange={handleOpenChangeFormPassword} />
        <ModalFormChangeEmail open={openModalFormChangeEmail} onOpenChange={handleOpenChangeFormEmail} />
        <ModalStudentStatus open={openModalStudentStatus} onOpenChange={(open) => setOpenModalStudentStatus(open)} />
      </DefaultLayoutPage>
      <Drawer
        extra={<h1 className='text-black font-medium text-xl'>Điểm học tập</h1>}
        width={1400}
        open={openDrawerPoint}
        onClose={() => setOpenDrawerPoint(false)}
        placement='left'
      >
        {data && (
          <>
            <div className='flex gap-20 w-[70vw] mb-20'>
              <div className='flex-1'>
                <figure>
                  <ChartColumnBasic data={data.data?.avgPoint4List} />
                </figure>
                <figcaption className='text-center italic mt-4'>Điểm học tập hệ 4</figcaption>
              </div>
              <div className='flex-1'>
                <figure>
                  <ChartColumnBasic data={data.data?.avgPoint10List} />
                </figure>
                <figcaption className='text-center italic mt-4'>Điểm học tập hệ 10</figcaption>
              </div>
            </div>
            <div className='flex gap-20 w-[70vw]'>
              <div className='flex-1'>
                <figure>
                  <ChartColumnBasic data={data.data?.trainingPointList} />
                </figure>
                <figcaption className='text-center italic mt-4'>Điểm rèn luyện</figcaption>
              </div>
              <div className='flex-1'>
                <figure>
                  <ChartLiquid data={data.data} />
                </figure>
              </div>
            </div>
          </>
        )}
      </Drawer>
    </>
  );
}

export default PersonalInfoUser;
