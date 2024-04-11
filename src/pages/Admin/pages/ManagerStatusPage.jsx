import { adminDisplayApi } from '@/API/admin/adminDisplayApi';
import { adminSemesterApi } from '@/API/admin/adminSemesterApi';
import { adminStatusApi } from '@/API/admin/adminStatusApi';
import { adminStudentStatusApi } from '@/API/admin/adminStudentStatusApi';
import { ButtonCustom } from '@/components/Button';
import { messageErrorToSever } from '@/components/Message';
import { notificationError, notificationSuccess } from '@/components/Notification';
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  MoreOutlined,
  SearchOutlined,
  TableOutlined,
  UploadOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Drawer,
  Input,
  Popconfirm,
  Popover,
  Select,
  Space,
  Table,
  Tooltip,
  Typography,
  Upload,
  message,
} from 'antd';
import { useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useDebounce } from 'use-debounce';
import { ModalFormStudentStatus, ModalShowError } from '../components/Modal';
import { TableListStatus } from '../components/Table';

function ManagerStatusPage() {
  const [dataError, setDataError] = useState({});
  const [openModalError, setOpenModalError] = useState(false);
  const queryClient = useQueryClient();
  const { Title } = Typography;
  const [valueSearchTermId, setValueSearchTermId] = useState(null);
  const [valueSearchStatusId, setValueSearchStatusId] = useState(null);
  const [valueSearchStudentId, setValueSearchStudentId] = useState(null);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [dataStudent, setDataStudent] = useState({});
  const [studentId] = useDebounce(valueSearchStudentId, 600);
  const roleId = JSON.parse(localStorage.getItem('roleId'));

  const { data, isFetching } = useQuery({
    staleTime: 60 * 5000,
    cacheTime: 5 * 60 * 5000,
    queryKey: ['studentStatusList', pageCurrent, pageSize, studentId, valueSearchTermId, valueSearchStatusId],
    queryFn: () =>
      adminStudentStatusApi.getAllStudentStatus({
        studentId: studentId,
        page: pageCurrent,
        size: pageSize,
        filter: {
          termId: valueSearchTermId,
          statusId: valueSearchStatusId,
        },
      }),
  });
  const getTermList = useQuery({
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
    queryKey: ['getTermList'],
    queryFn: () => adminSemesterApi.getAllTermSelection(),
    onSuccess: (res) => {
      if (res && res.success === false) {
        messageErrorToSever(res, 'Lấy danh sách học kỳ lỗi');
      }
    },
  });
  const getStatusList = useQuery({
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
    queryKey: ['getStatusList'],
    queryFn: () => adminStatusApi.getStatusSelect(),
    onSuccess: (res) => {
      if (res && res.success === false) {
        messageErrorToSever(res, 'Lấy danh sách tình trạng lỗi');
      }
    },
  });
  const deleteStudentStatus = useMutation({
    mutationKey: ['deleteStudentStatus'],
    mutationFn: (id) => adminStudentStatusApi.deleteStudentStatus(id),
    onSuccess: (res) => {
      if (res && res.success === true) {
        queryClient.invalidateQueries({
          queryKey: ['studentStatusList', pageCurrent, pageSize, studentId, valueSearchTermId, valueSearchStatusId],
          exact: true,
        });
        notificationSuccess('Xóa tình trạng sinh viên thành công');
      } else messageErrorToSever(res, 'Xóa tình trạng sinh viên thất bại');
    },
  });
  const getDataError = useMutation({
    mutationKey: ['getDataErrorImport'],
    mutationFn: () => adminDisplayApi.getDisplayErrorImport(4),
    onSuccess: (res) => {
      if (res && res.success === true) {
        setDataError(res.data);
      } else messageErrorToSever(res, 'Thất bại');
    },
  });
  const importStudentStatusList = useMutation({
    mutationKey: ['importStudentStatusList'],
    mutationFn: (file) => {
      const formData = new FormData();
      formData.append('file', file.file);
      return adminStudentStatusApi.importStudentStatus(formData);
    },
    onSuccess: (res) => {
      if (res && res.success === true) {
        notificationSuccess('Upload file thành công');
        queryClient.invalidateQueries({
          queryKey: ['studentStatusList', pageCurrent, pageSize, studentId, valueSearchTermId, valueSearchStatusId],
          exact: true,
        });
      } else if (res && res.success === false) {
        getDataError.mutate();
        notificationError(`Upload file thất bại. Hãy làm theo đúng form excel được tải về máy của bạn`);
        setOpenModalError(true);
        window.open(res.error?.message);
      } else messageErrorToSever(res);
    },
  });
  const exportStudentFormExcel = useMutation({
    mutationKey: ['exportStudentStatusList'],
    mutationFn: () =>
      adminStudentStatusApi.exportStudentStatus({
        studentId: studentId,
        page: pageCurrent,
        size: pageSize,
        filter: {
          termId: valueSearchTermId,
          statusId: valueSearchStatusId,
        },
      }),
    onSuccess: (res) => {
      if (res && res.success === true) {
        notificationSuccess('Đã xuất file excel thành công hãy kiểm tra trong máy của bạn nhé ');
        window.open(res.data);
      } else {
        messageErrorToSever(res, 'Có lỗi trong quá trình lưu file');
      }
    },
  });

  const handleClickBtnExportFileStudentStatusList = () => {
    exportStudentFormExcel.mutate();
  };
  const filterOptionTerm = (input, option) => (option?.value ?? '').toLowerCase().includes(input.toLowerCase());
  const optionTerm = getTermList.data?.data?.items.map((item) => ({ label: item.id, value: item.id }));
  const optionStatus = getStatusList.data?.data?.items.map((item) => ({ label: item.name, value: item.id }));
  const filterOptionStatus = (input, option) => (option?.value ?? '').toLowerCase().includes(input.toLowerCase());
  const handleChangePaginationTable = (page, size) => {
    setPageCurrent(page);
    setPageSize(size);
  };
  const handleClickBtnEditStatusStudent = (record) => {
    setOpenModal(true);
    setDataStudent(record);
  };
  const handleConfirmDeleteStatusStudent = (id) => {
    deleteStudentStatus.mutate(id);
  };
  const handleClickShowStatusList = () => {
    setOpenDrawer(true);
  };
  const handleClickAddStatus = (record) => {
    setOpenModal(true);
  };
  const handleChangeStudentId = (e) => setValueSearchStudentId(e.target.value);
  const handleChangeSelectTermId = (e) => setValueSearchTermId(e);
  const handleChangeSelectStatusId = (e) => setValueSearchStatusId(e);

  const handleClickResetFilterStudentId = () => setValueSearchStudentId(null);
  const handleClickCloseFilterStudentId = (close) => close();

  const handleClickResetFilterTermId = () => setValueSearchTermId(null);
  const handleClickCloseFilterTermId = (close) => close();

  const handleClickResetFilterStatusId = () => setValueSearchStatusId(null);
  const handleClickCloseFilterStatusId = (close) => close();

  const props = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    customRequest: (file) => importStudentStatusList.mutate(file),
    beforeUpload: (file) => {
      const checkSize = file.size / 1024 / 1024 < 5;
      const isXLXS = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      if (!isXLXS) {
        message.error(`${file.name} không phải là một file excel`, 3);
        return false;
      }
      if (!checkSize) {
        message.error(`File tải lên không được quá 5MB`, 3);
        return false;
      }
      return true;
    },
  };

  const columns = [
    {
      title: 'Mã học kỳ',
      dataIndex: ['term', 'id'],
      align: 'center',
      key: 'termId',
      filterDropdown: ({ close }) => (
        <div className='p-3 flex flex-col gap-2 w-[200px]'>
          <Select
            showSearch
            value={valueSearchTermId}
            options={optionTerm}
            loading={getTermList.isLoading}
            filterOption={filterOptionTerm}
            placeholder='Chọn mã học kỳ tìm kiếm'
            optionFilterProp='children'
            onChange={handleChangeSelectTermId}
          />
          <Space>
            <ButtonCustom handleClick={handleClickResetFilterTermId} size='small' title={'Reset'} />
            <Button type='link' size='small' onClick={() => handleClickCloseFilterTermId(close)}>
              Đóng
            </Button>
          </Space>
        </div>
      ),
      filterIcon: () => (
        <Tooltip title='Tìm kiếm theo mã học kỳ'>
          <SearchOutlined className={`${valueSearchTermId ? 'text-blue-500' : undefined}`} />
        </Tooltip>
      ),
    },
    {
      title: 'Mã sinh viên',
      dataIndex: ['student', 'id'],
      align: 'center',
      filterDropdown: ({ close }) => (
        <div className='p-3'>
          <Input
            placeholder={'Nhập mã sinh viên tìm kiếm'}
            value={valueSearchStudentId}
            onChange={handleChangeStudentId}
            className='w-[250px] mb-3 block'
          />
          <Space>
            <ButtonCustom handleClick={handleClickResetFilterStudentId} size='small' title={'Reset'} />
            <Button type='link' size='small' onClick={() => handleClickCloseFilterStudentId(close)}>
              Đóng
            </Button>
          </Space>
        </div>
      ),
      filterIcon: () => <SearchOutlined className={`${studentId ? 'text-blue-500' : undefined} `} />,
      render: (text) =>
        valueSearchStudentId === studentId ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: '#ffc069',
              padding: 0,
            }}
            searchWords={[valueSearchStudentId]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    },
    {
      title: 'Họ và tên',
      align: 'center',
      width: '15%',
      render: (_, record) => record && <p>{`${record.student?.surname} ${record.student?.lastName}`}</p>,
    },
    {
      title: 'Mã lớp',
      dataIndex: ['student', 'aclass', 'id'],
      align: 'center',
    },
    {
      title: 'Tình trạng',
      dataIndex: ['status', 'name'],
      align: 'center',
      filterDropdown: ({ close }) => (
        <div className='p-3 flex flex-col gap-2 w-[250px]'>
          <Select
            showSearch
            value={valueSearchStatusId}
            options={optionStatus}
            loading={getStatusList.isLoading}
            filterOption={filterOptionStatus}
            placeholder='Chọn tình trạng tìm kiếm'
            optionFilterProp='children'
            onChange={handleChangeSelectStatusId}
          />
          <Space>
            <ButtonCustom handleClick={handleClickResetFilterStatusId} size='small' title={'Reset'} />
            <Button type='link' size='small' onClick={() => handleClickCloseFilterStatusId(close)}>
              Đóng
            </Button>
          </Space>
        </div>
      ),
      filterIcon: () => (
        <Tooltip title='Tìm kiếm theo mã học kỳ'>
          <SearchOutlined className={`${valueSearchStatusId ? 'text-blue-500' : undefined}`} />
        </Tooltip>
      ),
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'created_at',
      align: 'center',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      align: 'center',
    },
    {
      align: 'center',
      width: '4%',
      render: (index, record) =>
        roleId !== 'MOD' && (
          <Popover
            trigger={'click'}
            placement='left'
            content={
              <Space size={10} key={index} direction='vertical'>
                <ButtonCustom
                  title={'Chỉnh sửa'}
                  icon={<EditOutlined />}
                  handleClick={() => handleClickBtnEditStatusStudent(record)}
                />
                <Popconfirm
                  title='Xóa sinh viên'
                  description={`Bạn có chắc chắn muốn xóa sinh viên ${record.student.id} ?`}
                  icon={<DeleteOutlined />}
                  okText='Xóa'
                  okType='danger'
                  onConfirm={() => handleConfirmDeleteStatusStudent(record.id)}
                >
                  <Button
                    danger
                    loading={deleteStudentStatus.isLoading}
                    className='flex justify-center items-center bg-white'
                    icon={<DeleteOutlined />}
                  >
                    Xóa
                  </Button>
                </Popconfirm>
              </Space>
            }
          >
            <Button className='flex items-center justify-center' icon={<MoreOutlined />} />
          </Popover>
        ),
    },
  ];

  return (
    <div>
      <div
        className={
          roleId !== 'MOD'
            ? 'flex justify-between items-center mb-3 relative'
            : 'flex justify-center items-center mb-3 relative'
        }
      >
        {roleId !== 'MOD' && (
          <ButtonCustom title='Danh sách tình trạng' handleClick={handleClickShowStatusList} icon={<TableOutlined />} />
        )}
        <Title className='hidden xl:block' level={3} style={{ textTransform: 'uppercase', marginBottom: 0 }}>
          Quản lý tình trạng sinh viên
        </Title>
        {roleId !== 'MOD' && (
          <Space>
            <Upload {...props}>
              <ButtonCustom
                title='Thêm danh sách tình trạng'
                loading={importStudentStatusList.isLoading}
                icon={<UploadOutlined />}
              />
            </Upload>
            <ButtonCustom
              title='Thêm tình trạng sinh viên'
              handleClick={handleClickAddStatus}
              icon={<UserAddOutlined />}
            />
          </Space>
        )}
      </div>
      <div className='relative'>
        <Table
          rowKey='id'
          loading={isFetching}
          scroll={{
            y: 630,
          }}
          bordered={true}
          dataSource={data?.data?.items}
          columns={columns}
          pagination={{
            onChange: handleChangePaginationTable,
            defaultCurrent: 1,
            pageSize: pageSize,
            total: data?.data?.total,
            current: pageCurrent,
            showSizeChanger: true,
          }}
        />
        {data?.data?.items.length > 0 && (
          <div className='absolute bottom-0 left-0'>
            <ButtonCustom
              title='Xuất danh sách tình trạng sinh viên'
              loading={exportStudentFormExcel.isLoading}
              handleClick={handleClickBtnExportFileStudentStatusList}
              icon={<DownloadOutlined />}
            />
          </div>
        )}
      </div>
      <ModalFormStudentStatus
        open={openModal}
        onChangeClickOpen={(open) => {
          if (!open) {
            setDataStudent({});
            setOpenModal(false);
          }
        }}
        dataStudent={dataStudent}
      />
      <ModalShowError dataError={dataError} open={openModalError} setOpen={(open) => setOpenModalError(open)} />
      <Drawer
        extra={<h1 className='text-black font-medium text-xl'>Danh sách tình trạng</h1>}
        placement='left'
        open={openDrawer}
        width={1100}
        maskClosable={false}
        onClose={() => setOpenDrawer(false)}
      >
        <TableListStatus open={openDrawer} />
      </Drawer>
    </div>
  );
}

export default ManagerStatusPage;
