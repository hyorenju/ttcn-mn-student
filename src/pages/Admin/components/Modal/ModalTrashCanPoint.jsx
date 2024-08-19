import { trashPointApi } from '@/API/Trash/pointTrashApi';
import { ButtonCustom } from '@/components/Button';
import { messageErrorToSever } from '@/components/Message';
import { notificationSuccess } from '@/components/Notification';
import { addPoint } from '@/redux/Point/pointSlice';
import { getPointList, restorePoint, setPageCurrent, setPageSize, setTotal } from '@/redux/Trash/pointTrashSilce';
import { DeleteOutlined, MoreOutlined, RedoOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Modal, Popover, Space, Table } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const ModalTrashCanPoint = ({ open, close }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { pointList, total, pageSize, pageCurrent } = useSelector((state) => state.pointTrash);

  const hasDisabled = selectedRowKeys.length > 0;
  const getDataTrashPoint = useQuery({
    cacheTime: 5 * 60 * 1000,
    queryKey: ['dataPointTrash', pageCurrent, pageSize],
    queryFn: async () =>
      await trashPointApi.getTrashAll({
        page: pageCurrent,
        size: pageSize,
      }),
    onSuccess: (res) => {
      if (res && res.success === true) {
        dispatch(getPointList(res.data?.items));
        dispatch(setTotal(res.data?.total));
      } else messageErrorToSever(res);
    },
  });

  const restorePoints = useMutation({
    mutationKey: ['restorePoint'],
    mutationFn: async (id) => await trashPointApi.restorePoint(id),
    onSuccess: (res) => {
      if (res && res.success === true) {
        notificationSuccess('Khôi phục thành công');
        dispatch(restorePoint(res.data));
        dispatch(addPoint(res.data?.point));
      } else messageErrorToSever(res, 'Khôi phục thất bại');
    },
  });
  const restorePointList = useMutation({
    mutationKey: ['restorePointList'],
    mutationFn: async () => await trashPointApi.restorePointList({ ids: selectedRowKeys }),
    onSuccess: async (res) => {
      if (res && res.success === true) {
        await queryClient.invalidateQueries({
          queryKey: ['dataPointTrash', pageCurrent, pageSize],
          exact: true,
        });
        await queryClient.invalidateQueries({
          queryKey: ['pointTermList'],
        });
        setSelectedRowKeys([]);
        notificationSuccess('Khôi phục thành công');
      } else messageErrorToSever('Khôi phục thất bại');
    },
  });
  const permanentlyDeletedPoint = useMutation({
    mutationKey: ['permanentDeletedStudent'],
    mutationFn: async (id) => await trashPointApi.permanentlyDeletedPoint(id),
    onSuccess: (res) => {
      if (res && res.success === true) {
        dispatch(restorePoint(res.data));
        notificationSuccess('Xóa thành công');
      } else messageErrorToSever(res, 'Xóa thất bại');
    },
  });
  const handleChangeSelection = (e, record) => setSelectedRowKeys(record.map((data) => data.id));
  const handleChangePagination = (page, size) => {
    dispatch(setPageCurrent(page));
    dispatch(setPageSize(size));
  };
  const handleRestorePoint = (id) => {
    restorePoints.mutate(id);
  };
  const handleClickRestorePointAll = () => {
    restorePointList.mutate();
  };
  const handlePermanentlyDeletePoint = (id) => {
    permanentlyDeletedPoint.mutate(id);
  };
  const columns = [
    {
      title: 'Mã sinh viên',
      dataIndex: ['point', 'student', 'id'],
      align: 'center',
      key: 'studentId',
    },
    {
      title: 'Họ Đệm',
      dataIndex: ['point', 'student', 'surname'],
      align: 'center',
      key: 'surname',
    },
    {
      title: 'Tên',
      dataIndex: ['point', 'student', 'lastName'],
      align: 'center',
      key: 'lastName',
    },
    {
      title: 'Lớp',
      dataIndex: ['point', 'student', 'aclass', 'id'],
      align: 'center',
      key: 'class',
    },
    {
      title: 'Mã học kỳ',
      dataIndex: ['point', 'term', 'id'],
      align: 'center',
      key: 'termId',
    },
    {
      title: 'Thời gian xóa',
      dataIndex: 'time',
      align: 'center',
      key: 'time',
      width: '15%',
    },
    {
      title: 'Người xóa',
      dataIndex: ['deletedBy', 'name'],
      align: 'center',
      key: 'byWhom',
      width: '15%',
    },
    {
      align: 'center',
      width: '8%',
      render: (record) => (
        <Popover
          trigger={'click'}
          placement='right'
          content={
            <Space direction='vertical'>
              <ButtonCustom
                loading={restorePoints.isLoading}
                title='Khôi phục'
                icon={<RedoOutlined />}
                handleClick={() => handleRestorePoint(record.id)}
              />
              <ButtonCustom
                title='Xóa vĩnh viễn'
                danger
                type='primary'
                icon={<DeleteOutlined />}
                handleClick={() => handlePermanentlyDeletePoint(record.id)}
              />
            </Space>
          }
        >
          <Button className='flex items-center justify-center' icon={<MoreOutlined />} />
        </Popover>
      ),
    },
  ];

  return (
    <>
      <Modal
        title='Thùng rác'
        width={1000}
        maskClosable={false}
        open={open}
        onOk={close}
        onCancel={close}
        okText='Xong'
        cancelButtonProps={{
          hidden: true,
        }}
      >
        <Space className='mb-2'>
          <ButtonCustom
            title='Khôi phục'
            type='primary'
            icon={<UsergroupAddOutlined />}
            disabled={!hasDisabled}
            loading={restorePointList.isLoading}
            handleClick={handleClickRestorePointAll}
          />
        </Space>
        <Table
          rowKey='id'
          loading={getDataTrashPoint.isFetching}
          scroll={{
            y: 5000,
          }}
          rowSelection={{
            onChange: handleChangeSelection,
          }}
          dataSource={pointList}
          columns={columns}
          pagination={{
            onChange: handleChangePagination,
            defaultCurrent: 1,
            total: total,
            current: pageCurrent,
            pageSize: pageSize,
            showSizeChanger: true,
          }}
        />
      </Modal>
    </>
  );
};
