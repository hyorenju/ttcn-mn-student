import { DeleteOutlined, MoreOutlined, RedoOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Modal, Popover, Space, Table } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonCustom } from '../../../../components/Button';
import { getStudentList, setPageCurrent, setPageSize, restoreStudent } from '../../../../redux/Trash/studentTrashSlice';
import { trashStudentApi } from '../../../../API/Trash/studentTrashApi';
import { addStudent } from '../../../../redux/Student/studentSilce';
import { notificationSuccess } from '../../../../components/Notification';

export const ModalTrashCanStudent = ({ open, close }) => {
  const dispatch = useDispatch();
  const studentList = useSelector((state) => state.studentTrash.studentList);
  const pageCurrent = useSelector((state) => state.studentTrash.pageCurrent);
  const pageSize = useSelector((state) => state.studentTrash.pageSize);
  const total = useSelector((state) => state.studentTrash.total);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const getStudentListTrash = useQuery({
    cacheTime: 5 * 60 * 1000,
    queryKey: ['studentListTrash', pageCurrent, pageSize],
    queryFn: async () => trashStudentApi.getTrashAll({ page: pageCurrent, size: pageSize }),
    onSuccess: (data) => {
      if (data && data.success === true) {
        dispatch(getStudentList(data.data.items));
      }
    },
  });
  const handleRestoreStudent = useMutation({
    mutationKey: ['restoreStudent'],
    mutationFn: async (id) => trashStudentApi.restoreStudent(id),
    onSuccess: (data) => {
      if (data && data.success === true) {
        dispatch(restoreStudent(data.data));
        dispatch(addStudent(data.data.student));
        notificationSuccess('Khôi phục thành công');
      }
    },
  });
  const handleChangePagination = (page, size) => {
    dispatch(setPageCurrent(page));
    dispatch(setPageSize(size));
  };
  const handleClickRestore = (id) => {
    handleRestoreStudent.mutate(id);
  };
  const handleClickRestoreAll = () => {};
  const hasDisabled = selectedRowKeys.length > 0;
  const columns = [
    {
      title: 'Mã sinh viên',
      dataIndex: ['student', 'id'],
      align: 'center',
      key: 'id',
    },
    {
      title: 'Họ Đệm',
      dataIndex: ['student', 'surname'],
      align: 'center',
      key: 'name',
    },
    {
      title: 'Tên',
      dataIndex: ['student', 'lastName'],
      align: 'center',
      key: 'name',
    },
    {
      title: 'Lớp',
      dataIndex: ['student', 'aclass', 'id'],
      align: 'center',
      key: 'class',
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
      width: '20%',
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
                loading={handleRestoreStudent.isLoading}
                title='Khôi phục'
                icon={<RedoOutlined />}
                handleClick={() => handleClickRestore(record.id)}
              />
              <ButtonCustom title='Xóa vĩnh viễn' danger icon={<DeleteOutlined />} />
            </Space>
          }
        >
          <Button className='flex items-center justify-center bg-white' icon={<MoreOutlined />} />
        </Popover>
      ),
    },
  ];

  return (
    <>
      <Modal
        title={<h2 className='text-xl text-center'>Thùng rác</h2>}
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
            handleClick={handleClickRestoreAll}
          />
        </Space>
        <Table
          rowKey='id'
          loading={getStudentListTrash.isFetching}
          scroll={{
            y: 400,
          }}
          rowSelection={{
            onChange: (e, record) => setSelectedRowKeys(record.map((data) => data.id)),
          }}
          dataSource={studentList}
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
