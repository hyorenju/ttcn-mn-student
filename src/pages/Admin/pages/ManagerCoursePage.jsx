import { adminCourseApi } from '@/API/admin/adminCourseApi';
import { ButtonCustom } from '@/components/Button';
import { messageErrorToSever } from '@/components/Message';
import { notificationSuccess } from '@/components/Notification';
import { DeleteOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Input, Popconfirm, Space, Table, Tooltip, Typography } from 'antd';
import { useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useDebounce } from 'use-debounce';
import { ModalFormCourse } from '../components/Modal';

function ManagerCoursePage(props) {
  const { Title } = Typography;
  const [openModalFormCourse, setOpenModalFormCourse] = useState(false);
  const [valueSearchCourse, setValueSearchCourse] = useState(null);
  const [dataSource, setDataCourse] = useState({});
  const [pageSize, setPageSize] = useState(10);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [courseId] = useDebounce(valueSearchCourse, 750);
  const queryClient = useQueryClient();

  // Handle get Course Data
  const { data, isFetching } = useQuery({
    staleTime: 60 * 5000,
    cacheTime: 5 * 60 * 5000,
    keepPreviousData: true,
    queryKey: ['courseList', pageCurrent, pageSize, courseId],
    queryFn: () =>
      adminCourseApi.getAllCourse({
        id: courseId,
        page: pageCurrent,
        size: pageSize,
      }),
  });

  // Handle Confirm Delete Course
  const deleteCourse = useMutation({
    mutationKey: ['deleteCourse'],
    mutationFn: (id) => adminCourseApi.deleteCourse(id),
    onSuccess: (res) => {
      if (res && res.success === true) {
        queryClient.invalidateQueries({
          queryKey: ['courseList', pageCurrent, pageSize, courseId],
          exact: true,
        });
        notificationSuccess('Xóa thành công');
      } else messageErrorToSever(res, 'Xóa thất bại');
    },
  });
  const handleConfirmDeleteCourse = (id) => {
    deleteCourse.mutate(id);
  };
  const handleChangePagination = (page, size) => {
    setPageCurrent(page);
    setPageSize(size);
  };
  const handleChangeInputSearchCourseId = (e) => {
    setValueSearchCourse(e.target.value);
    if (!pageCurrent === 1) return pageCurrent === 1;
  };
  const handleClickResetFilterCourseId = () => setValueSearchCourse(null);
  const handleClickCloseFilterCourseId = (close) => close();
  const columns = [
    {
      title: 'Mã khóa',
      dataIndex: 'id',
      align: 'center',
      key: 'id',
      filterDropdown: ({ close }) => (
        <div className='p-3'>
          <Input
            placeholder={'Nhập mã khóa tìm kiếm'}
            value={valueSearchCourse}
            onChange={handleChangeInputSearchCourseId}
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
      filterIcon: () => (
        <Tooltip title='Tìm kiếm theo mã khóa'>
          <SearchOutlined className={`${valueSearchCourse ? 'text-[#1677ff]' : undefined} text-md p-1`} />
        </Tooltip>
      ),
      render: (text) =>
        valueSearchCourse === courseId ? (
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
      title: 'Tên khóa',
      dataIndex: 'name',
      align: 'center',
      key: 'name',
    },
    {
      title: 'Tùy chọn',
      align: 'center',
      render: (e, record, index) => (
        <Popconfirm
          key={index}
          title={`Bạn có chắc chắn muốn xóa ${record.name} ?`}
          icon={<DeleteOutlined />}
          okText='Xóa'
          okType='danger'
          onConfirm={() => handleConfirmDeleteCourse(record.id)}
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
      ),
    },
  ];
  return (
    <div>
      <div className='flex justify-between items-center mb-3'>
        <div className='hidden lg:block w-[10rem]'></div>
        <Title
          style={{
            textAlign: 'center',
            textTransform: 'uppercase',
            marginBottom: 0,
          }}
          level={3}
        >
          Quản lí khóa
        </Title>
        <ButtonCustom
          icon={<PlusCircleOutlined />}
          title={'Thêm khóa'}
          handleClick={() => setOpenModalFormCourse(true)}
        />
      </div>
      <Table
        scroll={{
          y: 5000,
        }}
        loading={isFetching}
        bordered={true}
        dataSource={data?.data?.items}
        columns={columns}
        pagination={{
          onChange: handleChangePagination,
          defaultCurrent: 1,
          pageSize: pageSize,
          total: data?.data?.total,
          current: pageCurrent,
          showSizeChanger: true,
        }}
      />
      <ModalFormCourse
        dataCourse={dataSource}
        openForm={openModalFormCourse}
        onChangeClickOpen={(open) => {
          if (!open) {
            setDataCourse({});
            setOpenModalFormCourse(false);
          }
        }}
      />
    </div>
  );
}

export default ManagerCoursePage;
