import { adminAdminApi } from '@/API/admin/adminAdminApi';
import { notificationSuccess } from '@/components/Notification';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Col, Form, Row, Spin, Switch } from 'antd';

export function FormAuthMod(props) {
  const [form] = Form.useForm();
  const { data, isLoading } = useQuery({
    staleTime: 60 * 5000,
    cacheTime: 5 * 60 * 5000,
    queryKey: ['getAuthMod'],
    queryFn: () => adminAdminApi.getPermissions('MOD'),
  });
  const updatePermisstion = useMutation({
    mutationKey: ['updatePermisstionMod'],
    mutationFn: (values) => {
      const arrListPermission = Object.entries(values);
      const arrayListFilter = arrListPermission.filter((e) => e[1] === true);
      const arr1 = Object.fromEntries(arrayListFilter);
      const valueUpdate = Object.keys(arr1);
      return adminAdminApi.updatePermissions('MOD', {
        permissionIds: valueUpdate,
      });
    },
    onSuccess: (res) => {
      if (res && res.success === true) {
        notificationSuccess('Cập nhật thành công');
      }
    },
  });

  // handle update permissions
  const onFinish = (values) => {
    updatePermisstion.mutate(values);
  };
  return (
    <div>
      <Spin spinning={isLoading}>
        <Form
          style={{
            width: '100%',
          }}
          onFinish={onFinish}
          form={form}
        >
          <Row gutter={[8]}>
            {data &&
              data.data &&
              data.data.items.map((item) => (
                <Col span={8}>
                  <Form.Item initialValue={item.isAllowed} label={item.name} valuePropName='checked' name={item.id}>
                    <Switch />
                  </Form.Item>
                </Col>
              ))}
            <Col span={24}>
              <Button
                loading={updatePermisstion.isLoading}
                type='primary'
                htmlType='submit'
                className='rounded-full px-7 py-4 flex justify-center items-center'
              >
                Cập nhật
              </Button>
            </Col>
          </Row>
        </Form>
      </Spin>
    </div>
  );
}
