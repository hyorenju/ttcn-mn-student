import { adminMajorApi } from "@/API/admin/adminMajorApi";
import { ButtonCustom } from "@/components/Button";
import {
  notificationError,
  notificationSuccess,
} from "@/components/Notification";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Popconfirm, Table, Typography } from "antd";
import React, { useState } from "react";
import { ModalFormMajor } from "../components/Modal";

function ManagerMajorPage(props) {
  const { Title } = Typography;
  const [openModalFormMajor, setOpenModalFormMajor] = useState(false);
  const [dataMajor, setDataMajor] = useState({});
  const [pageCurrent, setPageCurrent] = useState(1);
  const queryClient = useQueryClient();

  // handle get data major
  const { data, isFetching, error } = useQuery({
    staleTime: 60 * 5000,
    cacheTime: 5 * 60 * 5000,
    keepPreviousData: true,
    queryKey: ["majorList", pageCurrent],
    queryFn: async () =>
      await adminMajorApi.getAllMajor({ page: pageCurrent, size: 10 }),
  });
  if (error) {
    notificationError(error?.data?.data);
  }

  const handleClickAddMajor = () => {
    setOpenModalFormMajor(true);
  };

  const handleClickEditMajor = (record) => {
    setOpenModalFormMajor(true);
    setDataMajor(record);
  };
  const handleChangePagination = (page, size) => {
    setPageCurrent(page);
  };
  // handle confirm delete major
  const confirmDeleteMajor = useMutation({
    mutationKey: ["deleteMajor"],
    mutationFn: async (id) => await adminMajorApi.deleteMajor(id),
    onSuccess: async (res) => {
      if (res && res.success === true) {
        await queryClient.invalidateQueries({
          queryKey: ["majorList", pageCurrent],
          exact: true,
        });
        notificationSuccess(res?.data?.data);
      } else {
        notificationError(res.error?.message);
      }
    },
  });
  const handleConfirmDeleteMajor = (id) => {
    confirmDeleteMajor.mutate(id);
  };

  const columns = [
    {
      title: "Mã chuyên ngành",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Tên chuyên ngành",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tổng số tín chỉ tích lũy",
      dataIndex: "totalCredits",
      key: "totalCredits",
      align: "center",
    },
    {
      title: "Tùy chọn",
      align: "center",
      render: (e, record, idx) => (
        <Button.Group key={idx}>
          <ButtonCustom
            handleClick={() => handleClickEditMajor(record)}
            icon={<EditOutlined />}
            title={"Chỉnh sửa"}
          />
          <Popconfirm
            title={`Bạn có chắc chắn muốn xóa chuyên ngành ${record.id}`}
            icon={<DeleteOutlined />}
            okText="Xóa"
            okType="danger"
            onConfirm={() => handleConfirmDeleteMajor(record.id)}
          >
            <Button
              className="flex justify-center items-center text-md shadow-md"
              danger
              type="primary"
              icon={<DeleteOutlined />}
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
      <div className="flex justify-between items-center mb-3">
        <div></div>
        <Title
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            marginBottom: 0,
          }}
          level={3}
        >
          Danh sách ngành
        </Title>
        <ButtonCustom
          icon={<PlusCircleOutlined />}
          handleClick={handleClickAddMajor}
          title={"Thêm ngành"}
        />
      </div>
      <Table
        scroll={{
          y: 630,
        }}
        loading={isFetching}
        bordered={true}
        dataSource={data?.data?.items}
        columns={columns}
        pagination={{
          onChange: handleChangePagination,
          defaultCurrent: 1,
          pageSize: 10,
          total: data?.data?.total,
          current: pageCurrent,
        }}
      />
      <ModalFormMajor
        onSuccess={() => {
          setOpenModalFormMajor(false);
        }}
        openForm={openModalFormMajor}
        dataMajor={dataMajor}
        onChangeClickOpen={(open) => {
          if (!open) {
            setDataMajor({});
            setOpenModalFormMajor(false);
          }
        }}
      />
    </div>
  );
}

export default ManagerMajorPage;
