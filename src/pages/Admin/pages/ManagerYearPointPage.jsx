import { adminClassApi } from '@/API/admin/adminClassApi';
import { adminDisplayApi } from '@/API/admin/adminDisplayApi';
import { adminPointApi } from '@/API/admin/adminPointApi';
import { ButtonCustom } from '@/components/Button';
import { messageErrorToSever } from '@/components/Message';
import { notificationError, notificationSuccess } from '@/components/Notification';
import {
  setClassId,
  setDataPointOfYear,
  setPageCurrent,
  setPageSize,
  setSortColumn,
  setSortType,
  setStudentId,
  setTotal,
} from '@/redux/Point/pointOfYear';
import { addPoint } from '@/redux/Trash/pointTrashSilce';
import {
  DeleteFilled,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  FilterOutlined,
  MoreOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  UploadOutlined,
  UsergroupDeleteOutlined,
} from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Input, Popconfirm, Popover, Select, Space, Table, Tooltip, Typography, Upload } from 'antd';
import { useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce';
import { ModalFormPointOfYear, ModalShowError, ModalTrashCanPoint } from '../components/Modal';
import { ContentPopoverPoint } from '../components/Popover';

function ManagerYearPointPage() {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { pointOfYearList, studentId, termId, classId, total, pageCurrent, pageSize, filter, sort, year } = useSelector(
    (state) => state.pointOfYear,
  );
  const [dataPoint, setDataPoint] = useState({});
  const [dataError, setDataError] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [valueSearchStudentId, setValueSearchStudentId] = useState('');
  const [openModalTrush, setOpenModalTrush] = useState(false);
  const [openModalError, setOpenModalError] = useState(false);
  const [openModalFormPoint, setOpenModalFormPoint] = useState(false);
  const [studentIdDebounce] = useDebounce(valueSearchStudentId, 750);
  const roleId = JSON.parse(localStorage.getItem('roleId'));
  dispatch(setStudentId(studentIdDebounce));

  // Handle get data points
  const getDataPoint = useQuery({
    keepPreviousData: true,
    queryKey: ['pointOfYearList', studentId, pageCurrent, termId, classId, pageSize, filter, sort],
    queryFn: () =>
      adminPointApi.getPointOfYear({
        year: year,
        studentId: studentId,
        termId: termId,
        classId: classId,
        page: pageCurrent,
        size: pageSize,
        filter: filter,
        sort: sort,
      }),
    onSuccess: (res) => {
      if (res && res.success === true) {
        dispatch(setDataPointOfYear(res.data?.items));
        dispatch(setTotal(res.data?.total));
      } else messageErrorToSever(res, 'Lấy dữ liệu thất bại. Vui lòng thử lại');
    },
  });

  const getClassList = useQuery({
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
    queryKey: ['getClassList'],
    queryFn: () => adminClassApi.getClassSelection(),
    onSuccess: (res) => {
      if (res && res.success === false) {
        notificationError('Lấy danh sách lớp lỗi');
      }
    },
  });

  // Handle click confirm delete major
  const deletePointOfYear = useMutation({
    mutationKeys: ['deletePointOfYear'],
    mutationFn: (id) => adminPointApi.deletePointOfYear(id),
    onSuccess: (res) => {
      if (res && res.success === true) {
        notificationSuccess('Xóa thành công');
        dispatch(deletePointOfYear(res.data.point));
        dispatch(addPoint(res.data));
      } else messageErrorToSever(res, 'Xóa thất bại');
    },
  });
  const deletePointOfYearList = useMutation({
    mutationKeys: ['deletePointOfYearList'],
    mutationFn: () => adminPointApi.deletePointOfYearList(selectedRowKeys),
    onSuccess: (res) => {
      if (res && res.success === true) {
        notificationSuccess('Xóa thành công');
        queryClient.invalidateQueries({
          queryKeys: ['pointOfYearList'],
        });
      } else messageErrorToSever(res, 'Xóa thất bại');
    },
  });
  const importFileData = useMutation({
    mutationKey: ['importFileDataPointOfYear'],
    mutationFn: (file) => {
      const formData = new FormData();
      formData.append('file', file.file);
      return adminPointApi.importPointOfYear(formData);
    },
    onSuccess: (res) => {
      if (res && res.success === true) {
        notificationSuccess('Upload file thành công');
      } else if (res && res.success === false) {
        getDataError.mutate();
        notificationError(`Upload file thất bại. Hãy làm theo đúng form excel được tải về máy của bạn`);
        setOpenModalError(true);
        window.open(res.error?.message);
      } else messageErrorToSever(res);
    },
  });

  // handle export file data student points
  const exportFileData = useMutation({
    mutationKey: ['exportFileDataPoint'],
    mutationFn: () =>
      adminPointApi.exportPointOfYear({
        size: pageSize,
        studentId: studentId,
        termId: termId,
        classId: classId,
        filter: filter,
        sort: sort,
      }),
    onSuccess: (res) => {
      if (res && res.success === true) {
        window.open(res.data);
        notificationSuccess('Đã xuất file excel thành công hãy kiểm tra trong máy của bạn nhé ');
      } else messageErrorToSever(res, 'Có lỗi');
    },
  });
  const getDataError = useMutation({
    mutationKey: ['getDataError'],
    mutationFn: () => adminDisplayApi.getDisplayErrorImport(3),
    onSuccess: (res) => {
      if (res && res.success === true) {
        setDataError(res.data);
      } else messageErrorToSever(res);
    },
  });
  // ===============================
  const hasSelected = selectedRowKeys.length > 0;
  const handleConfirmDeletePoint = (id) => {
    deletePointOfYear.mutate(id);
  };
  const handleExportFileData = () => {
    exportFileData.mutate();
  };
  const handleClickDeletePointOfYearList = () => {
    deletePointOfYearList.mutate();
  };
  const handleChangeInputStudentId = (e) => {
    dispatch(setPageCurrent(1));
    setValueSearchStudentId(e.target.value);
  };
  const handleClickAddPointTerm = () => {
    setOpenModalFormPoint(true);
  };
  const handleEditPointTerm = (record) => {
    setOpenModalFormPoint(true);
    setDataPoint(record);
  };
  const handleClickBtnTrush = () => {
    setOpenModalTrush(true);
  };
  const handleChanePageTable = (page, size) => {
    dispatch(setPageCurrent(page));
    dispatch(setPageSize(size));
  };

  const handleChangeTable = (pagination, filters, sorter) => {
    dispatch(setSortType(sorter?.order));
    dispatch(setSortColumn(sorter?.field));
  };
  const handleChangeSelectClassFilter = (values) => {
    if (values) {
      dispatch(setClassId(values));
    }
  };
  const handleClickResetFilterClassId = () => dispatch(setClassId(null));
  const handleClickCloseFilterClassId = (close) => close();

  const handleClickCloseFilterStudentId = (close) => close();
  const handleClickResetFilterStudentId = () => setValueSearchStudentId('');

  const handleChangeRowSelection = (e, record) => setSelectedRowKeys(record.map((data) => data.id));
  const filterOptionClass = (input, option) => (option?.value ?? '').toLowerCase().includes(input.toLowerCase());
  const optionClass = getClassList.data?.data?.items.map((item) => ({ label: item.id, value: item.id }));
  // =================================

  const props = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    customRequest: (file) => importFileData.mutate(file),
    beforeUpload: (file) => {
      const checkSize = file.size / 1024 / 1024 < 5;
      const isXLXS = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      if (!isXLXS) {
        notificationError(`${file.name} không phải là một file excel`);
        return false;
      }
      if (!checkSize) {
        notificationError(`File tải lên không được quá 5MB`);
        return false;
      }
      return true;
    },
  };

  const columns = [
    {
      title: 'Mã sinh viên',
      dataIndex: ['student', 'id'],
      align: 'center',
      key: 'studentId',
      fixed: 'left',
      filterDropdown: ({ close }) => (
        <div className='p-3'>
          <Input
            placeholder={'Nhập mã sinh viên tìm kiếm'}
            value={valueSearchStudentId}
            onChange={handleChangeInputStudentId}
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
      filterIcon: () => (
        <Tooltip title='Tìm kiếm theo mã sinh viên'>
          <SearchOutlined className={`${studentId ? 'text-[#1677ff]' : undefined} text-md p-1`} />
        </Tooltip>
      ),
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
      width: '10%',
      render: (_, record) => record && <p>{`${record.student?.surname} ${record.student?.lastName}`}</p>,
    },
    {
      title: 'Mã lớp',
      dataIndex: ['student', 'aclass', 'id'],
      align: 'center',
      key: 'classId',
      filterDropdown: ({ close }) => (
        <div className='p-3 flex flex-col gap-2 w-[250px]'>
          <Select
            showSearch
            value={classId}
            options={optionClass}
            loading={getClassList.isLoading}
            filterOption={filterOptionClass}
            placeholder='Chọn mã lớp tìm kiếm'
            optionFilterProp='children'
            onChange={handleChangeSelectClassFilter}
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
          <SearchOutlined className={`${classId ? 'text-blue-500' : undefined}`} />
        </Tooltip>
      ),
    },
    {
      title: 'Năm học',
      dataIndex: ['year', 'id'],
      align: 'center',
    },
    {
      title: 'ĐTB (hệ 10)',
      dataIndex: 'avgPoint10',
      align: 'center',
      key: 'avgPoint10',
      sorter: true,
      width: '8%',
    },
    {
      title: 'ĐTB (hệ 4)',
      dataIndex: 'avgPoint4',
      align: 'center',
      key: 'avgPoint4',
      sorter: true,
    },
    {
      title: 'ĐRL',
      dataIndex: 'trainingPoint',
      align: 'center',
      key: 'trainingPoint',
      sorter: true,
    },
    {
      title: 'ĐTBTL (hệ 10)',
      dataIndex: 'pointAcc10',
      width: '8%',
      align: 'center',
      key: 'pointAcc10',
      sorter: true,
    },
    {
      title: 'ĐTBTL (hệ 4)',
      dataIndex: 'pointAcc4',
      align: 'center',
      key: 'pointAcc4',
      sorter: true,
      width: '8%',
    },
    {
      title: 'Số tín chỉ đã đăng ký',
      align: 'center',
      dataIndex: 'creditsRegistered',
    },
    {
      title: 'Số tín chỉ đạt',
      align: 'center',
      dataIndex: 'creditsPassed',
    },
    {
      title: 'Số tín chỉ không đạt',
      align: 'center',
      dataIndex: 'creditsNotPassed',
    },
    {
      title: 'TCTL',
      dataIndex: 'creditsAcc',
      align: 'center',
      key: 'creditsAcc',
    },
    {
      fixed: 'right',
      align: 'center',
      width: '4%',
      render: (e, record, idx) =>
        roleId !== 'MOD' && (
          <Popover
            key={idx}
            trigger={'click'}
            placement='left'
            content={
              <Space direction='vertical'>
                <ButtonCustom
                  title='Chỉnh sửa'
                  icon={<EditOutlined />}
                  handleClick={() => handleEditPointTerm(record)}
                />
                <Popconfirm
                  title={`Bạn có chắc chắn muốn xóa điểm của sinh viên ${record.student.id} trong học kỳ ${record.year}`}
                  icon={<DeleteOutlined />}
                  okText='Xóa'
                  okType='danger'
                  onConfirm={() => handleConfirmDeletePoint(record.id)}
                >
                  <Button
                    danger
                    loading={deletePointOfYear.isLoading}
                    className='flex justify-center items-center text-md shadow-md'
                    icon={<DeleteOutlined />}
                  >
                    Xóa
                  </Button>
                </Popconfirm>
              </Space>
            }
          >
            <Button className='flex items-center justify-center  bg-white' icon={<MoreOutlined />} />
          </Popover>
        ),
    },
  ];
  return (
    <div>
      <div
        className={
          roleId !== 'MOD' ? 'flex justify-between items-center mb-3' : 'flex justify-center items-center mb-3'
        }
      >
        {roleId !== 'MOD' && (
          <Space>
            <ButtonCustom
              title='Xóa hết'
              icon={<UsergroupDeleteOutlined />}
              type='primary'
              disabled={!hasSelected}
              handleClick={handleClickDeletePointOfYearList}
            />
            {roleId === 'SUPERADMIN' && (
              <ButtonCustom title='Thùng rác' icon={<DeleteFilled />} handleClick={handleClickBtnTrush} />
            )}
            <Popover placement='bottom' content={<ContentPopoverPoint />} trigger='click'>
              <Button
                icon={<FilterOutlined />}
                className={`${
                  filter.point || filter.accPoint || filter.traningPoint ? 'text-blue-500' : undefined
                } flex justify-center items-center text-md bg-white`}
              >
                Lọc theo khoảng điểm
              </Button>
            </Popover>
          </Space>
        )}
        <Title
          style={{
            textAlign: 'center',
            textTransform: 'uppercase',
            marginBottom: 0,
          }}
          className='hidden xl:block'
          level={3}
        >
          Danh sách điểm theo năm
        </Title>
        {roleId !== 'MOD' && (
          <Space>
            <Upload {...props}>
              <ButtonCustom
                title={'Thêm danh sách điểm'}
                icon={<UploadOutlined />}
                loading={importFileData.isLoading}
              />
            </Upload>
            <ButtonCustom icon={<PlusCircleOutlined />} handleClick={handleClickAddPointTerm} title={'Thêm điểm'} />
          </Space>
        )}
      </div>
      <div className='relative'>
        <Table
          scroll={{
            x: 1800,
            y: 630,
          }}
          rowKey='id'
          rowSelection={{
            onChange: handleChangeRowSelection,
          }}
          bordered={true}
          loading={getDataPoint.isFetching}
          dataSource={pointOfYearList}
          columns={columns}
          onChange={handleChangeTable}
          pagination={{
            onChange: handleChanePageTable,
            defaultCurrent: 1,
            pageSize: pageSize,
            total: total,
            current: pageCurrent,
            showSizeChanger: true,
          }}
        />
        {pointOfYearList.length > 0 && (
          <div className='absolute bottom-3 left-0'>
            <ButtonCustom
              title='Xuất danh sách điểm'
              loading={exportFileData.isLoading}
              handleClick={handleExportFileData}
              icon={<DownloadOutlined />}
            />
          </div>
        )}
      </div>
      <ModalFormPointOfYear
        openForm={openModalFormPoint}
        dataPoint={dataPoint}
        onChangeClickOpen={(open) => {
          if (!open) {
            setDataPoint({});
            setOpenModalFormPoint(false);
          }
        }}
      />
      <ModalShowError open={openModalError} setOpen={(open) => setOpenModalError(open)} dataError={dataError} />
      {roleId === 'SUPERADMIN' && <ModalTrashCanPoint open={openModalTrush} close={() => setOpenModalTrush(false)} />}
    </div>
  );
}

export default ManagerYearPointPage;
