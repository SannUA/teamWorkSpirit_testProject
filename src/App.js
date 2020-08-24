import React, { useEffect, useState } from 'react';
import { useDisclosure } from "react-use-disclosure";
import './App.css';
import api from './api';
import { Link } from 'react-router-dom';
import { 
         Avatar, 
         Button,
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
         useToast
        } from "@chakra-ui/core";


function App() {

  const [users, setUsers] = useState([]);
  const [addingUser, setAddingUser] = useState({})
  const toast = useToast();
  const { isOpen, open, close } = useDisclosure();

  const addingNewUserHandler = () => {
    if(!addingUser.email || !addingUser.name || !addingUser.role || !addingUser.picture) {
      toast({
        title: "Uncorrect adding",
        description: "Fill in all fields for correct adding the new user, please",
        status: "warning",
        duration: 9000,
        isClosable: true,
      })
  } else {
    api.post("/users", {
      email: addingUser.email,
      name: addingUser.name,
      role: addingUser.role,
      picture: addingUser.picture
    }).then(() => {
      toast({
        title: "User was added",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
      setTimeout(() => {
        document.location.pathname ='/'
      }, 500)
    })
  } }
  useEffect(() => {
    api.get("/users").then((res) => {
      setUsers(res.data)
    })
  }, [])
  console.log(addingUser)
  return (

      <div className="App">
        <div className='usersList'>
        {
       users.map(user => (
          <div className='eachUserCard' key={user.id}>
            <Link to={`/user/${user.id}`}><h3>{user.name}</h3></Link>
             <h4>{user.email}</h4>
             <h5>{user.role}</h5>  
             <Link to={`/user/${user.id}`}><Avatar name={user.name} src={user.picture} size='2xl'/></Link>
          </div>
        )
       )
     }
        </div>
        <Button
          size="md"
          height="48px"
          width="200px"
          border="2px"
          borderColor="green.500"
          marginBottom='10%'
          onClick={() => {
            setAddingUser({})
            setTimeout(open)
          }}>Add more User</Button>
           
           
    <Modal
        isOpen={isOpen}
        onClose={close}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add User's info here, please</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
           
            <FormControl >
              <FormLabel>E-mail</FormLabel>
              <Input placeholder='E-mail' onChange={(e) => {setAddingUser({
                ...addingUser,
                email: e.target.value
              })}}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Name</FormLabel>
              <Input placeholder='Name' onChange={(e) => {setAddingUser({
                ...addingUser,
                name: e.target.value
              })}}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Role</FormLabel>
              <Input placeholder='Role' onChange={(e) => {setAddingUser({
                ...addingUser,
                role: e.target.value
              })}}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Picture</FormLabel>
              <Input placeholder="Picture's link" onChange={(e) => {setAddingUser({
                ...addingUser,
                picture: e.target.value
              })}}/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variantColor="blue" mr={3} onClick={addingNewUserHandler}>
              Save
            </Button>
            <Button onClick={close}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>

    
  );
}

export default App;
