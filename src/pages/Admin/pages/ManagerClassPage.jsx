import { adminClassApi } from '@/API/admin/adminClassApi';
import { ButtonCustom } from '@/components/Button';
import { messageErrorToSever } from '@/components/Message';
import { notificationSuccess } from '@/components/Notification';
import { DeleteOutlined, DownloadOutlined, EditOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Popconfirm, Select, Space, Table, Tooltip, Typography } from 'antd';
import { useState } from 'react';
import { ModalFormClass } from '../components/Modal';

function ManagerClassPage(props) {
  const queryClient = useQueryClient();
  const { Title } = Typography;
  const [openModalForm, setOpenModalForm] = useState(false);
  const [dataClass, setDataClass] = useState({});
  const [valueSearchClassId, setValueSearchClassId] = useState(null);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isFetching } = useQuery({
    staleTime: 60 * 5000,
    cacheTime: 5 * 60 * 5000,
    keepPreviousData: true,
    queryKey: ['classList', pageCurrent, valueSearchClassId, pageSize],
    queryFn: () =>
      adminClassApi.getAllClass({
        id: valueSearchClassId,
        page: pageCurrent,
        size: pageSize,
      }),
  });

  const getClassList = useQuery({
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
    queryKey: ['getClassList'],
    queryFn: () => adminClassApi.getClassSelection(),
    onSuccess: (res) => {
      if (res && res.success === false) {
        messageErrorToSever(res, 'Lấy danh sách lớp lỗi');
      }
    },
  });

  // Handle Confirm Delete Class
  const handleConfirmDeleteClass = useMutation({
    mutationKey: ['deleteClass'],
    mutationFn: (id) => adminClassApi.deleteClass(id),
    onSuccess: (res) => {
      if (res && res.success === true) {
        notificationSuccess('Xóa thành công');
        queryClient.invalidateQueries({
          queryKey: ['classList', pageCurrent, valueSearchClassId, pageSize],
          exact: true,
        });
      } else messageErrorToSever(res, 'Xóa thất bại');
    },
  });
  const exportClass = useMutation({
    mutationKey: ['exportClass'],
    mutationFn: () => {},
  });
  const handleClickBtnExportClass = () => {
    exportClass.mutate();
  };
  const optionClass = getClassList.data?.data?.items.map((item) => ({ label: item.id, value: item.id }));
  const filterOptionClass = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  const handleClickAddClass = () => setOpenModalForm(true);
  const handleClickEditClass = (record) => {
    setOpenModalForm(true);
    setDataClass(record);
  };
  const handleSearchClassId = (e) => {
    setValueSearchClassId(e);
    if (!pageCurrent === 1) return setPageCurrent(1);
  };
  const handleChangePaginationTable = (page, size) => {
    setPageCurrent(page);
    setPageSize(size);
  };
  const handleClickResetFilterClassId = () => setValueSearchClassId(null);
  const handleClickCloseFilterClassId = (close) => close();
  const columns = [
    {
      title: 'Mã lớp',
      align: 'center',
      dataIndex: 'id',
      filterDropdown: ({ close }) => (
        <div className='p-3 flex flex-col gap-2 w-[230px]'>
          <Select
            showSearch
            value={valueSearchClassId}
            options={optionClass}
            loading={getClassList.isLoading}
            filterOption={filterOptionClass}
            placeholder='Chọn mã lớp tìm kiếm'
            optionFilterProp='children'
            onChange={handleSearchClassId}
          />
          <Space>
            <ButtonCustom handleClick={handleClickResetFilterClassId} size='small' title={'Reset'} />
            <Button type='link' size='small' onClick={() => handleClickCloseFilterClassId(close)}>
              Đóng
            </Button>
          </Space>
        </div>
      ),
      filterIcon: () => (
        <Tooltip title='Tìm kiếm theo tên lớp'>
          <SearchOutlined className={`${valueSearchClassId ? 'text-blue-500' : undefined}`} />
        </Tooltip>
      ),
    },
    {
      title: 'Tên lớp',
      dataIndex: 'name',
    },
    {
      title: 'Lớp trưởng',
      align: 'center',
      render: (_, record) => {
        if (record.monitor) {
          return (
            <p>{`${record.monitor.id} - ${record.monitor.surname} ${record.monitor.lastName} - ${record.monitor.phoneNumber}`}</p>
          );
        }
      },
    },
    {
      title: 'Lớp phó',
      align: 'center',
      render: (_, record) => {
        if (record.viceMonitor) {
          return (
            <p>{`${record.viceMonitor.id} - ${record.viceMonitor.surname} ${record.viceMonitor.lastName} - ${record.viceMonitor.phoneNumber} `}</p>
          );
        }
      },
    },
    {
      title: 'Bí thư',
      align: 'center',
      render: (_, record) => {
        if (record.secretary) {
          return (
            <p>{`${record.secretary.id} - ${record.secretary.surname} ${record.secretary.lastName} - ${record.secretary.phoneNumber}`}</p>
          );
        }
      },
    },
    {
      title: 'Phó bí thư',
      align: 'center',
      render: (_, record) => {
        if (record.deputySecretary) {
          return (
            <p>{`${record.deputySecretary.id} - ${record.deputySecretary.surname} ${record.deputySecretary.lastName} - ${record.deputySecretary.phoneNumber}`}</p>
          );
        }
      },
    },
    {
      title: 'Tùy chọn',
      align: 'center',
      render: (e, record, index) => (
        <Button.Group key={index}>
          <ButtonCustom icon={<EditOutlined />} title={'Chỉnh sửa'} handleClick={() => handleClickEditClass(record)} />
          <Popconfirm
            title={`Bạn có chắc chắn muốn xóa lớp ${record.id} ?`}
            icon={<DeleteOutlined />}
            okText='Xóa'
            okType='danger'
            onConfirm={() => handleConfirmDeleteClass.mutate(record.id)}
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
        <div className='hidden lg:block w-[10rem]'></div>
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
        <ButtonCustom title='Thêm lớp' icon={<PlusCircleOutlined />} handleClick={handleClickAddClass} />
      </div>
      <div className='relative'>
        <Table
          scroll={{
            y: 630,
          }}
          rowKey='id'
          bordered={true}
          loading={isFetching}
          columns={columns}
          dataSource={data?.data?.items}
          pagination={{
            onChange: handleChangePaginationTable,
            defaultCurrent: 1,
            pageSize: pageSize,
            total: data?.data?.total,
            current: pageCurrent,
            showSizeChanger: true,
          }}
        />
        <div className='absolute bottom-0 left-0'>
          <ButtonCustom
            title='Xuất danh sách lớp'
            handleClick={handleClickBtnExportClass}
            icon={<DownloadOutlined />}
            loading={exportClass.isLoading}
          />
        </div>
      </div>
      <ModalFormClass
        dataClass={dataClass}
        openModalForm={openModalForm}
        onChangeClickOpen={(open) => {
          if (!open) {
            setDataClass({});
            setOpenModalForm(false);
          }
        }}
      />
    </div>
  );
}

export default ManagerClassPage;
