import { adminClassApi } from "@/API/admin/adminClassApi";
import { ButtonCustom } from "@/components/Button";
import {
  notificationError,
  notificationSuccess,
} from "@/components/Notification";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Input,
  Popconfirm,
  Space,
  Table,
  Tooltip,
  Typography,
} from "antd";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { ModalFormClass } from "../components/Modal";

function ManagerClassPage(props) {
  const queryClient = useQueryClient();
  const { Title } = Typography;
  const [openModalForm, setOpenModalForm] = useState(false);
  const [dataClass, setDataClass] = useState({});
  const [valueSearchClass, setValueSearchClass] = useSearchParams("");
  const [pageCurrent, setPageCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [disabledClass, setDisabledClass] = useState(false);
  const [classId] = useDebounce(valueSearchClass.get("classId"), 750);

  const { data, isLoading } = useQuery({
    staleTime: 60 * 5000,
    cacheTime: 5 * 60 * 5000,
    keepPreviousData: true,
    queryKey: ["classList", pageCurrent, classId, pageSize],
    queryFn: async () =>
      await adminClassApi.getAllClass({
        id: classId,
        page: pageCurrent,
        size: pageSize,
      }),
  });
  // Handle Confirm Delete Class
  const handleConfirmDeleteClass = useMutation({
    mutationKey: ["deleteClass"],
    mutationFn: async (id) => await adminClassApi.deleteClass(id),
    onSuccess: (res) => {
      if (res && res.success === true) {
        notificationSuccess("Xóa thành công");
        queryClient.invalidateQueries({
          queryKey: ["classList", pageCurrent, classId, pageSize],
          exact: true,
        });
      } else {
        notificationError(res.error?.message);
      }
    },
  });

  const handleClickAddClass = () => setOpenModalForm(true);
  const handleClickEditClass = (record) => {
    setDisabledClass(true);
    setOpenModalForm(true);
    setDataClass(record);
  };
  const handleSearchClassId = (e) => {
    const classId = e.target.value;
    if (classId) {
      setValueSearchClass({ classId });
    } else {
      setValueSearchClass({});
    }
    setPageCurrent(1);
  };
  const handleChangePaginationTable = (page, size) => {
    setPageCurrent(page);
    setPageSize(size);
  };
  const columns = [
    {
      title: "Mã lớp",
      align: "center",
      dataIndex: "id",
    },
    {
      title: "Tên lớp",
      dataIndex: "name",
    },
    {
      title: "Tùy chọn",
      align: "center",
      render: (e, record, index) => (
        <Button.Group key={index}>
          <ButtonCustom
            icon={<EditOutlined />}
            title={"Chỉnh sửa"}
            handleClick={() => handleClickEditClass(record)}
          />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa lớp này ?"
            icon={<DeleteOutlined />}
            okText="Xóa"
            okType="danger"
            onConfirm={() => handleConfirmDeleteClass.mutate(record.id)}
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
        <Space>
          <Tooltip title="Tìm kiếm lớp">
            <Input
              prefix={<SearchOutlined className="opacity-60 mr-1" />}
              placeholder="Nhập mã lớp"
              className="shadow-sm w-[230px]"
              onChange={handleSearchClassId}
              value={valueSearchClass.get("classId")}
            />
          </Tooltip>
        </Space>
        <Title
          level={3}
          style={{
            textTransform: "uppercase",
            marginBottom: 0,
            marginRight: 100,
          }}
        >
          Danh sách các lớp trong khoa
        </Title>
        <ButtonCustom
          title="Thêm lớp"
          icon={<PlusCircleOutlined />}
          handleClick={handleClickAddClass}
        />
      </div>
      <Table
        scroll={{
          y: 630,
        }}
        rowKey="id"
        bordered={true}
        loading={isLoading}
        columns={columns}
        dataSource={data?.data?.items}
        pagination={{
          onChange: handleChangePaginationTable,
          defaultCurrent: 1,
          pageSize: pageSize,
          total: data?.data?.total,
          current: pageCurrent,
          showSizeChanger: true,
        }}
      />
      <ModalFormClass
        dataClass={dataClass}
        openModalForm={openModalForm}
        onChangeClickOpen={(open) => {
          if (!open) {
            setDataClass({});
            setOpenModalForm(false);
            setDisabledClass(false);
          }
        }}
        disabledClass={disabledClass}
      />
    </div>
  );
}

export default ManagerClassPage;
