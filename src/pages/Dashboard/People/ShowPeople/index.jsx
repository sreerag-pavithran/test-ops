import React, { useState, useEffect } from "react";
import { DownloadIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  IconButton,
} from "@chakra-ui/react";
import axios from "axios";
import { API_URL } from "../../../../utils/url";

const ShowAllFiles = () => {
  const [peopleList, setPeopleList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const getPeopleList = async () => {
      try {
        let currentProject = localStorage.getItem("currentProject");
        const { data } = await axios.get(
          `${API_URL}/get-all-people/${currentProject}`
        );
        setErrorMsg("");
        setPeopleList(data.allPeople);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getPeopleList();
  }, []);

  return (
    <TableContainer>
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <Table variant="striped" colorScheme="grey">
        {/* <Thead>
					<Tr>
						<Th>Title</Th>
						<Th>Download</Th>
					</Tr>
				</Thead> */}
        <Tbody>
          {peopleList.length > 0 ? (
            peopleList.map(({ _id, fullName, email, role, access }) => (
              <Tr key={_id}>
                <Td className="file-title">{fullName}</Td>
                <Td className="file-title">{email}</Td>
                <Td className="file-title">{access}</Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={3} style={{ fontWeight: "300" }}>
                No people found. Please add some.
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>{" "}
    </TableContainer>
  );
};

export default ShowAllFiles;
