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
import { Modal as AntdModal } from "antd";
import download from "downloadjs";
import axios from "axios";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { API_URL } from "../../../../utils/url";
import { DeleteResource } from "../../../../redux/actions";
import { useDispatch } from "react-redux";

const ShowAllFiles = () => {
  const dispatch = useDispatch();
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/get-all-files`);
        setErrorMsg("");
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesList();
  }, []);

  const { confirm } = AntdModal;

  console.log(filesList, "FILES");

  const showDeleteConfirm = (projectID) => {
    confirm({
      title: "Are you sure delete this resource?",
      icon: <ExclamationCircleOutlined />,
      content: "This action can't be undo!",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",

      onOk() {
        dispatch(DeleteResource(projectID));
      },

      onCancel() {
        console.log("Cancel");
      },
    });
  };

  // const downloadFile = async (id, path, mimetype) => {
  // 	try {
  // 		const result = await axios.get(`${API_URL}/download/${id}`, {
  // 			responseType: 'blob',
  // 		});
  // 		const split = path.split('/');
  // 		const filename = split[split?.length - 1];
  // 		setErrorMsg('');
  // 		return download(result.data, filename, mimetype);
  // 	} catch (error) {
  // 		if (error.response && error.response.status === 400) {
  // 			setErrorMsg('Error while downloading file. Try again later');
  // 		}
  // 	}
  // };

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
          {filesList?.sortedByCreationDate?.length > 0 ? (
            filesList?.sortedByCreationDate?.map(
              ({ _id, title, description, file_path, file_mimetype }) => (
                <Tr key={_id}>
                  <Td className="file-title">{title}</Td>
                  <Td>
                    <IconButton
                      // colorScheme='blue'
                      icon={<DownloadIcon />}
                      // onClick={() => downloadFile(_id, file_path, file_mimetype)}
                    />

                    <IconButton
                      // colorScheme='blue'
                      icon={<DeleteIcon />}
                      onClick={() => showDeleteConfirm()}
                      // onClick={() => downloadFile(_id, file_path, file_mimetype)}
                    />
                  </Td>
                </Tr>
              )
            )
          ) : (
            <Tr>
              <Td colSpan={3} style={{ fontWeight: "300" }}>
                No files found. Please add some.
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>{" "}
    </TableContainer>
    // <div className='files-container'>
    // 	{errorMsg && <p className='errorMsg'>{errorMsg}</p>}
    // 	<table className='files-table'>

    // 		<tbody>
    // 			{filesList.length > 0 ? (
    // 				filesList.map(({ _id, title, description, file_path, file_mimetype }) => (
    // 					<tr key={_id}>
    // 						<td className='file-title'>{title}</td>
    // 						<td className='file-description'>{description}</td>
    // 						<td>
    // 							<a href='#/' onClick={() => downloadFile(_id, file_path, file_mimetype)}>
    // 								Download
    // 							</a>
    // 						</td>
    // 					</tr>
    // 				))
    // 			) : (
    // 				<tr>
    // 					<td colSpan={3} style={{ fontWeight: '300' }}>
    // 						No files found. Please add some.
    // 					</td>
    // 				</tr>
    // 			)}
    // 		</tbody>
    // 	</table>
    // </div>
  );
};

export default ShowAllFiles;
