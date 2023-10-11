import { DeleteOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';

export function PopconfirmDeleteDanger({ children, onConfirm }) {
  return (
    <>
      <div>
        <Popconfirm
          title='Bạn có chắc chắn muốn xóa ?'
          icon={<DeleteOutlined />}
          okText='Xóa'
          okType='danger'
          onConfirm={onConfirm}
        >
          {children}
        </Popconfirm>
      </div>
    </>
  );
}
