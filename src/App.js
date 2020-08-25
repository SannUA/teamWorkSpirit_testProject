import React, { useEffect } from 'react';
import { useDisclosure } from "react-use-disclosure";
import { connect, useDispatch, useSelector } from 'react-redux';
import './App.css';
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
import { fetchUsers, addUser, addUserInfo, cleanUserInfo, cleanCurrentUserInfo } from './redux/actions';


function App(props) {

  const dispatch = useDispatch()
  const fetchedUsers = useSelector(state => state.users)
  const toast = useToast();
  const { isOpen, open, close } = useDisclosure();

  const addingNewUserHandler = () => {
    if(!props.addingUser.email || !props.addingUser.name || !props.addingUser.role|| !props.addingUser.picture) {
      toast({
        title: "Uncorrect adding",
        description: "Fill in all fields for correct adding the new user, please",
        status: "warning",
        duration: 9000,
        isClosable: true,
      })
  } else {

    dispatch(addUser(props.addingUser))
      toast({
        title: "User was added",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
      setTimeout(() => {
        document.location.pathname ='/'
      }, 1500)
  }}

  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(cleanCurrentUserInfo())
  }, [])
console.log(props)
  return (

      <div className="App">
        <div className='usersList'>
        {
       fetchedUsers.map(user => (
          <div className='eachUserCard' key={user.id}>
            <Link to={`/user/${user.id}`}><h3>{user.name}</h3></Link>
             <h4>{user.email}</h4>
             <h5>{user.role}</h5>  
             <Link to={`/user/${user.id}`}><Avatar name={user.name} src={user.picture} size='2xl'/></Link>
          </div>))
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
            dispatch(cleanUserInfo())
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
              <Input placeholder='E-mail' onChange={(e) => {
                dispatch(addUserInfo('email', e.target.value))
              }}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Name</FormLabel>
              <Input placeholder='Name' onChange={(e) => {
                dispatch(addUserInfo('name', e.target.value))
              }}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Role</FormLabel>
              <Input placeholder='Role' onChange={(e) => {
                dispatch(addUserInfo('role', e.target.value))
              }}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Picture</FormLabel>
              <Input placeholder="Picture's link" onChange={(e) => {
                dispatch(addUserInfo('picture', e.target.value))
              }}/>
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

const mapStateToProps = state => {
  console.log(state)
  return {
    addingUser: state.addingUserInfo
  }
}
export default connect(mapStateToProps)(App);
