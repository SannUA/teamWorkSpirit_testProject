import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { useDisclosure } from "react-use-disclosure"
import api from "./api";
import { useParams } from "react-router-dom";
import { Avatar } from "@chakra-ui/core";
import { Button, ButtonGroup } from "@chakra-ui/core";
import {FaTools} from "react-icons/fa";
import {ImCross} from "react-icons/im";
import { CSSReset} from '@chakra-ui/core';
import { useToast } from "@chakra-ui/core";
import { Icon } from "@chakra-ui/core";
import {
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
} from "@chakra-ui/core";
import './User.css'

const User = () => {

  const { isOpen, open, close } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const toast = useToast();


  const {id} = useParams();
  const [userInfo, setUserInfo]  = useState(null);

  const deletingUserHandler = () => {
    api.delete(`/users/${id}`)
    .then(() => {
      toast({
        title: "User was deleted",
        status: "info",
        duration: 9000,
        isClosable: true,
      })
      setTimeout(() => {
        document.location.pathname = '/'
      }, 1000)
    })
    .catch(e => {
      console.log(`😱 Axios request failed: ${e}`)
    })
    
  }

  const formSubmitHandler = () => {
    if (!userInfo.email || !userInfo.name || !userInfo.role || !userInfo.picture) {
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
            email: userInfo.email,
            name: userInfo.name,
            role: userInfo.role,
            picture: userInfo.picture
        })
        
      } catch (e) {
        console.log(`😱 Axios request failed: ${e}`);
      }
      setTimeout(close, 500)
    }
  }

  useEffect(() => {
    api.get(`/users/${id}`).then(res => {
      setUserInfo(res.data)
    })
  }, [id])

  if (!userInfo) return (
    <div>Loading...</div>
  )
console.log(userInfo)
  return (
    <div className='userSinglePage'>
      <Link to='/'>
        <Icon name="arrow-left" size="32px" color="black" className='arrowBack'/>
      </Link>
      <h1>{userInfo.email}</h1>
      <h2>{userInfo.name}</h2>
      <h2>{userInfo.role}</h2>
      <Avatar name={userInfo.name} src={userInfo.picture} size='2xl'/>
      <div>
        <CSSReset />
      <ButtonGroup spacing={5}>
        <Button leftIcon={FaTools} 
                variantColor="yellow"  
                variant="outline" 
                onClick={() => {
                  setTimeout(open)
                }}>
        Edit
        </Button>
        <Popover>
          <PopoverTrigger>
          <Button leftIcon={ImCross} variantColor="red" variant="outline">
            Delete
          </Button>
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
              <Input ref={initialRef} value={userInfo.email} onChange={(e) => {setUserInfo({
                ...userInfo,
                email: e.target.value
              })}}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Name</FormLabel>
              <Input value={userInfo.name} onChange={(e) => {setUserInfo({
                ...userInfo,
                name: e.target.value
              })}}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Role</FormLabel>
              <Input value={userInfo.role} onChange={(e) => {setUserInfo({
                ...userInfo,
                role: e.target.value
              })}}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Picture</FormLabel>
              <Input value={userInfo.picture} onChange={(e) => {setUserInfo({
                ...userInfo,
                picture: e.target.value
              })}}/>
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

export default User;