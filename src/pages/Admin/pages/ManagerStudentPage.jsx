import { adminDisplayApi } from "@/API/admin/adminDisplayApi";
import { adminStudentApi } from "@/API/admin/adminStudentApi";
import { ButtonCustom } from "@/components/Button";
import {
  notificationError,
  notificationSuccess,
} from "@/components/Notification";
import { setOpen } from "@/redux/Popover/popoverStudentFiller";
import {
  deleteStudent,
  setDataStudentList,
  setPageCurrent,
  setPageSize,
  setStudentId,
  setTotal,
} from "@/redux/Student/studentSilce";
import { addStudent } from "@/redux/Trash/studentTrashSlice";
import {
  DeleteFilled,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  FilterOutlined,
  MoreOutlined,
  SearchOutlined,
  SolutionOutlined,
  UploadOutlined,
  UserAddOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Drawer,
  Input,
  Popconfirm,
  Popover,
  Space,
  Table,
  Tooltip,
  Typography,
  Upload,
} from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { DescriptionInfoStudent } from "../components/Description";
import {
  ModalFormStudentInfo,
  ModalShowError,
  ModalTrashCanStudent,
} from "../components/Modal";
import { ContentPopoverStudent } from "../components/Popover";

function ManagerStudentPage() {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { studentList, studentId, total, pageCurrent, pageSize, filer } =
    useSelector((state) => state.studentList);
  const openPopover = useSelector((state) => state.popoverStudentFiller.open);
  const [dataError, setDataError] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [valueSearchStudent, setValueSearchStudent] = useSearchParams("");
  const [openDrawerInfo, setOpenDrawerInfo] = useState(false);
  const [openModalFormUser, setOpenModalFormStudent] = useState(false);
  const [openModalError, setOpenModalError] = useState(false);
  const [openModalTrush, setOpenModalTrush] = useState(false);
  const [dataStudent, setDataStudent] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // Handle call get dataStudent
  const [id] = useDebounce(valueSearchStudent.get("studentId"), 750);
  dispatch(setStudentId(id));
  const getStudentList = useQuery({
    cacheTime: 10 * 60 * 1000,
    keepPreviousData: true,
    queryKey: ["studentList", pageSize, pageCurrent, studentId, filer],
    queryFn: async () =>
      await adminStudentApi.getAllStudent({
        studentId: studentId,
        page: pageCurrent,
        size: pageSize,
        filter: filer,
      }),
    onSuccess: (res) => {
      if (res && res.success === true) {
        dispatch(setTotal(res.data?.total));
        dispatch(setDataStudentList(res.data?.items));
      }
    },
  });

  const getDataError = useMutation({
    mutationKey: ["getDataErrorImport"],
    mutationFn: async () => await adminDisplayApi.getDisplayErrorImport(2),
    onSuccess: (res) => {
      if (res && res.success === true) {
        setDataError(res.data);
      }
    },
    onError: (err) => {
      notificationError(err);
    },
  });

  const hasSelected = selectedRowKeys.length > 0;
  const deleteStudentList = useMutation({
    mutationFn: async () =>
      await adminStudentApi.deleteListStudent({ ids: selectedRowKeys }),
    onSuccess: async (res) => {
      if (res && res.success) {
        await queryClient.invalidateQueries({
          queryKey: ["studentList", pageSize, pageCurrent, studentId, filer],
          exact: true,
        });
        await queryClient.invalidateQueries({
          queryKey: ["studentListTrash"],
        });
        setSelectedRowKeys([]);
        notificationSuccess(res.data?.data);
      }
    },
    onError: (data) => {
      notificationError(data.data?.data);
    },
  });

  const deleteStudents = useMutation({
    mutationFn: async (id) => await adminStudentApi.deleteStudent(id),
    onSuccess: (res) => {
      if (res && res.success === true) {
        notificationSuccess("Xóa thành công");
        dispatch(deleteStudent(res.data?.student));
        dispatch(addStudent(res.data));
      }
    },
    onError: (data) => {
      notificationError(data?.data?.data);
    },
  });

  const importStudentList = useMutation({
    mutationKey: ["importStudentList"],
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("file", file.file);
      return await adminStudentApi.importStudentList(formData);
    },
    onSuccess: async (res) => {
      if (res && res.success === true) {
        notificationSuccess("Upload file thành công");
      } else if (res && res.success === false) {
        await getDataError.mutate();
        setOpenModalError(true);
        window.open(res.error?.message);
        notificationError(
          "Upload file thất bại. Hãy làm theo đúng form excel được tải về máy của bạn"
        );
      }
    },
  });

  // Export File Data List Student
  const exportStudentFormExcel = useMutation({
    mutationKey: ["exportFileDataStudent"],
    mutationFn: async () =>
      await adminStudentApi.exportStudentList({
        studentId: studentId,
        filter: filer,
      }),
    onSuccess: (data) => {
      if (data && data.success === true) {
        window.open(data.data);
        notificationSuccess(
          "Đã xuất file excel thành công hãy kiểm tra trong máy của bạn nhé "
        );
      }
    },
    onError: (data) => {
      notificationError("Có lỗi trong quá trình lưu file");
    },
  });
  // ====================================
  const handleChangePaginationTable = (page, size) => {
    dispatch(setPageSize(size));
    dispatch(setPageCurrent(page));
  };
  const handleClickBtnEditStudent = (record) => {
    setDataStudent(record);
    setOpenModalFormStudent(true);
    setDisabled(true);
  };
  const handleClickBtnShowDetailStudent = (record) => {
    setDataStudent(record);
    setOpenDrawerInfo(true);
  };
  const handleClickBtnExportFileStudentList = () => {
    exportStudentFormExcel.mutate();
  };
  const handleConfirmDeleteStudent = (id) => {
    deleteStudents.mutate(id);
  };
  const handleConfirmDeleteStudentList = () => {
    deleteStudentList.mutate(selectedRowKeys);
  };
  const handleChangeInputStudentId = (e) => {
    const studentId = e.target.value;
    if (studentId) {
      setValueSearchStudent({ studentId });
      setPageCurrent(1);
    } else {
      setValueSearchStudent({});
    }
  };
  const handleClickBtnAddStudent = () => {
    setOpenModalFormStudent(true);
  };
  const handleClickBtnCloseDrawerDetailStudent = () => {
    setOpenDrawerInfo(false);
    setDataStudent({});
  };
  const handleClickBtnTrush = () => {
    setOpenModalTrush(true);
  };
  const handleChangeRowSelection = (e, record) =>
    setSelectedRowKeys(record.map((data) => data.id));

  // ====================================

  const props = {
    name: "file",
    multiple: false,
    showUploadList: false,
    customRequest: (file) => importStudentList.mutate(file),
    beforeUpload: (file) => {
      const checkSize = file.size / 1024 / 1024 < 5;
      const isXLXS =
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      if (!isXLXS) {
        notificationError(`${file.name} không phải là một file excel`);
        return false;
      }
      if (!checkSize) {
        notificationError(`File tải lên không được quá 5MB`);
        return false;
      }
      return true;
    },
  };

  const columns = [
    {
      title: "Mã sinh viên",
      dataIndex: "id",
      align: "center",
    },
    {
      title: "Họ đệm",
      align: "center",
      dataIndex: "surname",
    },
    {
      title: "Tên",
      align: "center",
      dataIndex: "lastName",
    },
    {
      title: "Khóa",
      dataIndex: ["course", "name"],
      align: "center",
    },
    {
      title: "Lớp",
      dataIndex: ["aclass", "name"],
      width: "15%",
    },
    {
      title: "Ngành",
      dataIndex: ["major", "name"],
      width: "20%",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      align: "center",
    },
    {
      align: "center",
      width: "4%",
      render: (e, record, index) => (
        <Popover
          trigger={"click"}
          placement="left"
          content={
            <Space size={10} key={index} direction="vertical">
              <ButtonCustom
                title={"Chỉnh sửa"}
                icon={<EditOutlined />}
                handleClick={() => handleClickBtnEditStudent(record)}
              />
              <ButtonCustom
                title={"Xem chi tiết"}
                icon={<SolutionOutlined />}
                handleClick={() => handleClickBtnShowDetailStudent(record)}
              />
              <Popconfirm
                title="Xóa sinh viên"
                description={`Bạn có chắc chắn muốn xóa sinh viên ${record.surname} ${record.lastName} ?`}
                icon={<DeleteOutlined />}
                okText="Xóa"
                okType="danger"
                onConfirm={() => handleConfirmDeleteStudent(record.id)}
              >
                <Button
                  type="primary"
                  danger
                  loading={deleteStudents.isLoading}
                  className="flex justify-center items-center bg-white"
                  icon={<DeleteOutlined />}
                >
                  Xóa
                </Button>
              </Popconfirm>
            </Space>
          }
        >
          <Button
            className="flex items-center justify-center bg-white"
            icon={<MoreOutlined />}
          />
        </Popover>
      ),
    },
  ];
  return (
    <div>
      <div className="flex justify-between items-center mb-3 relative">
        <Space>
          <ButtonCustom
            title="Xóa hết"
            icon={<UsergroupDeleteOutlined />}
            type="primary"
            disabled={!hasSelected}
            loading={deleteStudentList.isLoading}
            handleClick={handleConfirmDeleteStudentList}
          />

          <Space>
            <Tooltip title="Tìm kiếm sinh viên">
              <Input
                prefix={<SearchOutlined className="opacity-60 mr-1" />}
                placeholder="Nhập mã sinh viên"
                className="shadow-sm w-[250px]"
                onChange={handleChangeInputStudentId}
                value={valueSearchStudent.get("studentId")}
              />
            </Tooltip>
            <Popover
              placement="bottom"
              content={<ContentPopoverStudent />}
              trigger="click"
              open={openPopover}
              onOpenChange={(open) => dispatch(setOpen(open))}
            >
              <Button
                className="flex justify-center items-center bg-white"
                icon={<FilterOutlined />}
              >
                Lọc
              </Button>
            </Popover>
          </Space>
        </Space>
        <Title
          className="hidden xl:block"
          level={3}
          style={{ textTransform: "uppercase", marginBottom: 0 }}
        >
          Danh sách sinh viên khoa
        </Title>
        <Space size={8}>
          <ButtonCustom
            title="Thùng rác"
            icon={<DeleteFilled />}
            handleClick={handleClickBtnTrush}
          />
          <Upload {...props}>
            <ButtonCustom
              title="Thêm danh sách sinh viên"
              icon={<UploadOutlined />}
              loading={importStudentList.isLoading}
            />
          </Upload>
          <ButtonCustom
            title="Thêm sinh viên"
            icon={<UserAddOutlined />}
            handleClick={handleClickBtnAddStudent}
          />
        </Space>
      </div>
      <div className="relative">
        <Table
          scroll={{
            y: 630,
          }}
          rowKey="id"
          loading={getStudentList.isFetching}
          rowSelection={{
            onChange: handleChangeRowSelection,
          }}
          bordered={true}
          dataSource={studentList}
          columns={columns}
          pagination={{
            onChange: handleChangePaginationTable,
            defaultCurrent: 1,
            pageSize: pageSize,
            total: total,
            current: pageCurrent,
            showSizeChanger: true,
            pageSizeOptions: [10, 50, 100, 200],
          }}
        />
        <div className="absolute bottom-0 left-0">
          <ButtonCustom
            title="Xuất danh sách sinh viên"
            loading={exportStudentFormExcel.isLoading}
            handleClick={handleClickBtnExportFileStudentList}
            icon={<DownloadOutlined />}
          />
        </div>
      </div>
      <ModalFormStudentInfo
        onSuccess={() => {
          setOpenModalFormStudent(false);
        }}
        dataStudent={dataStudent}
        openForm={openModalFormUser}
        onChangeClickOpen={(open) => {
          if (!open) {
            setDataStudent({});
            setOpenModalFormStudent(false);
            setDisabled(false);
          }
        }}
        disabled={disabled}
      />
      <ModalTrashCanStudent
        open={openModalTrush}
        close={() => setOpenModalTrush(false)}
      />
      <ModalShowError
        dataError={dataError}
        open={openModalError}
        setOpen={(open) => setOpenModalError(open)}
      />
      <Drawer
        size="large"
        open={openDrawerInfo}
        onClose={handleClickBtnCloseDrawerDetailStudent}
        placement="right"
      >
        <DescriptionInfoStudent dataStudent={dataStudent} />
      </Drawer>
    </div>
  );
}

export default ManagerStudentPage;
