import { adminAdminApi } from '@/API/admin/adminAdminApi';
import { ButtonCustom } from '@/components/Button';
import { messageErrorToSever } from '@/components/Message';
import { notificationSuccess } from '@/components/Notification';
import {
  deleteAdmin,
  setAdminId,
  setDataAdminList,
  setPageCurrent,
  setPageSize,
  setTotal,
} from '@/redux/Admin/adminSilce';
import { addAdmin } from '@/redux/Trash/adminTrashSlice';
import {
  DeleteFilled,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  SwapOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Drawer, Input, Popconfirm, Space, Table, Tag, Tooltip, Typography } from 'antd';
import { useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { DrawerAdminAuther } from '../components/Drawer';
import { ModalFormAdmin, ModalTrashCanAdmin } from '../components/Modal';

function ManagerAuthorizationPage(props) {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const { adminList, adminId, total, pageCurrent, pageSize } = useSelector((state) => state.adminList);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModalFormAdmin, setOpenModalFormAdmin] = useState(false);
  const [dataAdmin, setDataAdmin] = useState({});
  const [openModalTrush, setOpenModalTrush] = useState(false);
  const [valueSearchAdmin, setValueSearchAdmin] = useSearchParams('');
  const [adminIdSearch] = useDebounce(valueSearchAdmin.get('adminId'), 750);
  dispatch(setAdminId(adminIdSearch));

  // handle delete admin
  const handleConfirmDeleteAdmin = useMutation({
    mutationFn: (id) => adminAdminApi.deleteAdmin(id),
    onSuccess: (res) => {
      if (res && res.success) {
        notificationSuccess('Xóa quản trị viên thành công');
        dispatch(deleteAdmin(res.data?.admin));
        dispatch(addAdmin(res.data));
      } else messageErrorToSever(res, 'Xóa quản trị viên thất bại');
    },
  });
  // handle get admin list

  const getAdminList = useQuery({
    cacheTime: 10 * 60 * 1000,
    keepPreviousData: true,
    queryKey: ['adminList', pageSize, pageCurrent, adminId],
    queryFn: () =>
      adminAdminApi.getAllAdmin({
        id: adminId,
        page: pageCurrent,
        size: pageSize,
      }),
    onSuccess: (res) => {
      if (res && res.success) {
        dispatch(setTotal(res.data?.total));
        dispatch(setDataAdminList(res.data?.items));
      }
    },
  });
  const handleClickBtnTrush = () => {
    setOpenModalTrush(true);
  };
  const handleClickEdit = (record) => {
    setDataAdmin(record);
    setOpenModalFormAdmin(true);
  };
  const role = (roleName) => {
    switch (roleName) {
      case 'Quản trị viên cấp cao':
        return <Tag color='red'>Quản trị viên cấp cao</Tag>;
      case 'Quản trị viên':
        return <Tag color='cyan'>Quản trị viên</Tag>;
      case 'Kiểm duyệt viên':
        return <Tag color='blue-inverse'>Kiểm duyệt viên</Tag>;
      case 'Lớp trưởng':
        return <Tag color='geekblue-inverse'>Lớp trưởng</Tag>;
      default:
        return 'Vai trò không có trong hệ thống';
    }
  };
  const handleChangePaginationTable = (page, size) => {
    dispatch(setPageSize(size));
    dispatch(setPageCurrent(page));
  };
  const handleChangAdminId = (e) => {
    const adminId = e.target.value;
    if (adminId) {
      setValueSearchAdmin({ adminId });
    } else {
      setValueSearchAdmin({});
    }
  };
  const handleClickResetFilterAdminId = () => setValueSearchAdmin({});
  const handleClickCloseFilterAdminId = (close) => close();
  const columns = [
    {
      title: 'Tên đăng nhập',
      dataIndex: 'id',
      align: 'center',
      filterDropdown: ({ close }) => (
        <div className='p-3'>
          <Input
            placeholder={'Nhập mã admin tìm kiếm'}
            value={valueSearchAdmin.get('adminId')}
            onChange={handleChangAdminId}
            className='w-[250px] mb-3 block'
          />
          <Space>
            <ButtonCustom handleClick={handleClickResetFilterAdminId} size='small' title={'Reset'} />
            <Button type='link' size='small' onClick={() => handleClickCloseFilterAdminId(close)}>
              Đóng
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <Tooltip title='Tìm kiếm theo mã admin'>
          <SearchOutlined className={`${filtered ? 'text-[#1677ff]' : undefined} text-md p-1`} />
        </Tooltip>
      ),
      render: (text) =>
        valueSearchAdmin.get('adminId') === adminIdSearch ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: '#ffc069',
              padding: 0,
            }}
            searchWords={[valueSearchAdmin.get('adminId')]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      align: 'center',
    },
    {
      title: 'Vai trò',
      align: 'center',
      render: (e, record, idx) => role(record?.role?.name),
    },
    {
      title: 'Tùy chọn',
      align: 'center',
      render: (e, record, index) => (
        <Button.Group key={index}>
          <ButtonCustom title={'Chỉnh sửa'} icon={<EditOutlined />} handleClick={() => handleClickEdit(record)} />
          <Popconfirm
            title='Bạn có chắc chắn muốn xóa ?'
            icon={<DeleteOutlined />}
            okText='Xóa'
            okType='danger'
            onConfirm={() => handleConfirmDeleteAdmin.mutate(record.id)}
          >
            <Button
              className='flex justify-center items-center text-md shadow-md'
              icon={<DeleteOutlined />}
              type='primary'
              danger
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
      <div className='flex justify-between mb-3'>
        <ButtonCustom title='Thùng rác' icon={<DeleteFilled />} handleClick={handleClickBtnTrush} />
        <Title level={3} className='uppercase absolute left-2/4'>
          Danh sách admin
        </Title>
        <Space>
          <ButtonCustom
            icon={<SwapOutlined />}
            handleClick={() => {
              setOpenDrawer(true);
            }}
            title={'Phân quyền'}
          />
          <ButtonCustom
            icon={<UserAddOutlined />}
            handleClick={() => {
              setOpenModalFormAdmin(true);
            }}
            title='Thêm quản trị viên'
          />
        </Space>
      </div>
      <ModalFormAdmin
        dataAdmin={dataAdmin}
        openForm={openModalFormAdmin}
        onChangeClickOpen={(open) => {
          if (!open) {
            setDataAdmin({});
            setOpenModalFormAdmin(false);
          }
        }}
      />
      <Table
        scroll={{
          y: 630,
        }}
        rowKey='id'
        loading={getAdminList.isFetching}
        bordered={true}
        dataSource={adminList}
        columns={columns}
        pagination={{
          onChange: handleChangePaginationTable,
          defaultCurrent: 1,
          pageSize: pageSize,
          total: total,
          current: pageCurrent,
          showSizeChanger: true,
        }}
      />
      <ModalTrashCanAdmin open={openModalTrush} close={() => setOpenModalTrush(false)} />
      <Drawer placement='right' open={openDrawer} onClose={() => setOpenDrawer(false)} width={1300}>
        <DrawerAdminAuther />
      </Drawer>
    </div>
  );
}

export default ManagerAuthorizationPage;
