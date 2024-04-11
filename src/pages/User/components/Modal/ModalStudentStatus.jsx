import { studentApi } from '@/API/Student';
import { useQuery } from '@tanstack/react-query';
import { Modal, Table } from 'antd';

export function ModalStudentStatus({ open, onOpenChange }) {
  const { data, isLoading } = useQuery({
    queryKey: ['studentStatus'],
    queryFn: () => studentApi.statusList(),
  });
  const columns = [
    { align: 'center', title: 'Thời gian', dataIndex: ['time'], width: '15%' },
    { align: 'center', title: 'Học kỳ', dataIndex: ['term', 'termName'], width: '25%' },
    { title: 'Chú thích', dataIndex: ['note'] },
  ];
  return (
    <Modal open={open} onCancel={() => onOpenChange(false)} onOk={() => onOpenChange(false)} width={800}>
      <Table
        scroll={{
          x: 700,
          y: 500,
        }}
        dataSource={data?.data?.items}
        loading={isLoading}
        columns={columns}
        style={{ marginTop: 30 }}
        pagination={false}
      />
    </Modal>
  );
}
