import React, { useState } from "react";
import { Button, Input, Modal, Select } from "antd";
import axios from "axios";
import { API_URL } from "../../utils/url";
import { FetchRolesApi } from "../../redux/actions/roles/roles.action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const AddRoleModal = (props, { openModal }) => {
  const dispatch = useDispatch();
  const [addRoleModal, setAddRoleModal] = useState(false);
  const [editRoleData, setsEditRoleData] = useState({});
  const [addRoleData, setAddRoleData] = useState({});

  const roles = useSelector((state) => state.roles);

  useEffect(() => {
    setAddRoleModal(roles?.rolesModalGlobal);
  }, [roles]);

  const addRoleApi = async () => {
    const token = window.localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    const currentProject = localStorage.getItem("currentProject");
    const res = await axios.post(
      `${API_URL}/add-role/${currentProject}`,
      { ...addRoleData },
      config
    );
    if (res?.statusText === "Created") {
      dispatch(FetchRolesApi());
      setAddRoleModal(false);
      //   if (addPeople) {
      //     onOpen();
      //   }
    }
  };

  return (
    <>
      <Modal
        closable={false}
        title={
          <h1
            style={{
              fontSize: 25,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Add Role
          </h1>
        }
        open={addRoleModal}
        // onOk={handleOk}
        footer={null}
        onCancel={() => setAddRoleModal(false)}
      >
        <Input
          style={{ marginBottom: 12 }}
          placeholder="Roll Name"
          value={editRoleData?.value}
          onChange={(e) =>
            setAddRoleData({ ...addRoleData, value: e.target.value })
          }
        />
        <Select
          style={{ marginBottom: 12, width: "100%" }}
          placeholder="Role access"
          value={addRoleData?.access}
          onChange={(e) =>
            setAddRoleData({ ...addRoleData, access: e.target.value })
          }
          // value={roleData?.role?.access}
        >
          <option value="project-admin">Project Admin</option>
          <option value="team-member">Team Member</option>
          <option value="customer">Customer/3rd Party</option>
          {/* <option value="company-admin">Company Admin</option> */}
          {/* <option value="external-viewer">External Viewer</option> */}
          {/* <option value="internal-editor">Internal Editor</option>
          <option value="external-editor">External Editor</option> */}
        </Select>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Button className="button_outline" onClick={() => addRoleApi()}>
            Save
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AddRoleModal;
