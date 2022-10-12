import React, { useState } from "react";
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

import axios from "axios";
import { API_URL } from "../../utils/url";
import { validateEmail } from "../../utils/validations";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { EditOutlined, InfoCircleFilled } from "@ant-design/icons";
import { CreateUserApi } from "../../redux/actions";
import { useEffect } from "react";
import { FetchRolesApi } from "../../redux/actions/roles/roles.action";
import { RolesTypes } from "../../redux/actionTypes";

const { ROLES_GLOBAL_MODAL_ON } = RolesTypes;

const AddPeopleModal = (props) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [people, setPeople] = useState([]);
  const [roles, setRoles] = useState([]);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [viewPeopleModal, setViewPeopleModal] = useState(false);
  const [editPeopleModal, setEditPeopleModal] = useState(false);
  const [viewRoleModal, setViewRoleModal] = useState(false);
  const [addRoleModal, setAddRoleModal] = useState(false);
  const [addPeople, setAddPeople] = useState(false);
  const [editRoleModal, setEditRoleModal] = useState(false);
  const [peopleData, setPeopleData] = useState({});
  const [editPeopleData, setEditPeopleData] = useState({});
  const [addRoleData, setAddRoleData] = useState({});
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
    dispatch(FetchRolesApi());
  }, []);

  const handleRolesOnchange = (value) => {
    setFormData({ ...formData, role: value });
  };

  const handleAddPerson = () => {
    setErr(false);
    setErrMsg(null);
    if (!validateEmail(formData?.email)) {
      setErr(true);
      setErrMsg("Invalid email");
      return;
    }
    const currentProject = localStorage.getItem("currentProject");
    if (!formData.email || !formData.fullName || !formData.role) {
      return setErr(true);
    }
    dispatch(CreateUserApi(formData, onClose, currentProject));
  };

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.callBackChild}>
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
                placeholder="Role name"
                onChange={(e) => {
                  if (e.target.value == "add-role") {
                    dispatch({ type: ROLES_GLOBAL_MODAL_ON });
                    setAddRoleModal(true);
                    setAddPeople(true);
                    onClose();
                  } else {
                    handleRolesOnchange(e.target.value);
                  }
                }}
              >
                {rolesState?.roles &&
                  rolesState?.roles?.map((ele) => {
                    return <option value={ele?._id}>{ele?.value}</option>;
                  })}
                <option value="add-role">
                  Add Role <InfoCircleFilled style={{ color: "#333" }} />{" "}
                </option>
              </Select>
            </FormControl>
            {err && <p style={{ color: "tomato" }}>All fields are required!</p>}
            {errMsg && <p style={{ color: "tomato" }}>{errMsg}</p>}
            <Button
              style={{ marginBottom: 20 }}
              onClick={() => handleAddPerson()}
            >
              Add person
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddPeopleModal;
