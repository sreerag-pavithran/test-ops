import React from "react";
import {
  IconButton,
  Avatar,
  Box,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FiEyeOff, FiMenu, FiLogOut } from "react-icons/fi";
import { signout } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const currentProject = localStorage.getItem("currentProject");
const currentProjectName = localStorage.getItem("currentProjectName");

const LinkItems = [
  {
    name: "Overview",
    icon: "",
    path: `/overview/${currentProjectName}/${currentProject}`,
  },
  { name: "To Do", icon: "", path: "/to-do" },
  { name: "People", icon: "", path: "/people" },
  { name: "Resources", icon: "", path: `/resources` },
  { name: "Customer Info", icon: <FiEyeOff />, path: "/customer_info" },
  { name: "View Projects", path: "/projects" },
];

export default function Dashboard({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      minH="100vh"
      // bg={useColorModeValue("gray.100", "gray.900")}
      bgColor="#fff"
    >
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const projectData = useSelector((state) => state.dashboard);
  const [projectName, setProjectName] = useState(
    localStorage.getItem("currentProjectName")
  );

  useEffect(() => {}, []);

  const navigate = useNavigate();
  const handleSignOut = () => {
    dispatch(signout());
    navigate("/", { replace: true });
  };
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("#536593", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
          color="white"
        >
          {projectName}
        </Text>
      </Flex>

      {LinkItems.map((link) =>
        link.name != "To Do" && link.name != "Customer Info" ? (
          <NavItem
            key={link.name}
            to={link.path}
            color="white"
            style={{
              color: location.pathname == link.path && "#536593",
              backgroundColor: location.pathname == link.path && "#fff",
              fontWeight: location.pathname == link.path && "bold",
            }}
          >
            {link.name}
            {link.icon}
          </NavItem>
        ) : link.name === "Customer Info" ? (
          <NavItem
            style={{
              color: location.pathname == link.path && "#536593",
              backgroundColor: location.pathname == link.path && "#fff",
              fontWeight: location.pathname == link.path && "bold",
            }}
            key={link.name}
            to={link.path}
            color="white"
          >
            <Text mr={12}>{link.name}</Text>
            {link.icon}
          </NavItem>
        ) : (
          <NavItem
            style={{
              color: location.pathname == link.path && "#536593",
              backgroundColor: location.pathname == link.path && "#fff",
              fontWeight: location.pathname == link.path && "bold",
            }}
            key={link.name}
            to={link.path}
            color="white"
          >
            {link.name}
            <Avatar name="5" bg="red.500" size="xs" ml={24} />
          </NavItem>
        )
      )}

      <NavItemAction color="white" onClick={handleSignOut} mt={40}>
        <FiLogOut />
        <Text ml={2}>Sign out</Text>
      </NavItemAction>
      <NavItemAction color="white" mt={52} to="/projects">
        <Text ml={2}>View all projects</Text>
      </NavItemAction>
    </Box>
  );
};

const NavItem = ({ icon, to, children, ...rest }) => {
  return (
    <Link
      href={to}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "white",
          color: "#536593",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "blue",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const NavItemAction = ({ icon, to, children, ...rest }) => {
  return (
    <Link
      href={to}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "white",
          color: "#536593",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "blue",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const projectData = useSelector((state) => state.project);
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="10"
      alignItems="center"
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        {projectData?.project?.title}
      </Text>
    </Flex>
  );
};
