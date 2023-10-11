import { DeleteOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Input, Popconfirm, Space, Table, Tooltip, Typography } from 'antd';
import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { adminSemesterApi } from '../../../API/admin/adminSemesterApi';
import { notificationError, notificationSuccess } from '../../../components/Notification';
import { ModalFormTerm } from '../components/Modal';

function ManagerSemestersPage(props) {
  const { Title } = Typography;
  const [openModalTerm, setOpenModalTerm] = useState(false);
  const [dataTerm, setDataTerm] = useState({});
  const [valueSearchTerm, setValueSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [termId] = useDebounce(valueSearchTerm, 750);
  const queryClient = useQueryClient();

  // handle get data terms
  const { data, isLoading, error } = useQuery({
    staleTime: 60 * 5000,
    cacheTime: 5 * 60 * 5000,
    keepPreviousData: true,
    queryKey: ['semesterList', termId, pageCurrent, pageSize],
    queryFn: async () => await adminSemesterApi.getAllSemester({ id: termId, page: pageCurrent, size: pageSize }),
  });
  if (error) {
    notificationError(error?.data?.data);
  }

  // hande  confirm delete term
  const confirmDeleteSemester = useMutation({
    mutationKey: ['deleteSemester'],
    mutationFn: async (id) => await adminSemesterApi.deleteSemester(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['semesterList', termId, pageCurrent, pageSize],
        exact: true,
      });
      notificationSuccess(data?.data?.data);
    },
  });
  const handleConfirmDeleteSemesters = (id) => {
    confirmDeleteSemester.mutate(id);
  };
  const handleChangeInputTermId = (e) => {
    setPageCurrent(1);
    setValueSearchTerm(e.target.value);
  };
  const handleClickAddTerm = () => {
    setOpenModalTerm(true);
  };

  const columns = [
    {
      title: 'Mã học kì',
      align: 'center',
      dataIndex: 'id',
    },
    {
      title: 'Tên học kì',
      dataIndex: 'termName',
      key: 'termName',
      align: 'center',
    },
    {
      title: 'Hành động',
      render: (e, record, idx) => (
        <Popconfirm
          key={idx}
          title='Bạn có chắc chắn muốn xóa ?'
          icon={<DeleteOutlined />}
          okText='Xóa'
          okType='danger'
          onConfirm={() => handleConfirmDeleteSemesters(record.id)}
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
        <Space>
          <Tooltip title='Tìm kiếm học kì'>
            <Input
              value={valueSearchTerm}
              placeholder='Nhập mã học kì'
              className='shadow-sm w-[230px]'
              prefix={<SearchOutlined className='opacity-60 mr-1' />}
              onChange={handleChangeInputTermId}
            />
          </Tooltip>
        </Space>
        <Title style={{ textTransform: 'uppercase', textAlign: 'center', marginBottom: 0 }} level={3}>
          Danh sách học kì
        </Title>
        <Button
          onClick={handleClickAddTerm}
          icon={<PlusCircleOutlined />}
          className='flex justify-center items-center bg-white font-medium shadow-lg'
        >
          Thêm học kì
        </Button>
      </div>
      <Table
        scroll={{
          y: 630,
        }}
        rowKey='id'
        rowSelection={{
          onChange: () => {},
        }}
        dataSource={data?.data?.items}
        bordered={true}
        columns={columns}
        loading={isLoading}
        pagination={{
          onChange: (page, size) => {
            setPageCurrent(page);
            setPageSize(size);
          },
          defaultCurrent: 1,
          pageSize: pageSize,
          total: data?.data?.total,
          current: pageCurrent,
          showSizeChanger: true,
        }}
      />

      <ModalFormTerm
        onSuccess={() => {
          setOpenModalTerm(false);
        }}
        openForm={openModalTerm}
        dataTerm={dataTerm}
        onChangeClickOpen={(open) => {
          if (!open) {
            setDataTerm({});
            setOpenModalTerm(false);
          }
        }}
      />
    </div>
  );
}

export default ManagerSemestersPage;
