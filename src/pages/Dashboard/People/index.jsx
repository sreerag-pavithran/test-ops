import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ShowAllPeople from "./ShowPeople";
import AsyncSelect from "react-select/async";
import { useNavigate } from "react-router-dom";
import Dashboard from "../";
import axios from "axios";
import { API_URL } from "../../../utils/url";
import {
  Text,
  Flex,
  Box,
  Heading,
  Spacer,
  Button,
  Select,
  Modal,
  ModalContent,
  Input,
  useDisclosure,
  ModalBody,
  FormControl,
  ModalCloseButton,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  FormLabel,
  Divider,
  Badge,
} from "@chakra-ui/react";
const RoleData = [
  { value: "Internal Admin", data: "Some data" },
  { value: "External Admin", data: "Some data" },
  { value: "External Editor", data: "Some data" },
];

const People = (props) => {
  const [peopleData, SetPeopleData] = useState({
    fullName: "",
    email: "",
    role: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [gotorole, seTGoToRole] = useState(false);
  const [role, setRole] = useState([]);
  const [addRole, setAddRole] = useState({
    value: "",
    access: "",
  });

  //  ADD ROLE
  const handleRoleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { value, access } = addRole;
      if (value !== "" || access !== "") {
        setErrorMsg("");
        let role = {
          value,
          access,
        };
        await axios.post(`${API_URL}/add-role`, role);
        seTGoToRole(!gotorole);
        onClose();
        navigate("/people");
      } else {
        setErrorMsg("Please enter all the field values.");
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  // GET ALL ROLE
  const fetchData = async () => {
    const { data } = await axios.get(`${API_URL}/get-all-role`);
    setRole(data?.data.allRoles);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    SetPeopleData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onChangeHandlerRole = (e) => {
    setAddRole((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  // ADD PEOPLE
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const { fullName, email, role } = peopleData;
      if (fullName !== "" || email !== "" || role !== "") {
        setErrorMsg("");
        let user = {
          fullName,
          email,
          role,
        };
        await axios.post(`${API_URL}/add-people`, user);
        onClose();
        navigate("/people");
      } else {
        setErrorMsg("Please enter all the field values.");
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  console.log("People data", peopleData);
  // const SelectHandleChange = (selectedOptions) => {
  // 	console.log('selectedOptions', selectedOptions);
  // };

  // const loadOptions = async (searchValue, callback) => {
  // 	const { data } = await axios.get(`${API_URL}/get-all-role`);
  // 	setRole(data?.data.allRoles);
  // 	console.log('selectedOptions', data);
  // 	const filteredOptions = role?.filter((option) => {
  // 		option.label.toLowerCase().includes(searchValue.toLowerCase());
  // 	});
  // 	console.log('Load options', searchValue, filteredOptions);
  // 	callback(filteredOptions);
  // };
  return (
    <Dashboard>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box p="2">
          <Heading size="lg">Resources</Heading>
        </Box>
        <Spacer />

        <Button colorScheme="blue" onClick={onOpen}>
          Add People
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader size="xl">Add Person</ModalHeader>
          <Text ml={6} mt={-3} mb={5} size={10}>
            This won't sent an invite, you can do that later
          </Text>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Full name</FormLabel>
              <Input
                placeholder="Full name"
                size="lg"
                id="fullName"
                name="fullName"
                value={peopleData.fullName}
                onChange={onChangeHandler}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                size="lg"
                id="email"
                name="email"
                value={peopleData.email}
                onChange={onChangeHandler}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Role</FormLabel>
              <Select
                placeholder="Role"
                name="access"
                id="role"
                value={peopleData.role}
                onChange={onChangeHandler}
              >
                {role?.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.value}
                    </option>
                  );
                })}
              </Select>

              <Button
                size="xs"
                mt={2}
                ml={335}
                onClick={() => seTGoToRole(!gotorole)}
              >
                Add role
              </Button>
              {/* <AsyncSelect loadOptions={loadOptions} onChange={SelectHandleChange} /> */}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleOnSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {gotorole ? (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader size="xl">Add role</ModalHeader>
            <Text ml={6} mt={-3} mb={5} size={10}>
              This won't sent an invite, you can do that later
            </Text>
            <ModalCloseButton onClick={() => seTGoToRole(!gotorole)} />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Role Name</FormLabel>
                <Input
                  placeholder="Role name"
                  name="value"
                  id="value"
                  value={addRole.value}
                  onChange={onChangeHandlerRole}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Role access</FormLabel>
                <FormLabel>Role</FormLabel>
                <Select
                  placeholder="Role access"
                  name="access"
                  id="access"
                  value={addRole.access}
                  onChange={onChangeHandlerRole}
                >
                  {RoleData?.map((item) => {
                    return (
                      <option value={item.value} key={item.id}>
                        {item.value}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleRoleSubmit}>
                Done
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      ) : (
        ""
      )}
      <ShowAllPeople />
    </Dashboard>
  );
};

export default People;
