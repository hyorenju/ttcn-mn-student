import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { message, notification } from 'antd';
import React from 'react';
import { createSemester } from '../../../../API/axios';

export function ModalFormTerm({ openForm, onChangeClickOpen, dataTerm, onSuccess }) {
  const handleCreateTerm = (values) => {
    createSemester(values).then((res) => {
      if (res.data?.success === true) {
        onSuccess();
        notification.success({
          message: 'Thành công',
          description: 'Tạo học kỳ mới thành công',
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
        title={dataTerm.id ? 'Sửa thông tin kỳ học' : 'Thêm kì học mới'}
        initialValues={dataTerm}
        modalProps={{
          destroyOnClose: true,
          okText: dataTerm.id ? 'Cập nhật' : 'Tạo',
          cancelText: 'Hủy',
        }}
        open={openForm}
        onFinish={(value) => {
          if (dataTerm.id) {
            // handleUpdateTerm(dataTerm.id, value);
          } else {
            handleCreateTerm(value);
          }
        }}
        onOpenChange={onChangeClickOpen}
      >
        <ProForm.Group>
          <ProFormText
            rules={[
              { required: true, message: 'Vui lòng nhập đầy đủ thông tin' },
              { pattern: '[0-9]{4}[1-2]', message: 'Mã học kỳ có dạng năm + học kỳ' },
              { min: 5, max: 5, message: 'Mã học kỳ chỉ dài 5 kí tự số' },
            ]}
            width='md'
            name='id'
            label='Mã học kì'
            placeholder='Nhập mã học kì, ví dụ: 20201'
          />
        </ProForm.Group>
      </ModalForm>
    </div>
  );
}
