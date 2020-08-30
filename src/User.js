import React, { useEffect } from "react";
import api from "./api";
import { Link } from 'react-router-dom'
import { useDisclosure } from "react-use-disclosure"
import { useParams } from "react-router-dom";
import { connect, useDispatch } from 'react-redux';
import {FaTools} from "react-icons/fa";
import {ImCross} from "react-icons/im";
import {
  Avatar,
  useToast,
  Icon,
  Button, 
  ButtonGroup,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  Spinner,
} from "@chakra-ui/core";
import './User.css';
import { currentUser, addUserInfo, editUserInfoInForm, deleteUser } from "./redux/actions";

const User = (props) => {

  const dispatch = useDispatch()
  const { isOpen, open, close } = useDisclosure();
  console.log(props)
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const toast = useToast();


  const {id} = useParams();

  const deletingUserHandler = () => {

    dispatch(deleteUser(id))
    // api.delete(`/users/${id}`)
    // .then(() => {
    //   toast({
    //     title: "User was deleted",
    //     status: "info",
    //     duration: 9000,
    //     isClosable: true,
    //   })
    //   setTimeout(() => {
    //     props.history.replace('/')
    //   }, 1000)
    // })
    // .catch(e => {
    //   console.log(`😱 Axios request failed: ${e}`)
    // })
    
  }

  const formSubmitHandler = () => {
    if (!props.usersEditingInfo.email || 
        !props.usersEditingInfo.name || 
        !props.usersEditingInfo.role || 
        !props.usersEditingInfo.picture) {
      toast({
        title: "Uncorrect changes",
        description: "Fill in all fields for correct changes, please",
        status: "warning",
        duration: 9000,
        isClosable: true,
      })
    } else {
      try {
        api.put(`/users/${id}`, { 
            email: props.usersEditingInfo.email,
            name: props.usersEditingInfo.name,
            role: props.usersEditingInfo.role,
            picture: props.usersEditingInfo.picture
        }).then(()=> {
         dispatch(currentUser(id))
        })
        
      } catch (e) {
        console.log(`😱 Axios request failed: ${e}`);
      }
      setTimeout(close, 500)
    }
  }

  useEffect(() => {
    dispatch(currentUser(id))
  }, [dispatch, id])

  if (!props.currentUserInfo.name) return (
    <div>
      <Spinner 
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl" />
    </div>
)
if (props.userWasDeleted) {
  props.history.replace('/')
}
  return (
    <div className='userSinglePage'>
      <Link to='/'>
        <Icon name="arrow-left" size="32px" color="black" className='arrowBack'/>
      </Link>
      <h1>{props.currentUserInfo.email}</h1>
      <h2>{props.currentUserInfo.name}</h2>
      <h2>{props.currentUserInfo.role}</h2>
      <Avatar name={props.currentUserInfo.name} src={props.currentUserInfo.picture} size='2xl'/>
      <div>
      <ButtonGroup spacing={5}>
        <Button leftIcon={FaTools} 
                variantColor="yellow"  
                variant="outline" 
                onClick={() => {
                  dispatch(editUserInfoInForm())
                  setTimeout(open)
                }}>
        Edit
        </Button>
      <Popover>
          <PopoverTrigger>
            <Button leftIcon={ImCross} variantColor="red" variant="outline">Delete</Button>
          </PopoverTrigger>
        <PopoverContent zIndex={4} className='popoverText'>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Warning!</PopoverHeader>
          <PopoverBody>Are you sure you want to delete this user? 
          It will be impossible to revoke this action.</PopoverBody>
          <Button leftIcon={ImCross} variantColor="red" variant="outline" onClick={deletingUserHandler}>
          Delete
          </Button>
        </PopoverContent>
      </Popover> 
    </ButtonGroup>
      
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={close}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add changes here, please</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
           
            <FormControl >
              <FormLabel>E-mail</FormLabel>
              <Input ref={initialRef} value={props.usersEditingInfo.email} onChange={(e) => {
                dispatch(addUserInfo('email', e.target.value))
              }}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Name</FormLabel>
              <Input value={props.usersEditingInfo.name} onChange={(e) => {
                dispatch(addUserInfo('name', e.target.value))
              }}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Role</FormLabel>
              <Input value={props.usersEditingInfo.role} onChange={(e) => {
                dispatch(addUserInfo('role', e.target.value))
              }}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Picture</FormLabel>
              <Input value={props.usersEditingInfo.picture} onChange={(e) => {
                dispatch(addUserInfo('picture', e.target.value))
              }}/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variantColor="blue" mr={3} onClick={formSubmitHandler}>
              Save
            </Button>
            <Button onClick={close}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </div>

    </div>
  )
}

const mapStateToProps = state => {
  return {
    usersEditingInfo: state.addingUserInfo,
    currentUserInfo: state.currentUser,
    userWasDeleted: state.userWasDeleted
  }
}
export default connect(mapStateToProps)(User);