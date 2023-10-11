import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { message, notification } from 'antd';
import React from 'react';
import { createCourse, updateCourse } from '../../../../API/axios';
export function ModalFormCourse({ openForm, onChangeClickOpen, dataCourse, onSuccess }) {
  const handleCreateCourse = (values) => {
    createCourse(values).then((res) => {
      if (res.data?.success === true) {
        onSuccess();
        message.success({
          message: 'Thành công',
          duration: 2,
          description: `Tạo khóa ${values.id} thành công`,
        });
      } else if (res.data?.error?.code === 2) {
        // eslint-disable-next-line no-lone-blocks
        {
          res.data?.error?.errorDetailList.forEach((e) => message.error(e.message));
        }
      } else if (res.data?.error?.code === 500) {
        message.error(res.data?.error?.message);
      } else if (res.data?.error?.message === 'Access is denied') {
        message.warning('Bạn không có quyền truy cập');
      }
    });
  };
  const handleUpdateCourse = (id, values) => {
    updateCourse(id, values).then((res) => {
      if (res.data?.success === true) {
        onSuccess();
        notification.success({
          message: 'Thành công',
          description: `Sửa thông tin khóa ${id} thành công`,
          duration: 2,
        });
      } else if (res.data?.error?.code === 2) {
        // eslint-disable-next-line no-lone-blocks
        {
          res.data?.error?.errorDetailList.forEach((e) => message.error(e.message));
        }
      } else if (res.data?.error?.code === 500) {
        message.error(res.data?.error?.message);
      }
    });
  };

  return (
    <div>
      <ModalForm
        width={750}
        title={dataCourse.id ? 'Cập nhật thông tin khóa' : 'Thêm khóa'}
        initialValues={dataCourse}
        modalProps={{
          destroyOnClose: true,
          okText: dataCourse.id ? 'Cập nhật' : 'Tạo',
          okType: 'primary',
          cancelText: 'Hủy',
        }}
        open={openForm}
        onFinish={(value) => {
          if (dataCourse.id) {
            handleUpdateCourse(dataCourse.id, value);
          } else {
            handleCreateCourse(value);
          }
        }}
        onOpenChange={onChangeClickOpen}
      >
        <ProForm.Group>
          <ProFormText
            rules={[
              { required: true, message: 'Vui lòng nhập đầy đủ Thông tin' },
              { pattern: '^K[0-9]+', message: 'Mã khóa bắt đầu bằng chữ K viết hoa' },
              {
                min: 1,
                max: 5,
                message: 'Vượt quá số kí tự',
              },
            ]}
            width='md'
            name='id'
            label='Mã khóa'
            placeholder='Nhập mã khóa học, ví dụ: K65'
          />
        </ProForm.Group>
      </ModalForm>
    </div>
  );
}
