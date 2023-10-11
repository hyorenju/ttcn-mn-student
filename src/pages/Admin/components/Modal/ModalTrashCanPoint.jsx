import { DeleteOutlined, MoreOutlined, RedoOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Modal, Popover, Space, Table } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { trashPointApi } from '../../../../API/Trash/pointTrashApi';
import { ButtonCustom } from '../../../../components/Button';
import { notificationSuccess } from '../../../../components/Notification';
import { addPoint } from '../../../../redux/Point/pointSlice';
import {
  getPointList,
  restorePoint,
  setPageCurrent,
  setPageSize,
  setTotal,
} from '../../../../redux/Trash/pointTrashSilce';

export const ModalTrashCanPoint = ({ open, close }) => {
  const dispatch = useDispatch();
  const pointTrashList = useSelector((state) => state.pointTrash.pointList);
  const total = useSelector((state) => state.pointTrash.total);
  const pageCurrent = useSelector((state) => state.pointTrash.pageCurrent);
  const pageSize = useSelector((state) => state.pointTrash.pageSize);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const getDataTrashPoint = useQuery({
    cacheTime: 5 * 60 * 1000,
    queryKey: ['dataPointTrash', pageCurrent, pageSize],
    queryFn: async () => {
      const res = await trashPointApi.getTrashAll({ page: pageCurrent, size: pageSize });
      if (res) return res;
    },
    onSuccess: (data) => {
      if (data) {
        dispatch(getPointList(data.data.items));
        dispatch(setTotal(data.data.total));
      }
    },
  });
  const handleRestorePointMuta = useMutation({
    mutationKey: ['restorePoint'],
    mutationFn: async (id) => {
      try {
        const res = await trashPointApi.restorePoint(id);
        if (res) return res;
      } catch (error) {}
    },
    onSuccess: (data) => {
      if (data && data.success === true) {
        notificationSuccess('Khôi phục thành công');
        dispatch(restorePoint(data.data));
        dispatch(addPoint(data.data.point));
      }
    },
  });
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
      title: 'Mã học kì',
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
                loading={handleRestorePointMuta.isLoading}
                title='Khôi phục'
                icon={<RedoOutlined />}
                handleClick={() => handleRestorePoint(record.id)}
              />
              <ButtonCustom title='Xóa vĩnh viễn' danger icon={<DeleteOutlined />} />
            </Space>
          }
        >
          <Button className='flex items-center justify-center' icon={<MoreOutlined />} />
        </Popover>
      ),
    },
  ];
  const handleChangePagination = (page, size) => {
    dispatch(setPageCurrent(page));
    dispatch(setPageSize(size));
  };
  const handleRestorePoint = (id) => {
    handleRestorePointMuta.mutate(id);
  };
  const handleClickRestorePointAll = () => {};
  const handleChangeSelection = (e, record) => setSelectedRowKeys(record.map((data) => data.id));
  const hasDisabled = selectedRowKeys.length > 0;
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
            handleClick={handleClickRestorePointAll}
          />
        </Space>
        <Table
          rowKey='id'
          loading={getDataTrashPoint.isFetching}
          scroll={{
            y: 400,
          }}
          rowSelection={{
            onChange: handleChangeSelection,
          }}
          dataSource={pointTrashList}
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
