import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
import { Modal as AntdModal, Select as AntSelect } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../Layout/SideBar/SideBar";
import {
  CreateUserApi,
  DeletePeopleRole,
  FetchPeopleApi,
  UpdatePeopleRole,
} from "../../redux/actions";
import { FetchRolesApi } from "../../redux/actions/roles/roles.action";
import { EditOutlined, InfoCircleFilled } from "@ant-design/icons";

import "./style.css";

const { Option } = AntSelect;

const People = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [people, setPeople] = useState([]);
  const [roles, setRoles] = useState([]);
  const [err, setErr] = useState(false);
  const [viewPeopleModal, setViewPeopleModal] = useState(false);
  const [editPeopleModal, setEditPeopleModal] = useState(false);
  const [viewRoleModal, setViewRoleModal] = useState(false);
  const [addRoleModal, setAddRoleModal] = useState(false);
  const [editRoleModal, setEditRoleModal] = useState(false);
  const [peopleData, setPeopleData] = useState({});
  const [editPeopleData, setEditPeopleData] = useState({});
  const [roleData, setRoleData] = useState({});
  const [editRoleData, setsEditRoleData] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
  });

  const peopleState = useSelector((state) => state.people);
  const rolesState = useSelector((state) => state.roles);

  useEffect(() => {
    dispatch(FetchPeopleApi());
    dispatch(FetchRolesApi());
  }, []);

  useEffect(() => {
    peopleState?.people.length != 0 && setPeople(peopleState?.people);
  }, [peopleState]);

  useEffect(() => {
    rolesState?.roles && setRoles(rolesState?.roles);
  }, [rolesState]);

  const handleRolesOnchange = (value) => {
    setFormData({ ...formData, role: value });
  };

  const handleAddPerson = () => {
    console.log("COMING HERE");
    console.log(formData);
    if (!formData.email || !formData.fullName || !formData.role) {
      return setErr(true);
    }
    dispatch(CreateUserApi(formData));
  };

  console.log(roleData);
  console.log(editRoleData, "ROLE");

  return (
    <SideBar>
      <AntdModal
        closable={false}
        title={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1
              style={{
                fontSize: 25,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Profile
            </h1>
            <EditOutlined
              onClick={() => {
                setEditPeopleModal(true);
                setEditPeopleData(peopleData);
              }}
              style={{ fontSize: 20, cursor: "pointer" }}
            />
          </div>
        }
        open={viewPeopleModal}
        // onOk={handleOk}
        footer={null}
        onCancel={() => setViewPeopleModal(false)}
      >
        <div
          style={{
            color: "#929292",
            fontSize: 18,
            padding: 10,
            display: "flex",
          }}
        >
          <div>
            <p>Full Name</p>
            <p>Email</p>
            <p>Role Name</p>
            <p>Role Access</p>
            <p>Status</p>
          </div>
          <div style={{ marginLeft: 40 }}>
            <p style={{ color: "#333" }}>{peopleData?.fullName}</p>
            <p style={{ color: "#333" }}>{peopleData?.email}</p>
            <p style={{ color: "#333" }}>{peopleData?.role?.value}</p>
            <p style={{ color: "#333" }}>{peopleData?.role?.access}</p>
            <p style={{ color: "#333" }}></p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Button className="button_outline">Send invite</Button>
          <Button className="button_outline">Done</Button>
        </div>
      </AntdModal>
      <AntdModal
        closable={false}
        title={
          <h1
            style={{
              fontSize: 25,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Edit profile
          </h1>
        }
        open={editPeopleModal}
        // onOk={handleOk}
        footer={null}
        onCancel={() => setEditPeopleModal(false)}
      >
        <Input
          style={{ marginBottom: 12 }}
          placeholder="Full Name"
          value={editPeopleData?.fullName}
        />
        <Input
          value={editPeopleData?.email}
          style={{ marginBottom: 12 }}
          placeholder="Email"
        />
        <Input
          value={editPeopleData?.role?.value}
          style={{ marginBottom: 12 }}
          placeholder="Role"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Button className="button_no_outline">Delete</Button>
          <Button className="button_outline">Save</Button>
        </div>
      </AntdModal>
      <AntdModal
        closable={false}
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <h1
              style={{
                fontSize: 30,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Role
            </h1>
            <EditOutlined
              onClick={() => {
                setEditRoleModal(true);
                setsEditRoleData({
                  value: roleData?.role?.value,
                  access: roleData?.role?.access,
                  _id: roleData?.role?._id,
                });
              }}
              style={{ fontSize: 25, cursor: "pointer" }}
            />
          </div>
        }
        open={viewRoleModal}
        // onOk={handleOk}
        footer={null}
        onCancel={() => setViewRoleModal(false)}
      >
        <div
          style={{
            color: "#929292",
            fontSize: 18,
            padding: 10,
            display: "flex",
          }}
        >
          <div>
            <p>Role Name</p>
            <p>Role Access</p>
            <p>Assigned to</p>
          </div>
          <div style={{ marginLeft: 40 }}>
            <p style={{ color: "#333" }}>{roleData?.role?.value}</p>
            <p style={{ color: "#333" }}>{roleData?.role?.access}</p>
            <p style={{ color: "#333" }}>{roleData?.fullName}</p>
            <p style={{ color: "#333" }}></p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 20,
          }}
        >
          <Button className="button_outline">Done</Button>
        </div>
      </AntdModal>
      <AntdModal
        closable={false}
        title={
          <h1
            style={{
              fontSize: 25,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Edit Role
          </h1>
        }
        open={editRoleModal}
        // onOk={handleOk}
        footer={null}
        onCancel={() => setEditRoleModal(false)}
      >
        <Input
          style={{ marginBottom: 12 }}
          // placeholder={editRoleData?.role?.value}
          value={editRoleData?.value}
          onChange={(e) =>
            setsEditRoleData({ ...editRoleData, value: e.target.value })
          }
        />
        <Select
          style={{ marginBottom: 12 }}
          placeholder="Select option"
          value={editRoleData?.access}
          onChange={(e) =>
            setsEditRoleData({ ...editRoleData, access: e.target.value })
          }
          // value={roleData?.role?.access}
        >
          <option value="internal-admin">Internal Admin</option>
          <option value="internal-editor">Internal Editor</option>
          <option value="external-editor">External Editor</option>
        </Select>

        <Input
          disabled
          value={editRoleData?.fullName}
          style={{ marginBottom: 12 }}
          placeholder="Role"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Button
            onClick={() => dispatch(DeletePeopleRole(roleData?.role?._id))}
            className="button_no_outline"
          >
            Delete Role
          </Button>
          <Button
            className="button_outline"
            onClick={() => dispatch(UpdatePeopleRole(editRoleData))}
          >
            Save
          </Button>
        </div>
      </AntdModal>
      <AntdModal
        closable={false}
        style={{ zIndex: 999999 }}
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
          // placeholder={editRoleData?.role?.value}
          value={editRoleData?.value}
          onChange={(e) =>
            setsEditRoleData({ ...editRoleData, value: e.target.value })
          }
        />
        <Select
          style={{ marginBottom: 12 }}
          placeholder="Select option"
          value={editRoleData?.access}
          onChange={(e) =>
            setsEditRoleData({ ...editRoleData, access: e.target.value })
          }
          // value={roleData?.role?.access}
        >
          <option value="internal-admin">Internal Admin</option>
          <option value="internal-editor">Internal Editor</option>
          <option value="external-editor">External Editor</option>
        </Select>

        <Input
          disabled
          value={editRoleData?.fullName}
          style={{ marginBottom: 12 }}
          placeholder="Role"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Button
            onClick={() => dispatch(DeletePeopleRole(roleData?.role?._id))}
            className="button_no_outline"
          >
            Delete Role
          </Button>
          <Button
            className="button_outline"
            onClick={() => dispatch(UpdatePeopleRole(editRoleData))}
          >
            Save
          </Button>
        </div>
      </AntdModal>
      {peopleState?.peopleLoading ? (
        <Spinner
          style={{ display: "flex", justifyContent: "center", margin: "auto" }}
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
        <div>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add Person</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl style={{ marginBottom: 20 }}>
                  <Input
                    placeholder="Full name*"
                    value={formData?.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl style={{ marginBottom: 20 }}>
                  <Input
                    placeholder="Email*"
                    value={formData?.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl style={{ marginBottom: 20 }}>
                  <Select
                    placeholder="Select option"
                    onChange={(e) => {
                      if (e.target.value == "add-role") {
                        setAddRoleModal(true);
                      } else {
                        handleRolesOnchange(e.target.value);
                      }
                    }}
                  >
                    {roles &&
                      roles.map((ele) => {
                        return <option value={ele?._id}>{ele?.value}</option>;
                      })}
                    <option
                      value="add-role"
                      onClick={() => console.log("CLICKED")}
                    >
                      Add Role <InfoCircleFilled style={{ color: "#333" }} />{" "}
                    </option>
                  </Select>
                </FormControl>
                {err && (
                  <p style={{ color: "tomato" }}>All fields are required!</p>
                )}
                <Button
                  style={{ marginBottom: 20 }}
                  onClick={() => handleAddPerson()}
                >
                  Add person
                </Button>
              </ModalBody>
            </ModalContent>
          </Modal>
          <div className="people_flex">
            <p style={{ color: "#333", fontWeight: "bold", fontSize: 35 }}>
              People
            </p>
            <Button
              onClick={onOpen}
              colorScheme="linkedin"
              variant="outline"
              mt={4}
              mr={8}
              mb={4}
            >
              Add people
            </Button>
          </div>
          <hr style={{ border: "1px solid #c4c4c4" }} />
          {people &&
            people.map((ele) => {
              return (
                <div style={{ cursor: "pointer" }}>
                  <Box
                    borderRadius="lg"
                    display="flex"
                    mt={4}
                    ml={140}
                    p={4}
                    w="80%"
                    color="vlue"
                    justifyContent="space-between"
                    _hover={{
                      background: "#b2bcd6",
                      color: "white",
                    }}
                    key={12}
                  >
                    <Text
                      onClick={() => {
                        setViewPeopleModal(true);
                        setPeopleData(ele);
                      }}
                    >
                      {ele?.fullName}
                    </Text>
                    <Text
                      onClick={() => {
                        setViewRoleModal(true);
                        setRoleData(ele);
                      }}
                    >
                      {ele?.role?.value}
                    </Text>
                    <Text>{ele?.email}</Text>
                    <Text>
                      {dayjs(ele?.createdAt).format("MM:DD:YYYY h:mm A")}
                    </Text>
                  </Box>
                </div>
              );
            })}
        </div>
      )}
    </SideBar>
  );
};

export default People;
