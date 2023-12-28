import { adminAdminApi } from '@/API/admin/adminAdminApi';
import { ButtonCustom } from '@/components/Button';
import { messageErrorToSever } from '@/components/Message';
import { notificationSuccess } from '@/components/Notification';
import { addAdmin } from '@/redux/Admin/adminSilce';
import { getAdminList, restoreAdmin, setPageCurrent, setPageSize } from '@/redux/Trash/adminTrashSlice';
import { DeleteOutlined, MoreOutlined, RedoOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Modal, Popover, Space, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

export const ModalTrashCanAdmin = ({ open, close }) => {
  const dispatch = useDispatch();
  const { adminList, total, pageCurrent, pageSize } = useSelector((state) => state.adminTrash);

  const getStudentListTrash = useQuery({
    cacheTime: 5 * 60 * 1000,
    queryKey: ['studentListTrash', pageCurrent, pageSize],
    queryFn: async () => await adminAdminApi.trashAdmin({ page: pageCurrent, size: pageSize }),
    onSuccess: (data) => {
      if (data && data.success) {
        dispatch(getAdminList(data.data.items));
      }
    },
  });
  const handleClickRestore = (id) => {
    handleRestoreAdmin.mutate(id);
  };
  const handleChangePagination = (page, size) => {
    dispatch(setPageCurrent(page));
    dispatch(setPageSize(size));
  };
  const handleRestoreAdmin = useMutation({
    mutationKey: ['restoreAdmin'],
    mutationFn: async (id) => adminAdminApi.restoreAdmin(id),
    onSuccess: (res) => {
      if (res && res.success === true) {
        dispatch(restoreAdmin(res.data));
        dispatch(addAdmin(res.data?.admin));
        notificationSuccess('Khôi phục thành công');
      } else messageErrorToSever(res, 'Khôi phục thất bại');
    },
  });

  const columns = [
    {
      title: 'Mã admin',
      dataIndex: ['admin', 'id'],
      align: 'center',
    },
    {
      title: 'Họ Tên',
      dataIndex: ['admin', 'name'],
      align: 'center',
    },
    {
      title: 'Thời gian xóa',
      dataIndex: 'time',
      align: 'center',
    },
    {
      title: 'Người xóa',
      dataIndex: ['deletedBy', 'name'],
      align: 'center',
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
                loading={handleRestoreAdmin.isLoading}
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
        <Table
          loading={getStudentListTrash.isFetching}
          dataSource={adminList}
          columns={columns}
          pagination={{
            onChange: handleChangePagination,
            total: total,
            defaultCurrent: 1,
            current: pageCurrent,
            pageSize: pageSize,
            showSizeChanger: true,
          }}
        />
      </Modal>
    </>
  );
};
