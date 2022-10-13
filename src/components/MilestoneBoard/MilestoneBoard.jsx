import { PlusOutlined } from "@ant-design/icons";

import React from "react";

import "./style.css";
import dayjs from "dayjs";
import TaskCard from "../TaskCard/TaskCard";
import { useState } from "react";
import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  message,
  Modal,
  Select,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import "../../index.css";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateTaskApi,
  FetchCurrentMilestone,
} from "../../redux/actions/dashboard/dashboard.action";
import { FetchPeopleApi } from "../../redux/actions/people/people.action";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mentions } from "antd";
import { useDisclosure } from "@chakra-ui/react";

import {
  DashboardTypes,
  PeopleTypes,
  RolesTypes,
} from "../../redux/actionTypes";
import AddRoleModal from "../AddRoleModal/AddRoleModal";
import AddPeopleModal from "../AddPeopleModal/AddPeopleModal";
import ReactQuill from "react-quill";
import axios from "axios";
import { API_URL } from "../../utils/url";
const {
  DASHBOARD_TASK_MODAL_ON,
  DASHBOARD_TASK_MODAL_OFF,
  DASHBOARD_SET_CURRENT_MILESTONE,
} = DashboardTypes;

const { PEOPLE_MOADL_ON } = PeopleTypes;
const { ROLES_GLOBAL_MODAL_ON } = RolesTypes;

const { Option } = Select;

