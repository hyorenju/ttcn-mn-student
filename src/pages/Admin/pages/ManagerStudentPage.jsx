import { adminClassApi } from '@/API/admin/adminClassApi';
import { adminDisplayApi } from '@/API/admin/adminDisplayApi';
import { adminMajorApi } from '@/API/admin/adminMajorApi';
import { adminStudentApi } from '@/API/admin/adminStudentApi';
import { ButtonCustom } from '@/components/Button';
import { messageErrorToSever } from '@/components/Message';
import { notificationSuccess } from '@/components/Notification';
import {
  deleteStudent,
  setClassId,
  setCourseId,
  setDataStudentList,
  setFamilySituation,
  setMajorId,
  setPageCurrent,
  setPageSize,
  setStudentId,
  setTotal,
} from '@/redux/Student/studentSilce';
import { addStudent } from '@/redux/Trash/studentTrashSlice';
import {
  DeleteFilled,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  MoreOutlined,
  SearchOutlined,
  SolutionOutlined,
  UploadOutlined,
  UserAddOutlined,
  UsergroupDeleteOutlined,
} from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Drawer, Input, Popconfirm, Popover, Select, Space, Table, Tooltip, Typography, Upload } from 'antd';
import { useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce';
import { DescriptionInfoStudent } from '../components/Description';
import { ModalFormStudentInfo, ModalShowError, ModalTrashCanStudent } from '../components/Modal';

function ManagerStudentPage() {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { studentList, studentId, total, pageCurrent, pageSize, filter } = useSelector((state) => state.studentList);
  const [dataError, setDataError] = useState([]);
  const [valueSearchStudent, setValueSearchStudent] = useState(null);
  const [valueSearchCourse, setValueSearchCourse] = useState(null);
  const [openDrawerInfo, setOpenDrawerInfo] = useState(false);
  const [openModalFormUser, setOpenModalFormStudent] = useState(false);
  const [openModalError, setOpenModalError] = useState(false);
  const [openModalTrush, setOpenModalTrush] = useState(false);
  const [dataStudent, setDataStudent] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [studentIdDebounce] = useDebounce(valueSearchStudent, 750);
  const [courseIdDebounce] = useDebounce(valueSearchCourse, 750);
  dispatch(setStudentId(studentIdDebounce));
  dispatch(setCourseId(courseIdDebounce));

  const getStudentList = useQuery({
    keepPreviousData: true,
    queryKey: ['studentList', pageSize, pageCurrent, studentId, filter],
    queryFn: () =>
      adminStudentApi.getAllStudent({
        studentId: studentId,
        page: pageCurrent,
        size: pageSize,
        filter: filter,
      }),
    onSuccess: (res) => {
      if (res && res.success === true) {
        dispatch(setTotal(res.data?.total));
        dispatch(setDataStudentList(res.data?.items));
      }
    },
  });

  const getClassList = useQuery({
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
    queryKey: ['getClassList'],
    queryFn: () => adminClassApi.getClassSelection(),
    onSuccess: (res) => {
      if (res && res.success === false) {
        messageErrorToSever('Lấy danh sách lớp lỗi');
      }
    },
  });

  const getMajorList = useQuery({
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
    queryKey: ['getMajorList'],
    queryFn: () => adminMajorApi.getMajorSelection(),
    onSuccess: (res) => {
      if (res && res.success === false) {
        messageErrorToSever('Lấy danh sách ngành lỗi');
      }
    },
  });

  const getDataError = useMutation({
    mutationKey: ['getDataErrorImport'],
    mutationFn: () => adminDisplayApi.getDisplayErrorImport(1),
    onSuccess: (res) => {
      if (res && res.success === true) {
        setDataError(res.data);
      } else messageErrorToSever(res, 'Thất bại');
    },
  });

  const hasSelected = selectedRowKeys.length > 0;
  const deleteStudentList = useMutation({
    mutationFn: () => adminStudentApi.deleteListStudent({ ids: selectedRowKeys }),
    onSuccess: (res) => {
      if (res && res.success) {
        queryClient.invalidateQueries({
          queryKey: ['studentList', pageSize, pageCurrent, studentId, filter],
          exact: true,
        });
        queryClient.invalidateQueries({
          queryKey: ['studentListTrash'],
        });
        setSelectedRowKeys([]);
        notificationSuccess(res.data?.data);
      } else messageErrorToSever(res, 'Thất bại');
    },
  });

  const deleteStudents = useMutation({
    mutationFn: (id) => adminStudentApi.deleteStudent(id),
    onSuccess: (res) => {
      if (res && res.success === true) {
        notificationSuccess('Xóa thành công');
        dispatch(deleteStudent(res.data?.student));
        dispatch(addStudent(res.data));
      } else messageErrorToSever('Xóa sinh viên thất bại');
    },
  });

  const importStudentList = useMutation({
    mutationKey: ['importStudentList'],
    mutationFn: (file) => {
      const formData = new FormData();
      formData.append('file', file.file);
      return adminStudentApi.importStudentList(formData);
    },
    onSuccess: (res) => {
      if (res && res.success === true) {
        notificationSuccess('Upload file thành công');
      } else if (res && res.success === false) {
        getDataError.mutate();
        setOpenModalError(true);
        window.open(res.error?.message);
        messageErrorToSever('Upload file thất bại. Hãy làm theo đúng form excel được tải về máy của bạn');
      }
    },
  });

  // Export File Data List Student
  const exportStudentFormExcel = useMutation({
    mutationKey: ['exportFileDataStudent'],
    mutationFn: () =>
      adminStudentApi.exportStudentList({
        studentId: studentId,
        filter: filter,
      }),
    onSuccess: (res) => {
      if (res && res.success === true) {
        window.open(res.data);
        notificationSuccess('Đã xuất file excel thành công hãy kiểm tra trong máy của bạn nhé ');
      } else {
        messageErrorToSever(res, 'Có lỗi trong quá trình lưu file');
      }
    },
  });

  // ====================================
  const optionFamilySituation = [
    { label: 'Không', value: 'Không' },
    { label: 'Khuyết tật', value: 'Khuyết tật' },
    { label: 'Mồ côi cha mẹ', value: 'Mồ côi cha mẹ' },
    { label: 'Nghèo, cận nghèo', value: 'Nghèo cận nghèo' },
    { label: 'Dân tộc thiểu số, miền núi', value: 'Dân tộc thiểu số' },
    { label: 'Con thương binh liệt sĩ', value: 'Con thương binh liệt sĩ' },
  ];
  const optionMajor = getMajorList.data?.data?.items.map((item) => ({ label: item.id, value: item.id }));
  const optionClass = getClassList.data?.data?.items.map((item) => ({ label: item.id, value: item.id }));
  const filterOptionClass = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  const filterOptionMajor = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  const handleChangePaginationTable = (page, size) => {
    dispatch(setPageSize(size));
    dispatch(setPageCurrent(page));
  };
  const handleClickBtnEditStudent = (record) => {
    setDataStudent(record);
    setOpenModalFormStudent(true);
  };
  const handleClickBtnShowDetailStudent = (record) => {
    setDataStudent(record);
    setOpenDrawerInfo(true);
  };
  const handleClickBtnExportFileStudentList = () => {
    exportStudentFormExcel.mutate();
  };
  const handleConfirmDeleteStudent = (id) => {
    deleteStudents.mutate(id);
  };
  const handleConfirmDeleteStudentList = () => {
    deleteStudentList.mutate(selectedRowKeys);
  };
  const handleChangeInputStudentId = (e) => {
    const studentId = e.target.value;
    setValueSearchStudent(studentId);
    dispatch(setPageCurrent(1));
  };
  const handleChangeInputCourseId = (e) => {
    const courseId = e.target.value;
    setValueSearchCourse(courseId);
    dispatch(setPageCurrent(1));
  };
  const handleClickBtnAddStudent = () => {
    setOpenModalFormStudent(true);
  };
  const handleClickBtnCloseDrawerDetailStudent = () => {
    setOpenDrawerInfo(false);
    setDataStudent({});
  };
  const handleClickBtnTrush = () => {
    setOpenModalTrush(true);
  };
  const handleChangeRowSelection = (e, record) => setSelectedRowKeys(record.map((data) => data.id));
  const handleChangeSelectClassFilter = (values) => {
    if (values) {
      dispatch(setClassId(values));
    }
  };
  const handleChangeSelectMajorFilter = (values) => {
    if (values) {
      dispatch(setMajorId(values));
    }
  };
  const handleChangeSelectFamilySituationFilter = (values) => {
    if (values) {
      dispatch(setFamilySituation(values));
    }
  };
  const handleClickResetFilterStudentId = () => setValueSearchStudent(null);
  const handleClickCloseFilterStudentId = (close) => close();

  const handleClickResetFilterClassId = () => dispatch(setClassId(null));
  const handleClickCloseFilterClassId = (close) => close();

  const handleClickResetFilterCourseId = () => setValueSearchCourse(null);
  const handleClickCloseFilterCourseId = (close) => close();

  const handleClickResetFilterMajorId = () => dispatch(setMajorId(null));
  const handleClickCloseFilterMajorId = (close) => close();

  const handleClickResetFilterFamilySituation = () => dispatch(setFamilySituation(null));
  const handleClickCloseFilterFamilySituation = (close) => close();

  // ====================================

  const props = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    customRequest: (file) => importStudentList.mutate(file),
    beforeUpload: (file) => {
      const checkSize = file.size / 1024 / 1024 < 5;
      const isXLXS = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      if (!isXLXS) {
        messageErrorToSever(`${file.name} không phải là một file excel`);
        return false;
      }
      if (!checkSize) {
        messageErrorToSever(`File tải lên không được quá 5MB`);
        return false;
      }
      return true;
    },
  };
  const columns = [
    {
      title: 'Mã sinh viên',
      dataIndex: 'id',
      align: 'center',
      fixed: 'left',
      width: '10%',
      filterDropdown: ({ close }) => (
        <div className='p-3'>
          <Input
            placeholder={'Nhập mã sinh viên tìm kiếm'}
            value={valueSearchStudent}
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
          <SearchOutlined className={`${studentId ? 'text-blue-500' : undefined} text-md p-1`} />
        </Tooltip>
      ),
      render: (text) =>
        valueSearchStudent === studentIdDebounce ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: '#ffc069',
              padding: 0,
            }}
            searchWords={[valueSearchStudent]}
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
      render: (_, record) => record && <p>{`${record.surname} ${record.lastName}`}</p>,
    },
    {
      title: 'Khóa',
      dataIndex: ['course', 'name'],
      align: 'center',
      filterDropdown: ({ close }) => (
        <div className='p-3'>
          <Input
            placeholder={'Nhập mã khóa tìm kiếm'}
            value={valueSearchCourse}
            onChange={handleChangeInputCourseId}
            className='w-[250px] mb-3 block'
          />
          <Space>
            <ButtonCustom handleClick={handleClickResetFilterCourseId} size='small' title={'Reset'} />
            <Button type='link' size='small' onClick={() => handleClickCloseFilterCourseId(close)}>
              Đóng
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <Tooltip title='Tìm kiếm theo mã khóa'>
          <SearchOutlined className={`${filter.courseId ? 'text-blue-500' : undefined} text-md p-1`} />
        </Tooltip>
      ),
      render: (text) =>
        valueSearchCourse === courseIdDebounce ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: '#ffc069',
              padding: 0,
            }}
            searchWords={[valueSearchCourse]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    },
    {
      title: 'Mã lớp',
      dataIndex: ['aclass', 'id'],
      align: 'center',
      filterDropdown: ({ close }) => (
        <div className='p-3 flex flex-col gap-2 w-[230px]'>
          <Select
            showSearch
            value={filter?.classId}
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
          <SearchOutlined className={`${filter.classId ? 'text-blue-500' : undefined}`} />
        </Tooltip>
      ),
    },
    {
      title: 'Mã ngành',
      dataIndex: ['major', 'id'],
      align: 'center',
      filterDropdown: ({ close }) => (
        <div className='p-3 flex flex-col gap-2 w-[320px]'>
          <Select
            showSearch
            value={filter?.majorId}
            options={optionMajor}
            loading={getClassList.isLoading}
            filterOption={filterOptionMajor}
            placeholder='Chọn ngành tìm kiếm'
            optionFilterProp='children'
            onChange={handleChangeSelectMajorFilter}
          />
          <Space>
            <ButtonCustom handleClick={handleClickResetFilterMajorId} size='small' title={'Reset'} />
            <Button type='link' size='small' onClick={() => handleClickCloseFilterMajorId(close)}>
              Đóng
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <Tooltip title='Tìm kiếm theo mã ngành'>
          <SearchOutlined className={`${filter.majorId ? 'text-blue-500' : undefined}`} />
        </Tooltip>
      ),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      align: 'center',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      align: 'center',
      width: '15%',
    },
    {
      title: 'Hoàn cảnh gia đình',
      dataIndex: 'familySituation',
      width: '12%',
      align: 'center',
      filterDropdown: ({ close }) => (
        <div className='p-3 flex flex-col gap-2 w-[270px]'>
          <Select
            value={filter?.familySituation}
            options={optionFamilySituation}
            placeholder='Chọn hoàn cảnh gia đình'
            onChange={handleChangeSelectFamilySituationFilter}
          />
          <Space>
            <ButtonCustom handleClick={handleClickResetFilterFamilySituation} size='small' title={'Reset'} />
            <Button type='link' size='small' onClick={() => handleClickCloseFilterFamilySituation(close)}>
              Đóng
            </Button>
          </Space>
        </div>
      ),
      filterIcon: () => (
        <Tooltip title='Tìm kiếm hoàn cảnh gia đình'>
          <SearchOutlined className={`${filter.familySituation ? 'text-blue-500' : undefined}`} />
        </Tooltip>
      ),
    },
    {
      align: 'center',
      width: '4%',
      fixed: 'right',
      render: (e, record, index) => (
        <Popover
          trigger={'click'}
          placement='left'
          content={
            <Space size={10} key={index} direction='vertical'>
              <ButtonCustom
                title={'Chỉnh sửa'}
                icon={<EditOutlined />}
                handleClick={() => handleClickBtnEditStudent(record)}
              />
              <ButtonCustom
                title={'Xem chi tiết'}
                icon={<SolutionOutlined />}
                handleClick={() => handleClickBtnShowDetailStudent(record)}
              />
              <Popconfirm
                title='Xóa sinh viên'
                description={`Bạn có chắc chắn muốn xóa sinh viên ${record.surname} ${record.lastName} ?`}
                icon={<DeleteOutlined />}
                okText='Xóa'
                okType='danger'
                onConfirm={() => handleConfirmDeleteStudent(record.id)}
              >
                <Button
                  type='primary'
                  danger
                  loading={deleteStudents.isLoading}
                  className='flex justify-center items-center bg-white'
                  icon={<DeleteOutlined />}
                >
                  Xóa
                </Button>
              </Popconfirm>
            </Space>
          }
        >
          <Button className='flex items-center justify-center bg-white' icon={<MoreOutlined />} />
        </Popover>
      ),
    },
  ];
  return (
    <div>
      <div className='flex justify-between items-center mb-3 relative'>
        <Space>
          <ButtonCustom
            title='Xóa hết'
            icon={<UsergroupDeleteOutlined />}
            type='primary'
            disabled={!hasSelected}
            loading={deleteStudentList.isLoading}
            handleClick={handleConfirmDeleteStudentList}
          />
          <ButtonCustom title='Thùng rác' icon={<DeleteFilled />} handleClick={handleClickBtnTrush} />
        </Space>
        <Title className='hidden xl:block' level={3} style={{ textTransform: 'uppercase', marginBottom: 0 }}>
          Danh sách sinh viên
        </Title>
        <Space size={8}>
          <Upload {...props}>
            <ButtonCustom
              title='Thêm danh sách sinh viên'
              icon={<UploadOutlined />}
              loading={importStudentList.isLoading}
            />
          </Upload>
          <ButtonCustom title='Thêm sinh viên' icon={<UserAddOutlined />} handleClick={handleClickBtnAddStudent} />
        </Space>
      </div>
      <div className='relative'>
        <Table
          scroll={{
            x: 1500,
            y: 630,
          }}
          rowKey='id'
          loading={getStudentList.isFetching}
          rowSelection={{
            onChange: handleChangeRowSelection,
          }}
          bordered={true}
          dataSource={studentList}
          columns={columns}
          pagination={{
            onChange: handleChangePaginationTable,
            defaultCurrent: 1,
            pageSize: pageSize,
            total: total,
            current: pageCurrent,
            showSizeChanger: true,
            pageSizeOptions: [10, 50, 100, 200],
          }}
        />
        <div className='absolute bottom-0 left-0'>
          <ButtonCustom
            title='Xuất danh sách sinh viên'
            loading={exportStudentFormExcel.isLoading}
            handleClick={handleClickBtnExportFileStudentList}
            icon={<DownloadOutlined />}
          />
        </div>
      </div>
      <ModalFormStudentInfo
        dataStudent={dataStudent}
        openForm={openModalFormUser}
        onChangeClickOpen={(open) => {
          if (!open) {
            setDataStudent({});
            setOpenModalFormStudent(false);
          }
        }}
      />
      <ModalTrashCanStudent open={openModalTrush} close={() => setOpenModalTrush(false)} />
      <ModalShowError dataError={dataError} open={openModalError} setOpen={(open) => setOpenModalError(open)} />
      <Drawer size='large' open={openDrawerInfo} onClose={handleClickBtnCloseDrawerDetailStudent} placement='right'>
        <DescriptionInfoStudent dataStudent={dataStudent} />
      </Drawer>
    </div>
  );
}

export default ManagerStudentPage;
