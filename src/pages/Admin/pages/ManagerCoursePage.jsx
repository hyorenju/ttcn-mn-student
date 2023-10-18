import { adminCourseApi } from "@/API/admin/adminCourseApi";
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
import { Button, Input, Popconfirm, Table, Tooltip, Typography } from "antd";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { ModalFormCourse } from "../components/Modal";

function ManagerCoursePage(props) {
  const { Title } = Typography;
  const [openModalFormCourse, setOpenModalFormCourse] = useState(false);
  const [valueSearchCourse, setValueSearchCourse] = useSearchParams("");
  const [dataSource, setDataCourse] = useState({});
  const [pageSize, setPageSize] = useState(10);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [courseId] = useDebounce(valueSearchCourse.get("courseId"), 750);
  const queryClient = useQueryClient();

  // Handle get Course Data
  const { data, isFetching } = useQuery({
    staleTime: 60 * 5000,
    cacheTime: 5 * 60 * 5000,
    keepPreviousData: true,
    queryKey: ["courseList", pageCurrent, pageSize, courseId],
    queryFn: async () =>
      await adminCourseApi.getAllCourse({
        id: courseId,
        page: pageCurrent,
        size: pageSize,
      }),
  });

  // Handle Confirm Delete Course
  const deleteCourse = useMutation({
    mutationKey: ["deleteCourse"],
    mutationFn: async (id) => await adminCourseApi.deleteCourse(id),
    onSuccess: async (res) => {
      if (res && res.success === true) {
        await queryClient.invalidateQueries({
          queryKey: ["courseList", pageCurrent, pageSize, courseId],
          exact: true,
        });
        notificationSuccess("Xóa thành công");
      } else {
        notificationError(res.error?.message);
      }
    },
    onError: (error) => {
      notificationError(error?.data?.data);
    },
  });
  const handleConfirmDeleteCourse = (id) => {
    deleteCourse.mutate(id);
  };
  const handleChangePagination = (page, size) => {
    setPageCurrent(page);
    setPageSize(size);
  };
  const handleChangeInputSearchCourseId = (e) => {
    const courseId = e.target.value;
    if (courseId) {
      setPageCurrent(1);
      setValueSearchCourse({ courseId });
    } else {
      setValueSearchCourse({});
    }
  };
  const columns = [
    {
      title: "Mã khóa",
      dataIndex: "id",
      align: "center",
      key: "id",
    },
    {
      title: "Tên khóa",
      dataIndex: "name",
      align: "center",
      key: "name",
    },
    {
      title: "Tùy chọn",
      align: "center",
      render: (e, record, index) => (
        <Popconfirm
          key={index}
          title={`Bạn có chắc chắn muốn xóa ${record.name} ?`}
          icon={<DeleteOutlined />}
          okText="Xóa"
          okType="danger"
          onConfirm={() => handleConfirmDeleteCourse(record.id)}
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
        <Tooltip title="Tìm kiếm khóa">
          <Input
            prefix={<SearchOutlined className="opacity-60 mr-1" />}
            placeholder="Nhập mã khóa"
            className="shadow-sm w-[230px]"
            onChange={handleChangeInputSearchCourseId}
            value={valueSearchCourse.get("courseId")}
          />
        </Tooltip>
        <Title
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            marginBottom: 0,
          }}
          level={3}
        >
          Quản lí khóa
        </Title>
        <ButtonCustom
          icon={<PlusCircleOutlined />}
          title={"Thêm khóa"}
          handleClick={() => setOpenModalFormCourse(true)}
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
          pageSize: pageSize,
          total: data?.data?.total,
          current: pageCurrent,
          showSizeChanger: true,
        }}
      />
      <ModalFormCourse
        dataCourse={dataSource}
        openForm={openModalFormCourse}
        onChangeClickOpen={(open) => {
          if (!open) {
            setDataCourse({});
            setOpenModalFormCourse(false);
          }
        }}
      />
    </div>
  );
}

export default ManagerCoursePage;
