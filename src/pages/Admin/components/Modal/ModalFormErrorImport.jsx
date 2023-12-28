import { adminDisplayApi } from '@/API/admin/adminDisplayApi';
import { ButtonCustom } from '@/components/Button';
import { messageErrorToSever } from '@/components/Message';
import { notificationError, notificationSuccess } from '@/components/Notification';
import { ModalForm, ProForm, ProFormText, ProFormTextArea, ProFormUploadButton } from '@ant-design/pro-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Space } from 'antd';
import { useState } from 'react';

export function ModalFormErrorImport({ dataForm, openForm, onChangeClickOpen }) {
  const [urlImage, setUrlImage] = useState('');
  const queryClient = useQueryClient();
  const handleClickSubmit = (props) => {
    props.submit();
  };
  const handleClickCancel = () => {
    onChangeClickOpen(false);
  };
  const filePropUpload = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    customRequest: (file) => handleUploadImg.mutate(file),
    beforeUpload: (file) => {
      const checkSize = file.size / 1024 / 1024 < 2;
      const isIMG = file.type === 'image/png';
      if (!isIMG) {
        notificationError(`${file.name} không phải định dạng ảnh`);
        return false;
      }
      if (!checkSize) {
        notificationError(`File tải lên không được quá 2MB`);
        return false;
      }
      return true;
    },
  };
  const transFormUploadBtn = () => {
    return {
      img: urlImage || dataForm.img || '',
    };
  };
  const handleUploadImg = useMutation({
    mutationKey: ['uploadImg'],
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append('file', file.file);
      return await adminDisplayApi.uploadImgImport(formData);
    },
    onSuccess: (res) => {
      if (res && res.success === true) {
        setUrlImage(res.data);
        notificationSuccess('Tải ảnh thành công');
      } else messageErrorToSever(res, 'Tải ảnh thất bại');
    },
  });
  const handleUpdateDisplay = useMutation({
    mutationKey: ['upadteDisplay'],
    mutationFn: async (values) => await adminDisplayApi.updateDisplayImport(dataForm.id, values),
    onSuccess: (res) => {
      if (res && res.success === true) {
        notificationSuccess('Cập nhật thành công');
        onChangeClickOpen(false);
        queryClient.invalidateQueries({
          queryKey: ['listErrorList'],
        });
      } else messageErrorToSever(res, 'Cập nhật thất bại');
    },
  });
  const onFinish = (values) => {
    handleUpdateDisplay.mutate(values);
  };
  return (
    <div>
      <ModalForm
        width={700}
        title={'Tin tức'}
        initialValues={dataForm}
        modalProps={{
          destroyOnClose: true,
          maskClosable: false,
        }}
        submitter={{
          render: (props) => [
            <Space>
              <ButtonCustom
                type='primary'
                loading={handleUpdateDisplay.isLoading}
                handleClick={() => handleClickSubmit(props)}
                title={'Cập nhật'}
              />
              <ButtonCustom title='Hủy' handleClick={handleClickCancel} />
            </Space>,
          ],
        }}
        open={openForm}
        onFinish={onFinish}
        onOpenChange={onChangeClickOpen}
      >
        <ProForm.Group>
          <ProFormText
            rules={[{ required: true, message: 'Không thể để trống' }]}
            width='md'
            name='title'
            label='Tên tiêu đề'
            placeholder='Nhập tên tiêu đề'
          />
          <ProFormUploadButton
            fileList={[]}
            name='img'
            fieldProps={filePropUpload}
            transform={transFormUploadBtn}
            label='Ảnh tiêu đề'
            title='Chọn ảnh tải lên'
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormTextArea label='Nội dung' name='content' width='lg' placeholder='Nhập nội dung' />
        </ProForm.Group>
      </ModalForm>
    </div>
  );
}
