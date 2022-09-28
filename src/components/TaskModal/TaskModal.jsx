import {
  Button,
  Checkbox,
  DatePicker,
  Dropdown,
  Input,
  Mentions,
  Modal,
  Select,
  Skeleton,
  Menu,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import { useSelector, useDispatch } from "react-redux";
import { DashboardTypes } from "../../redux/actionTypes";
import "react-quill/dist/quill.snow.css";
import { EllipsisOutlined, DeleteOutlined } from "@ant-design/icons";
import { DeleteTask } from "../../redux/actions/dashboard/dashboard.action";
const { DASHBOARD_TASK_MODAL_VIEW_OFF } = DashboardTypes;

const { Option } = Select;

const TaskModal = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const taskModalOpen = useSelector((state) => state?.dashboard?.taskCardModal);
  const [taskContent, setTaskContent] = useState("");
  const taskDetails = useSelector(
    (state) => state?.dashboard?.singleTaskDetail
  );

  const menu = (
    <Menu
      items={[
        {
          key: "2",
          label: (
            <p
              onClick={() => dispatch(DeleteTask(taskDetails?._id))}
              style={{ color: "tomato" }}
            >
              Delete task
            </p>
          ),
          icon: <DeleteOutlined style={{ color: "tomato" }} />,
        },
      ]}
    />
  );

  useEffect(() => {
    taskDetails?._id && setLoader(false);
  }, [taskDetails]);

  return (
    <div>
      {taskModalOpen && (
        <Modal
          className="ant-modal"
          title={
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ color: "#333" }}>Task details</p>
              <div
                style={{
                  marginRight: 30,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  style={{
                    marginRight: "25px",
                    fontSize: 16,
                    color: "#929292",
                  }}
                  // onChange={() =>
                  //   setFormData({ ...formData, private: !formData?.private })
                  // }
                >
                  Private
                </Checkbox>
                <Dropdown overlay={menu}>
                  <a onClick={(e) => e.preventDefault()}>
                    <EllipsisOutlined style={{ fontSize: 25 }} />
                  </a>
                </Dropdown>
              </div>
            </div>
          }
          width="100vh"
          open={taskModalOpen}
          footer={null}
          // onOk={handleOk}
          onCancel={() => dispatch({ type: DASHBOARD_TASK_MODAL_VIEW_OFF })}
        >
          {loader ? (
            <Skeleton />
          ) : (
            <>
              <Input
                size="large"
                placeholder="Task title"
                style={{ borderBottom: "1px solid #ddd", marginBottom: 10 }}
                value={taskDetails?.title}
                // onChange={(e) =>
                //   setFormData({ ...formData, title: e.target.value })
                // }
                bordered={false}
              />
              <div className="task_modal_content">
                <div className="task_modal_flex" style={{ marginBottom: 20 }}>
                  <div style={{ marginRight: 100 }}>
                    <p style={{ marginRight: 10, color: "#929292" }}>
                      Assign to
                    </p>
                    <Select
                      value={taskDetails?.assignedTo?.fullName}
                      style={{
                        width: 200,
                      }}
                      placeholder="Choose person"
                      className="assign_select"
                      bordered={false}
                      //   onChange={(value) =>
                      //     setFormData({ ...formData, assignedTo: value })
                      //   }
                    >
                      {/* {people &&
                    people.length > 0 &&
                    people.map((ele, i) => {
                      return (
                        <Option key={i} value={ele?._id}>
                          {ele?.fullName}
                        </Option>
                      );
                    })} */}
                    </Select>
                  </div>
                  <div>
                    <p style={{ marginRight: 10, color: "#929292" }}>
                      Due date
                    </p>
                    <DatePicker
                      //   value={taskDetails?.dueDate}
                      //   onChange={(value) =>
                      //     setFormData({ ...formData, dueDate: value?._d })
                      //   }
                      bordered={false}
                    />
                  </div>
                </div>
                <div className="task_modal_flex">
                  <div style={{ marginRight: 100 }}>
                    <p style={{ marginRight: 10, color: "#929292" }}>Status</p>
                    <Select
                      bordered={false}
                      value={taskDetails?.status?.replace("_", " ")}
                      style={{
                        width: 200,
                      }}
                      placeholder="Choose a status"
                      className="assign_select"
                      //   onChange={(value) =>
                      //     setFormData({ ...formData, status: value })
                      //   }
                    >
                      <Option value="not_started">Not started</Option>
                      <Option value="in_progress">In progress</Option>
                      <Option value="complete">Complete</Option>
                      <Option value="on_hold">On hold</Option>
                    </Select>
                  </div>
                  <div>
                    <p style={{ marginRight: 10, color: "#929292" }}>
                      Dependenices
                    </p>
                    <Input
                      //   onChange={(e) =>
                      //     setFormData({ ...formData, dependencies: e.target.value })
                      //   }
                      bordered={false}
                      placeholder="Type in here"
                    />
                  </div>
                </div>
              </div>
              <hr />
              <div style={{ padding: 10 }}>
                <Mentions
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                  }}
                  //   onChange={(value) => {
                  //     setMention({
                  //       ...mention,
                  //       commentBody: value,
                  //     });
                  //   }}
                  //   onSelect={(option) => {
                  //     setMention({
                  //       ...mention,
                  //       mentionTo: option?.key,
                  //     });
                  //   }}
                  placeholder="Type @ to mention a user"
                >
                  {/* {people &&
                people.length > 0 &&
                people.map((ele) => {
                  return (
                    <Option key={ele?._id} value={ele?.fullName} i>
                      {ele?.fullName}
                    </Option>
                  );
                })} */}
                </Mentions>
              </div>
              <hr />
              <div style={{ padding: 10, marginTop: 10 }}>
                {/* <TextArea
                  value={taskDetails?.task_content}
                  //   onChange={(e) =>
                  //     setFormData({ ...formData, task_content: e.target.value })
                  //   }
                  placeholder="Task description"
                  bordered={false}
                  autoSize={{
                    minRows: 3,
                    maxRows: 5,
                  }}
                /> */}
                <ReactQuill
                  style={{ border: "none" }}
                  theme="snow"
                  value={taskDetails?.task_content}
                  onChange={setTaskContent}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {/* <Button
              className="button_main"
              // onClick={() => handleCreateTask()}
            >
              Create task
            </Button> */}
              </div>
            </>
          )}
        </Modal>
      )}
    </div>
  );
};

export default TaskModal;
