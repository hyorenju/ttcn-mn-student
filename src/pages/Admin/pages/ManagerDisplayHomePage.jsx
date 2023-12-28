import { adminDisplayApi } from '@/API/admin/adminDisplayApi';
import { ButtonCustom } from '@/components/Button';
import { EditOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Image, Table, Typography } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ModalFormErrorImport } from '../components/Modal';

function ManagerDisplayHomePage() {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const [pageCurrent, setPageCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [openModalForm, setOpenModalForm] = useState(false);
  const [dataForm, setDataForm] = useState({});

  const { data, isFetching } = useQuery({
    staleTime: 14 * 60 * 5000,
    cacheTime: 15 * 60 * 5000,
    keepPreviousData: true,
    queryKey: ['displayHomepage', pageCurrent, pageSize],
    queryFn: () =>
      adminDisplayApi.getDisplayList({
        page: pageCurrent,
        size: pageSize,
        location: 'HomeBody',
      }),
  });

  // ====================================
  const handleChangePaginationTable = (page, size) => {
    dispatch(setPageSize(size));
    dispatch(setPageCurrent(page));
  };
  const handleClickBtnEditDisplay = (record) => {
    setDataForm(record);
    setOpenModalForm(true);
  };

  // ====================================

  const columns = [
    {
      width: '15%',
      title: 'Ảnh mẫu',
      align: 'center',
      render: (index, record) => <Image src={record.img} width={150} height={100} className='object-cover' />,
    },
    {
      title: 'Tiêu đề',
      align: 'center',
      width: '10%',
      dataIndex: 'title',
    },
    { title: 'Nội dung', dataIndex: 'content', width: '40%' },
    {
      align: 'center',
      width: '10%',
      render: (e, record, index) => (
        <ButtonCustom
          title={'Chỉnh sửa'}
          icon={<EditOutlined />}
          handleClick={() => handleClickBtnEditDisplay(record)}
        />
      ),
    },
  ];
  return (
    <div>
      <div className='mb-3 relative'>
        <Title
          className='hidden xl:block'
          level={3}
          style={{
            textTransform: 'uppercase',
            marginBottom: 12,
            textAlign: 'center',
          }}
        >
          Hiển thị trang chủ
        </Title>
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
      <ModalFormErrorImport
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

export default ManagerDisplayHomePage;
