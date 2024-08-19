import { adminDisplayApi } from '@/API/admin/adminDisplayApi';
import { ButtonCustom } from '@/components/Button';
import { EditOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Image, Table, Typography, Upload } from 'antd';
import { useState } from 'react';

function ManagerDisplaySildeCardHomePage() {
  const { Title } = Typography;
  const [pageCurrent, setPageCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isFetching } = useQuery({
    staleTime: 14 * 60 * 5000,
    cacheTime: 15 * 60 * 5000,
    keepPreviousData: true,
    queryKey: ['bannerHistoryHomepage', pageCurrent, pageSize],
    queryFn: () =>
      adminDisplayApi.getDisplayList({
        page: pageCurrent,
        size: pageSize,
        location: 'Swiper',
      }),
  });

  // ====================================
  const handleChangePaginationTable = (page, size) => {
    setPageSize(size);
    setPageCurrent(page);
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
      align: 'center',
      width: '10%',
      render: (e, record, index) => (
        <Upload>
          <ButtonCustom title={'Cập nhật hình ảnh'} icon={<EditOutlined />} />
        </Upload>
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
          Hình ảnh lịch sử phát triển HomePage
        </Title>
        <Table
          scroll={{
            y: 5000,
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

export default ManagerDisplaySildeCardHomePage;
