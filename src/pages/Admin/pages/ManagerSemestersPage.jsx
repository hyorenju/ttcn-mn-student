import { adminSemesterApi } from "@/API/admin/adminSemesterApi";
import { ButtonCustom } from "@/components/Button";
import {
  notificationError,
  notificationSuccess,
} from "@/components/Notification";
import {
  DeleteOutlined,
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
import { ModalFormTerm } from "../components/Modal";

function ManagerSemestersPage(props) {
  const { Title } = Typography;
  const [openModalTerm, setOpenModalTerm] = useState(false);
  const [dataTerm, setDataTerm] = useState({});
  const [valueSearchTerm, setValueSearchTerm] = useSearchParams("");
  const [pageSize, setPageSize] = useState(10);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [termId] = useDebounce(valueSearchTerm.get("termId"), 750);
  const queryClient = useQueryClient();

  // handle get data terms
  const { data, isLoading, error } = useQuery({
    staleTime: 60 * 5000,
    cacheTime: 5 * 60 * 5000,
    keepPreviousData: true,
    queryKey: ["semesterList", termId, pageCurrent, pageSize],
    queryFn: async () =>
      await adminSemesterApi.getAllSemester({
        id: termId,
        page: pageCurrent,
        size: pageSize,
      }),
  });
  if (error) {
    notificationError(error?.data?.data);
  }

  // hande  confirm delete term
  const confirmDeleteSemester = useMutation({
    mutationKey: ["deleteSemester"],
    mutationFn: async (id) => await adminSemesterApi.deleteSemester(id),
    onSuccess: async (res) => {
      if (res && res.success === true) {
        await queryClient.invalidateQueries({
          queryKey: ["semesterList", termId, pageCurrent, pageSize],
          exact: true,
        });
        notificationSuccess("Xóa học kì thành công");
      } else {
        notificationError(res.error?.message);
      }
    },
  });
  const handleConfirmDeleteSemesters = (id) => {
    confirmDeleteSemester.mutate(id);
  };
  const handleChangeInputTermId = (e) => {
    const termId = e.target.value;
    if (termId) {
      setPageCurrent(1);
      setValueSearchTerm({ termId });
    } else {
      setValueSearchTerm({});
    }
  };
  const handleClickAddTerm = () => {
    setOpenModalTerm(true);
  };
  const handleChangePagination = (page, size) => {
    setPageCurrent(page);
    setPageSize(size);
  };
  const columns = [
    {
      title: "Mã học kì",
      align: "center",
      dataIndex: "id",
    },
    {
      title: "Tên học kì",
      dataIndex: "termName",
      key: "termName",
      align: "center",
    },
    {
      title: "Hành động",
      render: (e, record, idx) => (
        <Popconfirm
          key={idx}
          title="Bạn có chắc chắn muốn xóa ?"
          icon={<DeleteOutlined />}
          okText="Xóa"
          okType="danger"
          onConfirm={() => handleConfirmDeleteSemesters(record.id)}
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
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <Space>
          <Tooltip title="Tìm kiếm học kì">
            <Input
              value={valueSearchTerm.get("termId")}
              placeholder="Nhập mã học kì"
              className="shadow-sm w-[230px]"
              prefix={<SearchOutlined className="opacity-60 mr-1" />}
              onChange={handleChangeInputTermId}
            />
          </Tooltip>
        </Space>
        <Title
          style={{
            textTransform: "uppercase",
            textAlign: "center",
            marginBottom: 0,
          }}
          level={3}
        >
          Danh sách học kì
        </Title>
        <ButtonCustom
          title={"Thêm học kì"}
          handleClick={handleClickAddTerm}
          icon={<PlusCircleOutlined />}
        />
      </div>
      <Table
        scroll={{
          y: 630,
        }}
        dataSource={data?.data?.items}
        bordered={true}
        columns={columns}
        loading={isLoading}
        pagination={{
          onChange: handleChangePagination,
          defaultCurrent: 1,
          pageSize: pageSize,
          total: data?.data?.total,
          current: pageCurrent,
          showSizeChanger: true,
        }}
      />

      <ModalFormTerm
        openForm={openModalTerm}
        dataTerm={dataTerm}
        onChangeClickOpen={(open) => {
          if (!open) {
            setDataTerm({});
            setOpenModalTerm(false);
          }
        }}
      />
    </div>
  );
}

export default ManagerSemestersPage;
