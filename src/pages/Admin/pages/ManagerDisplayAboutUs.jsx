import { adminDisplayApi } from '@/API/admin/adminDisplayApi';
import { ButtonCustom } from '@/components/Button';
import { EditOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Image, Table, Typography } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

function ManagerDisplayAboutUs() {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const [pageCurrent, setPageCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isFetching } = useQuery({
    staleTime: 14 * 60 * 5000,
    cacheTime: 15 * 60 * 5000,
    keepPreviousData: true,
    queryKey: ['displayAboutUs', pageCurrent, pageSize],
    queryFn: () =>
      adminDisplayApi.getDisplayList({
        page: pageCurrent,
        size: pageSize,
        location: 'AboutUs',
      }),
  });

  // ====================================
  const handleChangePaginationTable = (page, size) => {
    dispatch(setPageSize(size));
    dispatch(setPageCurrent(page));
  };

  // ====================================

  const columns = [
    {
      title: 'Ảnh mẫu',
      align: 'center',
      render: (index, record) => <Image src={record.img} width={150} height={100} className='object-cover' />,
    },
    { title: 'Tiêu đề', dataIndex: 'title' },
    { title: 'Nội dung', dataIndex: 'content' },
    {
      align: 'center',
      render: (e, record, index) => <ButtonCustom title={'Chỉnh sửa'} icon={<EditOutlined />} />,
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
          Quản lí hiển trị trang về chúng tôi
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
    </div>
  );
}

export default ManagerDisplayAboutUs;
