import { Button, Col, Form, Row, Spin, Switch, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { getAuthorizationAdmin, updateAuthorizationAdmin } from '../../../../API/axios';

function FormAuthMod(props) {
  const [form] = Form.useForm();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [loadingSpin, setLoadingSpin] = useState(false);

  // handle get initvalues permission
  const handleGetValuesInitPermissions = () => {
    setLoadingSpin(true);
    getAuthorizationAdmin('MOD')
      .then((res) => {
        if (res.data?.success === true) {
          const arr1 = Object.entries(res.data?.data?.checkingPermissions);
          const arrayListFilter = arr1.filter((e) => e[1] === true);
          const userObj = Object.fromEntries(arrayListFilter);
          form.setFieldsValue(userObj);
          setLoadingSpin(false);
        } else return message.error(res.data?.error?.message);
      })
      .finally(() => setLoadingSpin(false));
  };
  useEffect(() => {
    handleGetValuesInitPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handle update permissions
  const onFinish = (values) => {
    setLoadingBtn(true);
    const arrListPermission = Object.entries(values);
    const arrayListFilter = arrListPermission.filter((e) => e[1] === true);
    const arr1 = Object.fromEntries(arrayListFilter);
    const valueUpdate = Object.keys(arr1);
    updateAuthorizationAdmin({ id: 'MOD', permissionIds: valueUpdate })
      .then((res) => {
        if (res.data?.success === true) {
          handleGetValuesInitPermissions();
          setLoadingBtn(false);
          message.success('Cập nhật thành công');
        } else return message.error(res.data?.error?.message);
      })
      .finally(() => setLoadingBtn(false));
  };
  return (
    <div>
      <Spin spinning={loadingSpin}>
        <Form
          style={{
            width: '100%',
          }}
          onFinish={onFinish}
          form={form}
        >
          <Row gutter={[8]}>
            <Col span={8}>
              <Form.Item label='Lấy danh sách lớp' valuePropName='checked' name='GET_CLASS_LIST'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Thêm lớp' valuePropName='checked' name='CREATE_CLASS'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Sửa lớp' valuePropName='checked' name='UPDATE_CLASS'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Xóa lớp' valuePropName='checked' name='DELETE_CLASS'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Lấy danh sách khóa' valuePropName='checked' name='GET_COURSE_LIST'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Thêm khóa' valuePropName='checked' name='CREATE_COURSE'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Sửa khóa' valuePropName='checked' name='UPDATE_COURSE'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Xóa khóa' valuePropName='checked' name='DELETE_COURSE'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Lấy danh sách chuyên ngành' valuePropName='checked' name='GET_MAJOR_LIST'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Thêm chuyên ngành' valuePropName='checked' name='CREATE_MAJOR'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Sửa chuyên ngành' valuePropName='checked' name='UPDATE_MAJOR'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Xóa chuyên ngành' valuePropName='checked' name='DELETE_MAJOR'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Lấy danh sách sinh viên' valuePropName='checked' name='GET_STUDENT_LIST'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Lấy thông tin sinh viên' valuePropName='checked' name='GET_STUDENT_DETAIL'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Thêm sinh viên' valuePropName='checked' name='CREATE_STUDENT'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Sửa sinh viên' valuePropName='checked' name='UPDATE_STUDENT'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Xóa sinh viên' valuePropName='checked' name='DELETE_STUDENT'>
                <Switch />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label='Lấy danh sách học kì' valuePropName='checked' name='GET_TERM_LIST'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Thêm học kì' valuePropName='checked' name='CREATE_TERM'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Sửa học kì' valuePropName='checked' name='UPDATE_TERM'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Xóa học kì' valuePropName='checked' name='DELETE_TERM'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Lấy danh sách quản trị viên' valuePropName='checked' name='GET_ADMIN_LIST'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Thêm quản trị viên' valuePropName='checked' name='CREATE_ADMIN'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Cập nhật quản trị viên' valuePropName='checked' name='UPDATE_ADMIN'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Xóa quản trị viên' valuePropName='checked' name='DELETE_ADMIN'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Lấy danh sách quyền' valuePropName='checked' name='GET_PERMISSION_LIST'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Thêm quyền' valuePropName='checked' name='CREATE_PERMISSION'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Sửa quyền' valuePropName='checked' name='UPDATE_PERMISSION'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Xóa quyền' valuePropName='checked' name='DELETE_PERMISSION'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Lấy danh sách vai trò' valuePropName='checked' name='GET_ROLE_LIST'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Thêm vai trò' valuePropName='checked' name='CREATE_ROLE'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Sửa vai trò' valuePropName='checked' name='UPDATE_ROLE'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Xóa vai trò' valuePropName='checked' name='DELETE_ROLE'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Thêm xếp loại của sinh viên mỗi lớp theo kì'
                valuePropName='checked'
                name='CREATE_CLASS_CLASSIFICATION'
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Sửa xếp loại của sinh viên mỗi lớp theo kì'
                valuePropName='checked'
                name='UPDATE_CLASS_CLASSIFICATION'
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Xóa xếp loại của sinh viên mỗi lớp theo kì'
                valuePropName='checked'
                name='DELETE_CLASS_CLASSIFICATION'
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Thêm xếp loại sinh viên mỗi khóa theo kì'
                valuePropName='checked'
                name='CREATE_COURSE_CLASSIFICATION'
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Sửa xếp loại sinh viên mỗi khóa theo kì'
                valuePropName='checked'
                name='UPDATE_COURSE_CLASSIFICATION'
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Xóa xếp loại sinh viên mỗi khóa theo kì'
                valuePropName='checked'
                name='DELETE_COURSE_CLASSIFICATION'
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Lấy danh sách xếp loại sinh viên mỗi lớp theo kỳ'
                valuePropName='checked'
                name='GET_CLASS_CLASSIFICATION'
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Xóa điểm' valuePropName='checked' name='DELETE_POINT'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Lấy danh sách xếp loại sinh viên mỗi khóa theo kỳ'
                valuePropName='checked'
                name='GET_COURSE_CLASSIFICATION'
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Thêm điểm' valuePropName='checked' name='CREATE_POINT'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Lấy danh sách điểm' valuePropName='checked' name='GET_POINT_LIST'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Sửa điểm' valuePropName='checked' name='UPDATE_POINT'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Lấy bảng điểm cá nhân' valuePropName='checked' name='GET_POINT_DETAIL'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Lấy bảng điểm tích lũy' valuePropName='checked' name='GET_ACCUMULATION_DETAIL'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Cập nhật thông tin cá nhân' valuePropName='checked' name='UPDATE_STUDENT_DETAIL'>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Button
                loading={loadingBtn}
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

export default FormAuthMod;
