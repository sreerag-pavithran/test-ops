import React from "react";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { ViewOffIcon } from "@chakra-ui/icons";
import { Tag } from "antd";
import dayjs from "dayjs";
import { MinusCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

import { DashboardTypes } from "../../redux/actionTypes";
import TaskModal from "../TaskModal/TaskModal";
import { GetTaskByID } from "../../redux/actions/dashboard/dashboard.action";
const { DASHBOARD_TASK_MODAL_VIEW_ON } = DashboardTypes;

const TaskCard = ({ tasks }) => {
  const dispatch = useDispatch();

  return (
    <>
      <TaskModal />
      {tasks?.map((ele, i) => {
        return (
          <Box
            onClick={() => {
              dispatch(GetTaskByID(ele?._id));
              dispatch({ type: DASHBOARD_TASK_MODAL_VIEW_ON });
            }}
            w="250px"
            borderWidth="2px"
            borderRadius="6px"
            padding="10px"
            marginBottom="15px"
            borderColor="#CCCCCC"
            cursor="pointer"
            backgroundColor="#E9E9E9"
          >
            <Flex justifyContent="space-between">
              <Tag
                icon={
                  ele?.status == "not_started" ? (
                    <MinusCircleOutlined />
                  ) : ele?.status == "in_progress" ? (
                    <ClockCircleOutlined />
                  ) : (
                    <MinusCircleOutlined />
                  )
                }
                color={
                  ele?.status == "not_started"
                    ? "default"
                    : ele?.status == "in_progress"
                    ? "warning"
                    : "default"
                }
              >
                {ele?.status == "not_started"
                  ? "Not started"
                  : ele?.status == "in_progress"
                  ? "In progress"
                  : ele?.status?.replace("_", " ")}
              </Tag>
              {ele?.is_private && <Icon as={ViewOffIcon} color="#727272" />}
            </Flex>
            <p style={{ marginTop: 25, fontSize: 16, fontWeight: 400 }}>
              {ele?.title}
            </p>

            <Flex justifyContent="space-between" marginTop="25px">
              {/* <Tag colorScheme="red" borderRadius="full" fontSize="11px"> */}
              <p>
                {ele?.assignedTo?.fullName ? ele?.assignedTo?.fullName : ""}
              </p>
              {/* </Tag> */}
              <p style={{ fontSize: "11px", color: "#727272" }}>
                Due {dayjs(ele?.dueDate).format("MM/DD")}
              </p>
            </Flex>
          </Box>
        );
      })}
    </>
  );
};

export default TaskCard;
