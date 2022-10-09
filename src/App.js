import React, { useEffect } from 'react';
import { useDisclosure } from "react-use-disclosure";
import { connect, useDispatch, useSelector } from 'react-redux';
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
  Spinner,
  Alert,
  AlertIcon,
  Box
} from "@chakra-ui/core";
import { fetchUsers, addUserInfo, cleanUserInfo, cleanCurrentUserInfo, createUser, wasAdded } from './redux/actions';
import './App.css';


function App(props) {

  const dispatch = useDispatch()
  const fetchedUsers = useSelector(state => state.users)
  const { isOpen, open, close } = useDisclosure();


  const addingNewUserHandler = () => {
    dispatch(createUser(props.addingUser));
    
  }
  if (props.newUserWasAdded) {
    setTimeout(() => {
      close()
    }, 500)
    dispatch(wasAdded())
  }

let content = null
if (props.createUserFail.status) {
  content = <Box bg="tomato" w="50%" p={4} color="white">
              Uncorrect adding!<br/>
              {props.createUserFail.message}
            </Box>
}

  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(cleanCurrentUserInfo())
  }, [dispatch])


if (props.loading) {
    return (
      <div className="App">
          <Spinner 
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl" />
      </div>)
      } else if (props.fetchError) {
        return (
          <div className="App">
            <Alert status="error">
              <AlertIcon />There was an error processing your request. Try again later, please.
            </Alert>
          </div>)
      } 


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
            open()
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
            {content}
            <Button variantColor="blue" mr={3} onClick={addingNewUserHandler}>
              Save
            </Button>
            <Button onClick={close}>Cancellllll</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>

    
  );
}

const mapStateToProps = state => {
  return {
    addingUser: state.addingUserInfo,
    loading: state.loading,
    fetchError: state.fetchError,
    createUserFail: state.fetchAddNewUserError,
    newUserWasAdded: state.newUserWasAdded
  }
}
export default connect(mapStateToProps)(App);
