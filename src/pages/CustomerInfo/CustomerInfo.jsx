import { Button, Card } from "antd";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import SideBar from "../../Layout/SideBar/SideBar";
import { AddCustomerInfo } from "../../redux/actions/dashboard/dashboard.action";

const CustomerInfo = () => {
  const [value, setValue] = useState("");
  const [projectName, setProjectName] = useState("");
  const dispatch = useDispatch();

  const currentProject = localStorage.getItem("currentProject");

  useEffect(() => {
    const currentProjectName = localStorage.getItem("currentProjectName");
    setProjectName(currentProjectName);
  }, []);

  const handleUpdateInfo = () => {
    dispatch(AddCustomerInfo(value, currentProject));
  };
  return (
    <SideBar>
      <Card
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ color: "#333", fontSize: 30, fontWeight: "bold" }}>
              {projectName}
            </p>
            <Button onClick={() => handleUpdateInfo()} className="button_main">
              Save info
            </Button>
          </div>
        }
        bordered={false}
      >
        <ReactQuill theme="snow" value={value} onChange={setValue} />
      </Card>
    </SideBar>
  );
};

export default CustomerInfo;
