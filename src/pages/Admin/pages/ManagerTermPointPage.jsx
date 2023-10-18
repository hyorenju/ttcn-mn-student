import { adminDisplayApi } from "@/API/admin/adminDisplayApi";
import { adminPointApi } from "@/API/admin/adminPointApi";
import { ButtonCustom } from "@/components/Button";
import {
  notificationError,
  notificationSuccess,
} from "@/components/Notification";
import {
  deletePoint,
  setDataPointList,
  setPageCurrent,
  setPageSize,
  setStudentId,
  setTermId,
  setTotal,
} from "@/redux/Point/pointSlice";
import { addPoint } from "@/redux/Trash/pointTrashSilce";
import {
  DeleteFilled,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  FilterOutlined,
  MoreOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  UploadOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Button,
  Input,
  Popconfirm,
  Popover,
  Space,
  Table,
  Typography,
  Upload,
} from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import {
  ModalFormPoint,
  ModalShowError,
  ModalTrashCanPoint,
} from "../components/Modal";
import { ContentPopoverPoint } from "../components/Popover";

function ManagerTermPointPage() {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const { pointList, studentId, termId, total, pageCurrent, pageSize, filter } =
    useSelector((state) => state.pointList);
  const [disabled, setDisabled] = useState(false);
  const [openModalFormPoint, setOpenModalFormPoint] = useState(false);
  const [openModalTrush, setOpenModalTrush] = useState(false);
  const [openModalError, setOpenModalError] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataPoint, setDataPoint] = useState({});
  const [dataError, setDataError] = useState({});
  const [valueSearchTermId, setValueSearchTermId] = useState("");
  const [valueSearchStudentId, setValueSearchStudentId] = useState("");
  const [termIdValue] = useDebounce(valueSearchTermId, 750);
  const [studentIdValue] = useDebounce(valueSearchStudentId, 750);
  dispatch(setStudentId(studentIdValue));
  dispatch(setTermId(termIdValue));

  // Handle get data points
  const getDataPoint = useQuery({
    cacheTime: 5 * 60 * 5000,
    keepPreviousData: true,
    queryKey: [
      "pointTermList",
      studentId,
      termId,
      pageCurrent,
      pageSize,
      filter,
    ],
    queryFn: async () =>
      await adminPointApi.getAllPoint({
        studentId: studentId,
        termId: termId,
        page: pageCurrent,
        size: pageSize,
        filter: filter,
      }),
    onSuccess: (data) => {
      if (data && data.success === true) {
        dispatch(setDataPointList(data.data.items));
        dispatch(setTotal(data.data.total));
      }
    },
  });

  // Handle click confirm delete major
  const deletePointTerm = useMutation({
    mutationKeys: ["deletePoint"],
    mutationFn: async (id) => adminPointApi.deletePoint(id),
    onSuccess: (data) => {
      if (data && data.success === true) {
        notificationSuccess("Xóa thành công");
        dispatch(deletePoint(data.data.point));
        dispatch(addPoint(data.data));
      } else {
        notificationError("Xóa thất bại");
      }
    },
  });

  const importFileData = useMutation({
    mutationKey: ["importFileDataPoint"],
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("file", file.file);
      return await adminPointApi.importPointStudent(formData);
    },
    onSuccess: (res) => {
      if (res && res.success === true) {
        window.open(res.data);
        notificationSuccess(
          "Đã xuất file excel thành công hãy kiểm tra trong máy của bạn nhé "
        );
      } else if (res && res.success === false) {
        getDataError.mutate();
        notificationError(
          `Upload file thất bại. Hãy làm theo đúng form excel được tải về máy của bạn`
        );
        setOpenModalError(true);
        window.open(res.error?.message);
      }
    },
  });

  // handle export file data student points
  const exportFileData = useMutation({
    mutationKey: ["exportFileDataPoint"],
    mutationFn: async () =>
      await adminPointApi.exportPointStudent({
        studentId: studentId,
        termId: termId,
        filter: filter,
      }),
    onSuccess: (data) => {
      if (data && data.success === true) {
        window.open(data.data);
        notificationSuccess(
          "Đã xuất file excel thành công hãy kiểm tra trong máy của bạn nhé "
        );
      } else {
        notificationError("Có lỗi");
      }
    },
  });
  const getDataError = useMutation({
    mutationKey: ["getDataError"],
    mutationFn: async () => await adminDisplayApi.getDisplayErrorImport(1),
    onSuccess: (res) => {
      if (res && res.success === true) {
        setDataError(res.data);
      }
    },
  });
  // ===============================
  const hasSelected = selectedRowKeys.length > 0;
  const handleConfirmDeletePoint = (id) => {
    deletePointTerm.mutate(id);
  };
  const handleExportFileData = () => {
    exportFileData.mutate();
  };
  const handleChangeInputStudentId = (e) => {
    dispatch(setPageCurrent(1));
    setValueSearchStudentId(e.target.value);
  };
  const handleChangeInputTermId = (e) => {
    dispatch(setPageCurrent(1));
    setValueSearchTermId(e.target.value);
  };
  const handleClickAddPointTerm = () => {
    setOpenModalFormPoint(true);
  };
  const handleEditPointTerm = (record) => {
    setDisabled(true);
    setOpenModalFormPoint(true);
    setDataPoint(record);
  };
  const handleClickBtnTrush = () => {
    setOpenModalTrush(true);
  };
  const handleChanePageTable = (page, size) => {
    dispatch(setPageCurrent(page));
    dispatch(setPageSize(size));
  };
  const handleChangeRowSelection = (e, record) =>
    setSelectedRowKeys(record.map((data) => data.id));
  // =================================
  const props = {
    name: "file",
    multiple: false,
    showUploadList: false,
    customRequest: (file) => importFileData.mutate(file),
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
      dataIndex: ["student", "id"],
      align: "center",
      key: "studentId",
    },
    {
      title: "Họ đệm",
      dataIndex: ["student", "surname"],
      align: "center",
      key: "surname",
      width: "15%",
    },
    {
      title: "Tên",
      dataIndex: ["student", "lastName"],
      align: "center",
      key: "lastName",
    },
    {
      title: "Mã học kì",
      dataIndex: ["term", "id"],
      align: "center",
      key: "termId",
    },
    {
      title: "Điểm trung bình (hệ 10)",
      dataIndex: "avgPoint10",
      align: "center",
      key: "avgPoint10",
    },
    {
      title: "Điểm trung bình (hệ 4)",
      dataIndex: "avgPoint4",
      align: "center",
      key: "avgPoint4",
    },
    {
      title: "Điểm rèn luyện",
      dataIndex: "trainingPoint",
      align: "center",
      key: "trainingPoint",
    },
    {
      title: "Tín chỉ tích lũy",
      dataIndex: "creditsAcc",
      align: "center",
      key: "creditsAcc",
    },
    {
      title: "Điểm trung bình tích lũy (hệ 10)",
      dataIndex: "pointAcc10",
      align: "center",
      key: "pointAcc10",
    },
    {
      title: "Điểm trung bình tích lũy (hệ 4)",
      dataIndex: "pointAcc4",
      align: "center",
      key: "pointAcc4",
    },
    {
      align: "center",
      width: "4%",
      render: (e, record, idx) => (
        <Popover
          key={idx}
          trigger={"click"}
          placement="left"
          content={
            <Space direction="vertical">
              <ButtonCustom
                title="Chỉnh sửa"
                icon={<EditOutlined />}
                handleClick={() => handleEditPointTerm(record)}
              />
              <Popconfirm
                title={`Bạn có chắc chắn muốn xóa điểm của sinh viên ${record.studentId} trong học kỳ ${record.termId}`}
                icon={<DeleteOutlined />}
                okText="Xóa"
                okType="danger"
                onConfirm={() => handleConfirmDeletePoint(record.id)}
              >
                <Button
                  danger
                  loading={deletePointTerm.isLoading}
                  className="flex justify-center items-center text-md shadow-md"
                  icon={<DeleteOutlined />}
                >
                  Xóa
                </Button>
              </Popconfirm>
            </Space>
          }
        >
          <Button
            className="flex items-center justify-center  bg-white"
            icon={<MoreOutlined />}
          />
        </Popover>
      ),
    },
  ];
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <Space>
          <ButtonCustom
            title="Xóa hết"
            icon={<UsergroupDeleteOutlined />}
            type="primary"
            disabled={!hasSelected}
          />
          <Input
            prefix={<SearchOutlined className="opacity-60 mr-1" />}
            placeholder="Nhập mã sinh viên"
            className="shadow-sm w-[200px]"
            onChange={handleChangeInputStudentId}
            value={valueSearchStudentId}
          />
          <Input
            placeholder="Nhập mã học kì"
            className="shadow-sm w-[200px]"
            onChange={handleChangeInputTermId}
            value={valueSearchTermId}
          />
          <Popover
            placement="bottom"
            content={<ContentPopoverPoint />}
            trigger="click"
          >
            <Button
              icon={<FilterOutlined />}
              className="flex justify-center items-center text-md font-medium shadow-md bg-slate-100"
            >
              Lọc
            </Button>
          </Popover>
        </Space>
        <Title
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            marginBottom: 0,
          }}
          level={3}
        >
          Danh sách điểm học kỳ
        </Title>
        <Space>
          <ButtonCustom
            title="Thùng rác"
            icon={<DeleteFilled />}
            handleClick={handleClickBtnTrush}
          />
          <Upload {...props}>
            <ButtonCustom
              title={"Thêm danh sách điểm"}
              icon={<UploadOutlined />}
              loading={importFileData.isLoading}
            />
          </Upload>
          <ButtonCustom
            icon={<PlusCircleOutlined />}
            handleClick={handleClickAddPointTerm}
            title={"Thêm điểm"}
          />
        </Space>
      </div>
      <div className="relative">
        <Table
          scroll={{
            y: 630,
          }}
          rowKey="id"
          rowSelection={{
            onChange: handleChangeRowSelection,
          }}
          bordered={true}
          loading={getDataPoint.isFetching}
          dataSource={pointList}
          columns={columns}
          pagination={{
            onChange: handleChanePageTable,
            defaultCurrent: 1,
            pageSize: pageSize,
            total: total,
            current: pageCurrent,
            showSizeChanger: true,
          }}
        />
        {pointList && (
          <div className="absolute bottom-3 left-0">
            <ButtonCustom
              title="Xuất danh sách điểm"
              loading={exportFileData.isLoading}
              handleClick={handleExportFileData}
              icon={<DownloadOutlined />}
            />
          </div>
        )}
      </div>
      <ModalFormPoint
        onSuccess={() => {
          setOpenModalFormPoint(false);
        }}
        openForm={openModalFormPoint}
        dataPoint={dataPoint}
        onChangeClickOpen={(open) => {
          if (!open) {
            setDataPoint({});
            setDisabled(false);
            setOpenModalFormPoint(false);
          }
        }}
        disabled={disabled}
      />
      <ModalShowError
        open={openModalError}
        setOpen={(open) => setOpenModalError(open)}
        dataError={dataError}
      />
      <ModalTrashCanPoint
        open={openModalTrush}
        close={() => setOpenModalTrush(false)}
      />
    </div>
  );
}

export default ManagerTermPointPage;
