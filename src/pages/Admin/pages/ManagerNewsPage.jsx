import { adminDisplayApi } from '@/API/admin/adminDisplayApi';
import { ButtonCustom } from '@/components/Button';
import { EditOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Image, Space, Table, Typography } from 'antd';
import React, { useState } from 'react';
import { ModalFormNews } from '../components/Modal';

function ManagerNewsPage() {
  const { Title } = Typography;
  const [pageCurrent, setPageCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [openModalForm, setOpenModalForm] = useState(false);
  const [dataForm, setDataForm] = useState({});

  const { data, isFetching } = useQuery({
    cacheTime: 10 * 60 * 1000,
    keepPreviousData: true,
    queryKey: ['listErrorList', pageCurrent, pageSize],
    queryFn: async () => await adminDisplayApi.getDisplayList({ page: pageCurrent, size: pageSize }),
  });

  // ====================================
  const handleChangePaginationTable = (page, size) => {
    setPageSize(size);
    setPageCurrent(page);
  };
  const handleClickBtnEditDisplay = (record) => {
    setDataForm(record);
    setOpenModalForm(true);
  };
  const handleClickAddNews = () => {
    setOpenModalForm(true);
  };
  // ====================================

  const columns = [
    {
      align: 'center',
      width: '3%',
      dataIndex: 'id',
    },
    {
      width: '10%',
      title: 'Ảnh',
      align: 'center',
      render: (index, record) => <Image src={record.img} width={150} height={100} className='object-cover' />,
    },
    {
      title: 'Tiêu đề',
      align: 'center',
      width: '20%',
      dataIndex: 'title',
    },
    { title: 'Nội dung', dataIndex: 'content', width: '25%' },
    {
      align: 'center',
      width: '10%',
      render: (e, record, index) => (
        <Space>
          <ButtonCustom
            title={'Chỉnh sửa'}
            icon={<EditOutlined />}
            handleClick={() => handleClickBtnEditDisplay(record)}
          />
          <ButtonCustom
            title={'Xóa'}
            danger
            type='primary'
            icon={<EditOutlined />}
            handleClick={() => handleClickBtnEditDisplay(record)}
          />
        </Space>
      ),
    },
  ];
  return (
    <div>
      <div className='mb-3 relative'>
        <div className='flex justify-between items-center'>
          <ButtonCustom title={'Xóa'} />
          <Title
            className='hidden xl:block'
            level={3}
            style={{ textTransform: 'uppercase', marginBottom: 12, textAlign: 'center' }}
          >
            Quản lí tin tức
          </Title>
          <ButtonCustom title={'Thêm tin tức'} handleClick={handleClickAddNews} />
        </div>
        <Table
          scroll={{
            y: 630,
          }}
          rowKey='id'
          loading={isFetching}
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
            pageSizeOptions: [10, 50, 100, 200],
          }}
        />
      </div>
      <ModalFormNews
        onSuccess={() => {
          setOpenModalForm(false);
        }}
        dataForm={dataForm}
        openForm={openModalForm}
        onChangeClickOpen={(open) => {
          if (!open) {
            setDataForm({});
            setOpenModalForm(false);
          }
        }}
      />
    </div>
  );
}

export default ManagerNewsPage;
