import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import React from 'react';
import { createMajor, updateMajor } from '../../../../API/axios';
export function ModalFormMajor({ openForm, onChangeClickOpen, dataMajor, onSuccess }) {
  const handleCreateStudent = (values) => {
    createMajor(values).then((res) => {
      if (res.data?.success === true) {
        onSuccess();
        message.success('Tạo chuyên ngành mới thành công');
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
  const handleUpdateStudent = (id, values) => {
    updateMajor(id, values).then((res) => {
      if (res.data?.success === true) {
        onSuccess();
        message.success(`Sửa thông tin chuyên ngành ${dataMajor.id} thành công`);
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
        title={dataMajor.id ? 'Sửa thông tin chuyên ngành' : 'Thêm chuyên ngành'}
        initialValues={dataMajor}
        modalProps={{
          destroyOnClose: true,
          okText: dataMajor.id ? 'Lưu' : 'Tạo',
          okType: 'primary',
          cancelText: 'Hủy',
        }}
        open={openForm}
        onFinish={(values) => {
          if (dataMajor.id) {
            handleUpdateStudent(dataMajor.id, values);
          } else {
            handleCreateStudent(values);
          }
        }}
        onOpenChange={onChangeClickOpen}
      >
        <ProForm.Group>
          <ProFormText
            rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
            width='md'
            name='id'
            label='Mã chuyên ngành'
            placeholder='Nhập mã chuyên ngành. Ví dụ: CNTT'
          />
          <ProFormText
            rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
            width='md'
            name='name'
            label='Tên chuyên ngành:'
            placeholder='Nhập tên chuyên ngành. Ví dụ: Công nghệ thông tin'
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
            width='md'
            name='totalCredits'
            label='Tổng số tín chỉ tích lũy'
            placeholder='Nhập tổng số tín chỉ'
          />
        </ProForm.Group>
      </ModalForm>
    </div>
  );
}
