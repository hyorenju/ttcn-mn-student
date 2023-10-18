import { adminAdminApi } from "@/API/admin/adminAdminApi";
import { ButtonCustom } from "@/components/Button";
import {
  notificationError,
  notificationSuccess,
} from "@/components/Notification";
import {
  deleteAdmin,
  setAdminId,
  setDataAdminList,
  setPageCurrent,
  setPageSize,
  setTotal,
} from "@/redux/Admin/adminSilce";
import { addAdmin } from "@/redux/Trash/adminTrashSlice";
import {
  DeleteFilled,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  SwapOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Button,
  Drawer,
  Input,
  Popconfirm,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import { DrawerAdminAuther } from "../components/Drawer";
import { ModalFormAdmin, ModalTrashCanAdmin } from "../components/Modal";

function ManagerAuthorizationPage(props) {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const { adminList, adminId, total, pageCurrent, pageSize } = useSelector(
    (state) => state.adminList
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModalFormAdmin, setOpenModalFormAdmin] = useState(false);
  const [dataAdmin, setDataAdmin] = useState({});
  const [openModalTrush, setOpenModalTrush] = useState(false);
  const [required, setRequired] = useState(true);
  const [valueSearchAdmin, setValueSearchAdmin] = useState("");

  // handle delete admin
  const handleConfirmDeleteAdmin = useMutation({
    mutationFn: async (id) => await adminAdminApi.deleteAdmin(id),
    onSuccess: (data) => {
      if (data && data.success) {
        notificationSuccess("Xóa thành công");
        dispatch(deleteAdmin(data.data.admin));
        dispatch(addAdmin(data.data));
      }
    },
    onError: (data) => {
      notificationError(data?.data?.data);
    },
  });
  // handle get admin list
  const [id] = useDebounce(valueSearchAdmin, 750);
  dispatch(setAdminId(id));

  const getAdminList = useQuery({
    cacheTime: 10 * 60 * 1000,
    keepPreviousData: true,
    queryKey: ["adminList", pageSize, pageCurrent, adminId],
    queryFn: async () =>
      await adminAdminApi.getAllAdmin({
        id: adminId,
        page: pageCurrent,
        size: pageSize,
      }),
    onSuccess: (res) => {
      if (res && res.success) {
        dispatch(setTotal(res.data.total));
        dispatch(setDataAdminList(res.data.items));
      }
    },
  });
  const handleClickBtnTrush = () => {
    setOpenModalTrush(true);
  };
  const handleClickEdit = (record) => {
    setRequired(false);
    setDataAdmin(record);
    setOpenModalFormAdmin(true);
  };
  const role = (roleId) => {
    if (roleId === "ADMIN") {
      return <Tag color="purple">ADMIN</Tag>;
    } else if (roleId === "MOD") {
      return <Tag color="lime">MOD</Tag>;
    } else return <Tag color="red">SUPERADMIN</Tag>;
  };
  const handleChangePaginationTable = (page, size) => {
    dispatch(setPageSize(size));
    dispatch(setPageCurrent(page));
  };
  const handleChangAdminId = (e) => setValueSearchAdmin(e.target.value);
  const columns = [
    {
      title: "Tên đăng nhập",
      dataIndex: "id",
      align: "center",
    },
    {
      title: "Tên người dùng",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
    },
    {
      title: "Vai trò",
      align: "center",
      render: (e, record, idx) => role(record?.roleId),
    },
    {
      title: "Tùy chọn",
      align: "center",
      render: (e, record, index) => (
        <Button.Group key={index}>
          <ButtonCustom
            title={"Chỉnh sửa"}
            icon={<EditOutlined />}
            handleClick={() => handleClickEdit(record)}
          />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa sinh viên này ?"
            icon={<DeleteOutlined />}
            okText="Xóa"
            okType="danger"
            onConfirm={() => handleConfirmDeleteAdmin.mutate(record.id)}
          >
            <Button
              className="flex justify-center items-center text-md shadow-md"
              icon={<DeleteOutlined />}
              type="primary"
              danger
              loading={handleConfirmDeleteAdmin.isLoading}
            >
              Xóa
            </Button>
          </Popconfirm>
        </Button.Group>
      ),
    },
  ];
  return (
    <div>
      <div className="flex justify-between mb-3">
        <Space>
          <Tooltip title="Tìm kiếm admin">
            <Input
              prefix={<SearchOutlined className="opacity-60 mr-1" />}
              placeholder="Nhập mã admin"
              className="shadow-sm w-[230px]"
              onChange={handleChangAdminId}
            />
          </Tooltip>
          <ButtonCustom
            title="Thùng rác"
            icon={<DeleteFilled />}
            handleClick={handleClickBtnTrush}
          />
        </Space>
        <Title level={3} className="uppercase absolute left-2/4">
          Danh sách admin
        </Title>
        <Space>
          <ButtonCustom
            icon={<SwapOutlined />}
            handleClick={() => {
              setOpenDrawer(true);
            }}
            title={"Phân quyền"}
          />
          <ButtonCustom
            icon={<UserAddOutlined />}
            handleClick={() => {
              setOpenModalFormAdmin(true);
            }}
            title="Thêm admin"
          />
        </Space>
      </div>
      <ModalFormAdmin
        onSuccess={() => {
          setOpenModalFormAdmin(false);
        }}
        dataAdmin={dataAdmin}
        openForm={openModalFormAdmin}
        onChangeClickOpen={(open) => {
          if (!open) {
            setDataAdmin({});
            setRequired(true);
            setOpenModalFormAdmin(false);
          }
        }}
        required={required}
      />
      <Table
        scroll={{
          y: 630,
        }}
        rowKey="id"
        loading={getAdminList.isFetching}
        bordered={true}
        dataSource={adminList}
        columns={columns}
        pagination={{
          onChange: handleChangePaginationTable,
          defaultCurrent: 1,
          pageSize: pageSize,
          total: total,
          current: pageCurrent,
          showSizeChanger: true,
        }}
      />
      <ModalTrashCanAdmin
        open={openModalTrush}
        close={() => setOpenModalTrush(false)}
      />
      <Drawer
        placement="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        width={1300}
      >
        <DrawerAdminAuther />
      </Drawer>
    </div>
  );
}

export default ManagerAuthorizationPage;
