import { DeleteOutlined, EditOutlined, PlusCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Popconfirm, Table, Typography } from 'antd';
import React, { useState } from 'react';
import { adminMajorApi } from '../../../API/admin/adminMajorApi';
import { ButtonCustom } from '../../../components/Button';
import { notificationError, notificationSuccess } from '../../../components/Notification';
import { ModalFormMajor } from '../components/Modal';

function ManagerMajorPage(props) {
  const { Title } = Typography;
  const [openModalFormMajor, setOpenModalFormMajor] = useState(false);
  const [dataMajor, setDataMajor] = useState({});
  const [pageCurrent, setPageCurrent] = useState(1);
  const queryClient = useQueryClient();

  // handle get data major
  const { data, isLoading, error } = useQuery({
    staleTime: 60 * 5000,
    cacheTime: 5 * 60 * 5000,
    keepPreviousData: true,
    queryKey: ['majorList', pageCurrent],
    queryFn: async () => await adminMajorApi.getAllMajor({ page: pageCurrent, size: 10 }),
  });
  if (error) {
    notificationError(error?.data?.data);
  }

  const handleClickAddMajor = () => {
    setOpenModalFormMajor(true);
  };

  const handleClickEditMajor = (record) => {
    setOpenModalFormMajor(true);
    setDataMajor(record);
  };
  // handle confirm delete major
  const confirmDeleteMajor = useMutation({
    mutationKey: ['deleteMajor'],
    mutationFn: async (id) => await adminMajorApi.deleteMajor(id),
    onSuccess: (data) => {
      if (data && data.success === true) {
        queryClient.invalidateQueries({
          queryKey: ['majorList', pageCurrent],
        });
        notificationSuccess(data?.data?.data);
      }
    },
    onError: (data) => {
      notificationError(data?.data?.data);
    },
  });
  const handleConfirmDeleteMajor = (id) => {
    confirmDeleteMajor.mutate(id);
  };

  const columns = [
    {
      title: 'Mã chuyên ngành',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'Tên chuyên ngành',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tổng số tín chỉ tích lũy',
      dataIndex: 'totalCredits',
      key: 'totalCredits',
      align: 'center',
    },
    {
      title: 'Tùy chọn',
      align: 'center',
      render: (e, record, idx) => (
        <Button.Group key={idx}>
          <ButtonCustom handleClick={() => handleClickEditMajor(record)} icon={<EditOutlined />} title={'Chỉnh sửa'} />
          <Popconfirm
            title={`Bạn có chắc chắn muốn xóa chuyên ngành ${record.id}`}
            icon={<DeleteOutlined />}
            okText='Xóa'
            okType='danger'
            onConfirm={() => handleConfirmDeleteMajor(record.id)}
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
        <Button
          type='default'
          icon={<ReloadOutlined />}
          onClick={() => {
            setPageCurrent(1);
          }}
          className='flex justify-center items-center bg-white shadow-lg font-medium'
        >
          Cập nhật
        </Button>
        <Title style={{ textAlign: 'center', textTransform: 'uppercase', marginBottom: 0 }} level={3}>
          Danh sách chuyên ngành
        </Title>
        <Button
          icon={<PlusCircleOutlined />}
          onClick={handleClickAddMajor}
          className='flex justify-center items-center bg-white shadow-lg font-medium'
        >
          Thêm chuyên ngành
        </Button>
      </div>
      <Table
        scroll={{
          y: 630,
        }}
        rowKey='uid'
        loading={isLoading}
        bordered={true}
        dataSource={data?.data?.items}
        columns={columns}
        pagination={{
          onChange: (page, size) => {
            setPageCurrent(page);
          },
          defaultCurrent: 1,
          pageSize: 10,
          total: data?.data?.total,
          current: pageCurrent,
        }}
      />
      <ModalFormMajor
        onSuccess={() => {
          setOpenModalFormMajor(false);
        }}
        openForm={openModalFormMajor}
        dataMajor={dataMajor}
        onChangeClickOpen={(open) => {
          if (!open) {
            setDataMajor({});
            setOpenModalFormMajor(false);
          }
        }}
      />
    </div>
  );
}

export default ManagerMajorPage;
