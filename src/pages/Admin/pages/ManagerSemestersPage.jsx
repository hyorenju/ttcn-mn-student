import { adminSemesterApi } from '@/API/admin/adminSemesterApi';
import { ButtonCustom } from '@/components/Button';
import { messageErrorToSever } from '@/components/Message';
import { notificationSuccess } from '@/components/Notification';
import { DeleteOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Input, Popconfirm, Space, Table, Tooltip, Typography } from 'antd';
import { useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { ModalFormTerm } from '../components/Modal';

function ManagerSemestersPage(props) {
  const { Title } = Typography;
  const [openModalTerm, setOpenModalTerm] = useState(false);
  const [dataTerm, setDataTerm] = useState({});
  const [valueSearchTerm, setValueSearchTerm] = useSearchParams('');
  const [pageSize, setPageSize] = useState(10);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [termId] = useDebounce(valueSearchTerm.get('termId'), 750);
  const queryClient = useQueryClient();

  // handle get data terms
  const { data, isLoading } = useQuery({
    staleTime: 60 * 5000,
    cacheTime: 5 * 60 * 5000,
    keepPreviousData: true,
    queryKey: ['semesterList', termId, pageCurrent, pageSize],
    queryFn: () =>
      adminSemesterApi.getAllSemester({
        id: termId,
        page: pageCurrent,
        size: pageSize,
      }),
  });

  // hande  confirm delete term
  const confirmDeleteSemester = useMutation({
    mutationKey: ['deleteSemester'],
    mutationFn: (id) => adminSemesterApi.deleteSemester(id),
    onSuccess: (res) => {
      if (res && res.success === true) {
        queryClient.invalidateQueries({
          queryKey: ['semesterList', termId, pageCurrent, pageSize],
          exact: true,
        });
        notificationSuccess('Xóa học kỳ thành công');
      } else messageErrorToSever(res, 'Xóa học kỳ thất bại');
    },
  });
  const handleConfirmDeleteSemesters = (id) => {
    confirmDeleteSemester.mutate(id);
  };
  const handleChangeInputTermId = (e) => {
    const termId = e.target.value;
    if (termId) {
      setPageCurrent(1);
      setValueSearchTerm({ termId });
    } else {
      setValueSearchTerm({});
    }
  };
  const handleClickAddTerm = () => {
    setOpenModalTerm(true);
  };
  const handleChangePagination = (page, size) => {
    setPageCurrent(page);
    setPageSize(size);
  };
  const handleClickResetFilterStudentId = () => setValueSearchTerm({});
  const handleClickCloseFilterStudentId = (close) => close();
  const columns = [
    {
      title: 'Mã học kỳ',
      align: 'center',
      dataIndex: 'id',
      filterDropdown: ({ close }) => (
        <div className='p-3'>
          <Input
            placeholder={'Nhập mã học kỳ tìm kiếm'}
            value={valueSearchTerm.get('termId')}
            onChange={handleChangeInputTermId}
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
      filterIcon: (filtered) => (
        <Tooltip title='Tìm kiếm theo mã học kỳ'>
          <SearchOutlined className={`${filtered ? 'text-[#1677ff]' : undefined} text-md p-1`} />
        </Tooltip>
      ),
      render: (text) =>
        valueSearchTerm.get('termId') === termId ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: '#ffc069',
              padding: 0,
            }}
            searchWords={[valueSearchTerm.get('termId')]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    },
    {
      title: 'Tên học kỳ',
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
        <div className='hidden lg:block w-[10rem]'></div>
        <Title
          style={{
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: 0,
          }}
          level={3}
        >
          Danh sách học kỳ
        </Title>
        <ButtonCustom title={'Thêm học kỳ'} handleClick={handleClickAddTerm} icon={<PlusCircleOutlined />} />
      </div>
      <Table
        scroll={{
          y: 5000,
        }}
        dataSource={data?.data?.items}
        bordered={true}
        columns={columns}
        loading={isLoading}
        pagination={{
          onChange: handleChangePagination,
          defaultCurrent: 1,
          pageSize: pageSize,
          total: data?.data?.total,
          current: pageCurrent,
          showSizeChanger: true,
        }}
      />

      <ModalFormTerm
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