const MilestoneBoard = (data) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openPeople, setOpenPeople] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [mileStoneTitle, setMileStoneTitle] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    task_content: "",
    assignedTo: "",
    milestone_ref: "",
    assignedBy: null,
    // comment: "",
    status: "",
    dependencies: "",
    dueDate: "",
    is_private: false,
  });
  const [mention, setMention] = useState({
    commentBody: "",
    taskRef: "",
    mentionTo: "",
  });
  const dispatch = useDispatch();
  const { data: milestone } = data;

  const people = useSelector((state) => state?.people?.people);
  const authUser = useSelector((state) => state?.auth?.user);
  const dashboard = useSelector((state) => state?.dashboard);

  const currentProject = localStorage.getItem("currentProject");
  const currentMileStone = localStorage.getItem("currentMileStone");

  useEffect(() => {
    setFormData({ ...formData, milestone_ref: dashboard?.currentMileStone });
  }, [dashboard]);

  useEffect(() => {
    if (!currentProject) {
      navigate("/projects");
    }
  }, []);

  useEffect(() => {
    setFormData({ ...formData, assignedBy: authUser?._id });
  }, []);

  const handleCreateTask = () => {
    setFormData({ ...formData, assignedBy: authUser?._id });
    dispatch(CreateTaskApi(formData, mention));
  };

  const toChildCallback = (status) => {
    setOpenPeople(false);
  };

  const handleUpdateMileStone = async () => {
    if (mileStoneTitle.length <= 0) {
      setEditMode(true);
      return;
    }
    const token = window.localStorage.getItem("token");
    const currentProject = window.localStorage.getItem("currentProject");
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    await axios
      .put(
        `${API_URL}/update-milestone/${milestone?._id}`,
        { title: mileStoneTitle },
        config
      )
      .then((res) => {
        message.success(res?.data?.msg);
        dispatch(FetchCurrentMilestone(currentProject));
      })
      .catch((err) => {
        message.error(err?.response?.data?.msg);
      });
  };

  return (
    <div style={{ width: "250px", marginBottom: "20px" }}>
      <AddPeopleModal
        isOpen={openPeople}
        isClose={false}
        callBackChild={toChildCallback}
      />
      {dashboard?.taskModal && (
        <Modal
          className="ant-modal"
          title={
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ color: "#333" }}>Create task</p>
              <Checkbox
                style={{ marginRight: "25px", fontSize: 16, color: "#929292" }}
                onChange={() =>
                  setFormData({
                    ...formData,
                    is_private: !formData?.is_private,
                  })
                }
              >
                Private
              </Checkbox>
            </div>
          }
          width="100vh"
          open={dashboard?.taskModal}
          footer={null}
          // onOk={handleOk}
          onCancel={() => {
            handleCreateTask();
            dispatch({ type: DASHBOARD_TASK_MODAL_OFF });
          }}
        >
          <Input
            size="large"
            placeholder="Task title"
            style={{ borderBottom: "1px solid #ddd", marginBottom: 10 }}
            value={formData?.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            bordered={false}
          />
          <div className="task_modal_content">
            <div className="task_modal_flex" style={{ marginBottom: 20 }}>
              <div style={{ marginRight: 100 }}>
                <p style={{ marginRight: 10, color: "#929292" }}>Assign to</p>
                <Select
                  style={{
                    width: 200,
                  }}
                  placeholder="Choose person"
                  className="assign_select"
                  bordered={false}
                  onChange={(value) => {
                    if (value === "add_people") {
                      return setOpenPeople(true);
                    } else if (value === "add_role") {
                      return dispatch({ type: ROLES_GLOBAL_MODAL_ON });
                    }
                    setFormData({ ...formData, assignedTo: value });
                  }}
                >
                  {people &&
                    people.length > 0 &&
                    people.map((ele, i) => {
                      return (
                        <Option key={i} value={ele?._id}>
                          {ele?.fullName}
                        </Option>
                      );
                    })}
                  <Option value="unassigned">Unassigned</Option>
                  <Option value="add_people">
                    <i class="bi bi-person-plus"></i> Add People
                  </Option>
                  <Option value="add_role">
                    <i class="bi bi-plus-circle"></i> Add Role
                  </Option>
                </Select>
              </div>
              <div>
                <p style={{ marginRight: 10, color: "#929292" }}>Due date</p>
                <DatePicker
                  onChange={(value) =>
                    setFormData({ ...formData, dueDate: value?._d })
                  }
                  bordered={false}
                />
              </div>
            </div>
            <div className="task_modal_flex">
              <div style={{ marginRight: 100 }}>
                <p style={{ marginRight: 10, color: "#929292" }}>Status</p>
                <Select
                  bordered={false}
                  style={{
                    width: 200,
                  }}
                  placeholder="Choose a status"
                  className="assign_select"
                  onChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <Option value="not_started">Not started</Option>
                  <Option value="in_progress">In progress</Option>
                  <Option value="complete">Complete</Option>
                  <Option value="on_hold">On hold</Option>
                </Select>
              </div>
              <div>
                <p style={{ marginRight: 10, color: "#929292" }}>
                  Dependencies
                </p>
                <Select
                  style={{
                    width: 200,
                  }}
                  placeholder="Choose person"
                  className="assign_select"
                  bordered={false}
                  onChange={(value) =>
                    setFormData({ ...formData, task_dependencies: [value] })
                  }
                >
                  {people &&
                    people.length > 0 &&
                    people.map((ele, i) => {
                      return (
                        <Option key={i} value={ele?._id}>
                          {ele?.fullName}
                        </Option>
                      );
                    })}
                </Select>
                {/* <Input
                  onChange={(e) =>
                    setFormData({ ...formData, dependencies: e.target.value })
                  }
                  bordered={false}
                  placeholder="Type in here"
                /> */}
              </div>
            </div>
          </div>
          <hr />
          {/* <div style={{ padding: 10 }}>
            <Mentions
              style={{
                width: "100%",
                border: "none",
                outline: "none",
              }}
              onChange={(value) => {
                setMention({
                  ...mention,
                  commentBody: value,
                });
              }}
              onSelect={(option) => {
                setMention({
                  ...mention,
                  mentionTo: option?.key,
                });
              }}
              placeholder="Type @ to mention a user"
            >
              {people &&
                people.length > 0 &&
                people.map((ele) => {
                  return (
                    <Option key={ele?._id} value={ele?.fullName} i>
                      {ele?.fullName}
                    </Option>
                  );
                })}
            </Mentions>
          </div> */}
          <hr />
          <div style={{ padding: 10, marginTop: 10 }}>
            <ReactQuill
              style={{ border: "none" }}
              theme="snow"
              // value={formData?.task_content}
              onChange={(e) => setFormData({ ...formData, task_content: e })}
            />
            {/* <TextArea
              // value={value}
              onChange={(e) =>
                setFormData({ ...formData, task_content: e.target.value })
              }
              placeholder="Task description"
              bordered={false}
              autoSize={{
                minRows: 3,
                maxRows: 5,
              }}
            /> */}
          </div>
          {/* <div style={{ display: "flex", justifyContent: "center" }}>
            <Button className="button_main" onClick={() => handleCreateTask()}>
              Create task
            </Button>
          </div> */}
        </Modal>
      )}
      {editMode ? (
        <Input
          bordered={false}
          onChange={(e) => setMileStoneTitle(e.target.value)}
          style={{
            fontSize: 24,
            border: "1px solid #ddd",
            borderTop: 0,
            borderRight: 0,
            borderLeft: 0,
            outline: "none",
          }}
          onBlur={() => {
            handleUpdateMileStone();
            setEditMode(false);
          }}
        />
      ) : (
        <h1 className="milestone_title" onClick={() => setEditMode(true)}>
          {milestone?.title}
        </h1>
      )}
      <p className="milestone_due">
        Due {dayjs(milestone?.dueDate).format("MM/DD")}
      </p>
      <hr
        style={{ marginBottom: 20, border: "1px solid #c4c4c4", marginTop: 5 }}
      />
      <TaskCard tasks={milestone?.tasks} />
      <PlusOutlined
        onClick={() => {
          dispatch({
            type: DASHBOARD_SET_CURRENT_MILESTONE,
            payload: milestone?._id,
          });
          localStorage.setItem("currentMileStone", milestone?._id);
          dispatch(FetchPeopleApi());
          dispatch({ type: DASHBOARD_TASK_MODAL_ON });
        }}
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          cursor: "pointer",
          fontSize: "25px",
          color: "#929292",
        }}
      />
    </div>
  );
};

export default MilestoneBoard;
