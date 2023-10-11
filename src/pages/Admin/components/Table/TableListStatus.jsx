import { PlusOutlined } from '@ant-design/icons';
import { ButtonCustom } from '../../../../components/Button';
import { Space, Table } from 'antd';
import { ModalFormStatus } from '../Modal';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminStatusApi } from '../../../../API/admin/adminStatusApi';
import { notificationError, notificationSuccess } from '../../../../components/Notification';

export function TableListStatus() {
  const [pageCurrent, setPageCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [dataStatus, setDataStatus] = useState({});
  const queryClient = useQueryClient();
  const { data, isFetching } = useQuery({
    staleTime: 60 * 5000,
    cacheTime: 5 * 60 * 5000,
    queryKey: ['listStatus', pageCurrent, pageSize],
    queryFn: async () => {
      try {
        const res = await adminStatusApi.getAllStatus({ page: pageCurrent, size: pageSize });
        if (res) return res;
      } catch (error) {}
    },
  });

  const handleChangePaginationTable = (page, size) => {
    setPageCurrent(page);
    setPageSize(size);
  };
  const handleClickAddStatus = () => {
    setOpenModal(true);
  };
  const handleClickEditStatus = (record) => {
    setOpenModal(true);
    setDataStatus(record);
  };
  const deleteStatus = useMutation({
    mutationKey: ['deleteStatus'],
    mutationFn: async (id) => {
      if (id) {
        try {
          const res = await adminStatusApi.deleteStatus(id);
          if (res) return res;
        } catch (error) {}
      }
    },
    onSuccess: (res) => {
      if (res && res.success === true) {
        queryClient.invalidateQueries({
          queryKey: ['listStatus', pageCurrent, pageSize],
          exact: true,
        });
        notificationSuccess('Xóa thành công');
      } else if (res && res.success === false) {
        notificationError(res?.error.message);
      }
    },
    onError: (error) => {
      notificationError(error?.data);
    },
  });
  const handleClickDeleteStatus = (id) => {
    deleteStatus.mutate(id);
  };
  const columns = [
    {
      title: 'Tên trạng thái',
      dataIndex: 'name',
    },
    {
      title: 'Hành động',
      render: (index, record) => (
        <Space>
          <ButtonCustom title='Chỉnh sửa' handleClick={() => handleClickEditStatus(record)} />
          <ButtonCustom title='Xóa' danger handleClick={() => handleClickDeleteStatus(record.id)} />
        </Space>
      ),
    },
  ];
  return (
    <>
      <div>
        <Space className='mb-2'>
          <ButtonCustom title='Thêm trạng thái' icon={<PlusOutlined />} handleClick={handleClickAddStatus} />
        </Space>
        <Table
          rowKey={'name'}
          columns={columns}
          loading={isFetching}
          dataSource={data?.data?.items}
          pagination={{
            onChange: handleChangePaginationTable,
            defaultCurrent: 1,
            defaultPageSize: 10,
            current: pageCurrent,
            total: data?.data?.total,
            pageSize: pageSize,
            showSizeChanger: true,
          }}
        />
        <ModalFormStatus
          onSuccess={() => setOpenModal(false)}
          dataStatus={dataStatus}
          open={openModal}
          onChangeClickOpen={(open) => {
            if (!open) {
              setDataStatus({});
              setOpenModal(false);
            }
          }}
        />
      </div>
    </>
  );
}
