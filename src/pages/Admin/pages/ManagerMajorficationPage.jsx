import { DeleteOutlined, PieChartOutlined, SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Input, Modal, Popconfirm, Space, Table, Tooltip, Typography } from 'antd';
import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { adminMajorfication } from '../../../API/admin/adminMajorfication';
import { notificationError, notificationSuccess } from '../../../components/Notification';
import { PieDataMajor } from '../components/Chart';
import { ModalFormClassifiMajor } from '../components/Modal';
import { ButtonCustom } from '../../../components/Button/ButtonCustom';

function ManagerMajorficationPage(props) {
  const { Title } = Typography;
  const [openChart, setOpenChart] = useState(false);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [dataPie, setDataPie] = useState({});
  const [dataIndex, setDataIndex] = useState({});
  const [pageSize, setPageSize] = useState(10);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [valueCourse, setValueCourse] = useState('');
  const [valueTermId, setValueTermId] = useState('');
  const queryClient = useQueryClient();

  //   handle get data table classification
  const [courseId] = useDebounce(valueCourse, 750);
  const [termId] = useDebounce(valueTermId, 750);

  const { data, isLoading, error } = useQuery({
    staleTime: 60 * 5000,
    cacheTime: 5 * 60 * 5000,
    keepPreviousData: true,
    queryKey: ['majortificationList', courseId, termId, pageCurrent, pageSize],
    queryFn: async () =>
      await adminMajorfication.getAllMajor({ courseId: courseId, termId: termId, page: pageCurrent, size: pageSize }),
  });
  if (error) console.log(error);

  // Handle delete major classifications
  const deleteMajorficition = useMutation({
    mutationKey: ['deleteMajorficition'],
    mutationFn: async (courseId, termId) =>
      await adminMajorfication.deleteMajor({ courseId: courseId, termId: termId }),
    onSuccess: (res) => {
      if (res && res.success === true) {
        queryClient.invalidateQueries({
          queryKey: ['majortificationList', courseId, termId, pageCurrent, pageSize],
          exact: true,
        });
        notificationSuccess(res?.data?.message);
      }
    },
    onError: (err) => {
      notificationError(err?.data?.message);
    },
  });
  const handleConfirmDeleteData = (courseId, termId) => {
    deleteMajorficition.mutate(courseId, termId);
  };
  const columns = [
    {
      title: 'Mã khóa',
      align: 'center',
      dataIndex: 'courseId',
      key: 'courseId',
    },
    {
      title: 'Mã học kỳ',
      align: 'center',
      dataIndex: 'termId',
      key: 'termId',
    },
    {
      title: 'Hạnh kiểm xuất sắc',
      align: 'center',
      dataIndex: 'excellent',
      key: 'excellent',
    },
    {
      title: 'Hạnh kiểm tốt',
      align: 'center',
      dataIndex: 'good',
      key: 'good',
    },
    {
      title: 'Hạnh kiểm khá',
      align: 'center',
      dataIndex: 'fair',
      key: 'fair',
    },
    {
      title: 'Hạnh kiểm trung bình',
      align: 'center',
      dataIndex: 'medium',
      key: 'medium',
    },
    {
      title: 'Hạnh kiểm yếu',
      align: 'center',
      dataIndex: 'weak',
      key: 'weak',
    },
    {
      title: 'Hạnh kiểm kém',
      align: 'center',
      dataIndex: 'worst',
      key: 'worst',
    },
    {
      title: 'Tùy chọn',
      align: 'center',
      render: (e, record, index) => (
        <Button.Group key={index}>
          <Popconfirm
            title='Bạn có chắc chắn muốn xóa ?'
            icon={<DeleteOutlined />}
            okText='Xóa'
            okType='danger'
            onConfirm={() => handleConfirmDeleteData(record.courseId, record.termId)}
          >
            <ButtonCustom icon={<DeleteOutlined />} />
          </Popconfirm>
          <Tooltip title='Xem dưới dạng biểu đồ'>
            <Button
              onClick={() => {
                setDataPie(record);
                setOpenChart(true);
              }}
              className='flex justify-center items-center text-md shadow-md'
              icon={<PieChartOutlined />}
            ></Button>
          </Tooltip>
        </Button.Group>
      ),
    },
  ];
  return (
    <div>
      <div className='relative mb-3'>
        <Space
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <Input
            prefix={<SearchOutlined className='opacity-50 mr-1' />}
            value={valueCourse}
            placeholder='Nhập mã khóa'
            className='flex justify-center items-center text-md shadow-md w-[230px]'
            onChange={(e) => setValueCourse(e.target.value)}
          />
          <Input
            value={valueTermId}
            placeholder='Nhập mã học kỳ'
            className='flex justify-center items-center text-md shadow-md w-[230px]'
            onChange={(e) => setValueTermId(e.target.value)}
          />
        </Space>
        <Title
          level={3}
          style={{
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: 0,
          }}
        >
          Danh sách xếp loại theo khóa
        </Title>
        <Button
          icon={<UserAddOutlined />}
          onClick={() => {
            setOpenFormModal(true);
          }}
          className='flex justify-center items-center text-md font-medium shadow-md bg-slate-100 absolute right-0 top-0'
        >
          Thêm xếp loại
        </Button>
      </div>
      <Table
        scroll={{
          y: 630,
        }}
        rowKey='id'
        loading={isLoading}
        bordered={true}
        dataSource={data?.data?.items}
        columns={columns}
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
      <ModalFormClassifiMajor
        onSuccess={() => {
          setOpenFormModal(false);
        }}
        openForm={openFormModal}
        onChangeClickOpen={(open) => {
          if (!open) {
            setDataIndex({});
            setOpenFormModal(false);
          }
        }}
        dataIndex={dataIndex}
      />
      <Modal
        width={800}
        centered
        title='Thống kê xếp loại theo kì'
        open={openChart}
        okText='Ok'
        onOk={() => setOpenChart(false)}
        onCancel={() => {
          setDataPie({});
          setOpenChart(false);
        }}
        cancelButtonProps={{
          style: { display: 'none' },
        }}
      >
        <PieDataMajor dataPie={dataPie} />
      </Modal>
    </div>
  );
}

export default ManagerMajorficationPage;
