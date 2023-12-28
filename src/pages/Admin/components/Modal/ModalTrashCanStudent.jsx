import { trashStudentApi } from '@/API/Trash/studentTrashApi';
import { ButtonCustom } from '@/components/Button';
import { messageErrorToSever } from '@/components/Message';
import { notificationSuccess } from '@/components/Notification';
import { addStudent } from '@/redux/Student/studentSilce';
import { getStudentList, restoreStudent, setPageCurrent, setPageSize } from '@/redux/Trash/studentTrashSlice';
import { DeleteOutlined, MoreOutlined, RedoOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Modal, Popover, Space, Table } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const ModalTrashCanStudent = ({ open, close }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { studentList, total, pageCurrent, pageSize } = useSelector((state) => state.studentTrash);

  const hasDisabled = selectedRowKeys.length > 0;
  const getStudentListTrash = useQuery({
    cacheTime: 5 * 60 * 1000,
    queryKey: ['studentListTrash', pageCurrent, pageSize],
    queryFn: async () => trashStudentApi.getTrashAll({ page: pageCurrent, size: pageSize }),
    onSuccess: (res) => {
      if (res && res.success === true) {
        dispatch(getStudentList(res.data?.items));
      }
    },
  });

  const restoreStudents = useMutation({
    mutationKey: ['restoreStudent'],
    mutationFn: async (id) => trashStudentApi.restoreStudent(id),
    onSuccess: (res) => {
      if (res && res.success === true) {
        dispatch(restoreStudent(res.data));
        dispatch(addStudent(res.data?.student));
        notificationSuccess('Khôi phục thành công');
      } else messageErrorToSever(res, 'Khôi phục thất bại');
    },
  });

  const restoreStudentList = useMutation({
    mutationKey: ['restoreStudentList'],
    mutationFn: async () => await trashStudentApi.restoreStudentList({ ids: selectedRowKeys }),
    onSuccess: async (res) => {
      if (res && res.success === true) {
        setSelectedRowKeys([]);
        await queryClient.invalidateQueries({
          queryKey: ['studentListTrash', pageCurrent, pageSize],
          exact: true,
        });
        await queryClient.invalidateQueries({
          queryKey: ['studentList'],
        });
        notificationSuccess('Khôi phục danh sách sinh viên thành công');
      } else messageErrorToSever(res, 'Khôi phục danh sách sinh viên thất bại');
    },
  });
  const permanentlyDeletedStudent = useMutation({
    mutationKey: ['permanentDeletedStudent'],
    mutationFn: async (id) => await trashStudentApi.permanentlyDeletedStudent(id),
    onSuccess: (res) => {
      if (res && res.success === true) {
        dispatch(restoreStudent(res.data));
        notificationSuccess('Xóa thành công');
      } else messageErrorToSever(res, 'Xóa thất bại');
    },
  });
  const handleChangeRowKey = (e, record) => setSelectedRowKeys(record.map((data) => data.id));
  const handleChangePagination = (page, size) => {
    dispatch(setPageCurrent(page));
    dispatch(setPageSize(size));
  };
  const handleRestore = (id) => {
    restoreStudents.mutate(id);
  };
  const handleRestoreStudentList = () => {
    restoreStudentList.mutate();
  };
  const handleDeletePermanent = (id) => {
    permanentlyDeletedStudent.mutate(id);
  };
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
                loading={restoreStudents.isLoading}
                title='Khôi phục'
                icon={<RedoOutlined />}
                handleClick={() => handleRestore(record.id)}
              />
              <ButtonCustom
                title='Xóa vĩnh viễn'
                loading={permanentlyDeletedStudent.isLoading}
                danger
                handleClick={() => handleDeletePermanent(record.id)}
                icon={<DeleteOutlined />}
              />
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
            handleClick={handleRestoreStudentList}
            loading={restoreStudentList.isLoading}
          />
        </Space>
        <Table
          rowKey='id'
          loading={getStudentListTrash.isFetching}
          scroll={{
            y: 400,
          }}
          rowSelection={{
            onChange: handleChangeRowKey,
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
