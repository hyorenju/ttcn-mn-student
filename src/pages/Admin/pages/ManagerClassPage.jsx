import { DeleteOutlined, EditOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Input, Popconfirm, Space, Table, Tooltip, Typography } from 'antd';
import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { adminClassApi } from '../../../API/admin/adminClassApi';
import { deleteClass } from '../../../API/axios';
import { ButtonCustom } from '../../../components/Button/ButtonCustom';
import { notificationSuccess } from '../../../components/Notification';
import { ModalFormClass } from '../components/Modal';

function ManagerClassPage(props) {
  const { Title } = Typography;
  const [openModalForm, setOpenModalForm] = useState(false);
  const [dataClass, setDataClass] = useState({});
  const [valueSearchClass, setValueSearchClass] = useState('');
  const [pageCurrent, setPageCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [disabledClass, setDisabledClass] = useState(false);
  const [classId] = useDebounce(valueSearchClass, 750);

  const { data, isLoading } = useQuery({
    staleTime: 60 * 5000,
    cacheTime: 5 * 60 * 5000,
    keepPreviousData: true,
    queryKey: ['classList', pageCurrent, classId, pageSize],
    queryFn: async () => await adminClassApi.getAllClass({ id: classId, page: pageCurrent, size: pageSize }),
  });
  // Handle Confirm Delete Class
  const handleConfirmDeleteClass = (id) => {
    deleteClass(id).then((res) => {
      if (res.data?.success === true) {
        // handleGetClassList();
        notificationSuccess(`Xóa lớp ${id} thành công`);
      }
    });
  };

  const handleClickAddClass = () => setOpenModalForm(true);
  const handleClickEditClass = (record) => {
    setDisabledClass(true);
    setOpenModalForm(true);
    setDataClass(record);
  };

  const columns = [
    {
      title: 'Mã lớp',
      align: 'center',
      dataIndex: 'id',
    },
    {
      title: 'Tên lớp',
      dataIndex: 'name',
    },
    {
      title: 'Tùy chọn',
      align: 'center',
      render: (e, record, index) => (
        <Button.Group key={index}>
          <ButtonCustom icon={<EditOutlined />} title={'Chỉnh sửa'} handleClick={() => handleClickEditClass(record)} />
          <Popconfirm
            title='Bạn có chắc chắn muốn xóa lớp này ?'
            icon={<DeleteOutlined />}
            okText='Xóa'
            okType='danger'
            onConfirm={() => handleConfirmDeleteClass(record.id)}
          >
            <Button
              className='flex justify-center items-center text-md shadow-md'
              danger
              type='primary'
              icon={<DeleteOutlined />}
            >
              Xóa
            </Button>
          </Popconfirm>
        </Button.Group>
      ),
    },
  ];
  return (
    <div>
      <div className='flex justify-between items-center mb-3'>
        <Space>
          <Tooltip title='Tìm kiếm lớp'>
            <Input
              prefix={<SearchOutlined className='opacity-60 mr-1' />}
              placeholder='Nhập mã lớp'
              className='shadow-sm w-[230px]'
              onChange={(e) => setValueSearchClass(e.target.value)}
              value={valueSearchClass}
            />
          </Tooltip>
        </Space>
        <Title
          level={3}
          style={{
            textTransform: 'uppercase',
            marginBottom: 0,
            marginRight: 100,
          }}
        >
          Danh sách các lớp trong khoa
        </Title>
        <ButtonCustom title='Thêm lớp' icon={<PlusCircleOutlined />} handleClick={handleClickAddClass}></ButtonCustom>
      </div>
      <Table
        scroll={{
          y: 630,
        }}
        rowKey='id'
        bordered={true}
        loading={isLoading}
        columns={columns}
        rowSelection={{
          onChange: () => {},
        }}
        dataSource={data?.data?.items}
        pagination={{
          onChange: (page, size) => {
            setPageCurrent(page);
            setPageSize(size);
          },
          defaultCurrent: 1,
          pageSize: pageSize,
          total: data?.data?.total,
          current: pageCurrent,
          showSizeChanger: true,
        }}
      />
      <ModalFormClass
        onSuccess={() => {
          setOpenModalForm(false);
        }}
        dataClass={dataClass}
        openModalForm={openModalForm}
        onChangeClickOpen={(open) => {
          if (!open) {
            setDataClass({});
            setOpenModalForm(false);
            setDisabledClass(false);
          }
        }}
        disabledClass={disabledClass}
      />
    </div>
  );
}

export default ManagerClassPage;
