import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Heading, Image, Text, Flex, Button, FormLabel, Input, Select } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {  useParams, Link, useNavigate } from 'react-router-dom';
import { SlideImage } from './SlideImages';
//import { PAYMENT_DATA } from '../Redux/PaymentReducer/actionType';
import { paymentData } from '../Redux/PaymentReducer/action';
import { useDispatch, useSelector } from 'react-redux';

export const Explore = () => {
  const [state, setState] = useState({
    name: '',
    mobileNo: '',
    email: '',
    gender: '',
    noOfPeople: 1,
    national:'',
    totalPrice:'',
    date:'',
    place:''
  });

  const dispatch = useDispatch()
  const data = useSelector((store)=> store.paymentReducer.userData)

  const navigate = useNavigate()

  console.log(data,"pay")
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [allDestinations, setAllDestinations] = useState([]);

  useEffect(() => {
    getData(id);
  }, [id]);



  

  const getData = async (id) => {
    try {
      let res = await axios.get(`http://localhost:8080/destinations/${id}`);
      setDestination(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const findDestinationIndexById = (id) => {
    return allDestinations.findIndex((destination) => destination.id === id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]:name=="noOfPeople"? +value : value });
  };

  const handleSubmit =(e)=>{
    e.preventDefault()
    const place = destination.name
    state.place = place
    const newData = {...state}
    newData.totalPrice = state.noOfPeople*destination.price
    
    console.log(state)
    console.log(newData)
    dispatch(paymentData(newData))
    navigate('/Payment')
  }

  
  

  const currentIndex = findDestinationIndexById(parseInt(id));

  const previousIndex = currentIndex - 1;
  const nextIndex = currentIndex + 1;

  //const previousDestination = allDestinations[previousIndex];
  //const nextDestination = allDestinations[nextIndex];

  return (
    <div style={{width:"90%", margin:"auto"}}>
      <Heading as="h1" size="2xl" textAlign="left" mt="50px"><span style={{color:"#0C246C"}}>Holiday Package</span> to</Heading>
      {destination && (
        <Box p={6} w="100%" m="auto" mb="30px" mt="50px"  borderBottom="2px" borderRadius="20px" borderColor="#1071DB">
          <Flex gap="5%">
            <Box textAlign="left" w="100%" >
              <Heading as="h1" size="4xl">
              <span style={{color:"#1071DB"}}>{destination.name}</span>
              </Heading>
              <Text mt={5} fontSize="3xl" fontWeight="500">
                {destination.description}
              </Text>
              <Text mt={5} fontSize="2xl" fontWeight="400">
                {destination.about}
              </Text>
              
            </Box>
            <Box w="100%" textAlign="left" p={6} borderTop="2px" borderRadius="20px" borderColor="#1071DB">
              <Image
                src={destination.image}
                alt="TravelWorld Team"
                maxW="500px"
                mx="auto"
                borderRadius="lg"
                boxShadow="lg"
                mb="30px"
              />
              <Text ml="40px" fontSize="xl" mb="20px">Rating : {destination.rating}⭐</Text>
              <Text ml="40px" fontSize="xl" mb="20px"><span style={{color:"#1071DB"}}>{destination.name} </span> | by TripWiz</Text>
              <Text mt={5} fontSize="xl" fontWeight="400" ml="40px" mb="20px">
              <span style={{color:"green"}}>{destination.price}/-</span> for One Person
              </Text>

              
            </Box>
          </Flex>
        </Box>
      )}

      <Box>
        <Flex gap="5%">

        {destination && <SlideImage prop={destination.placeImages} />}

         
          <Box>
          {destination && (
            <Box w="90%" m="auto" mb="50px">
              <Heading as="h3" size="3xl" mt="50px" textAlign="left">
                Explore - {destination.name}
              </Heading>
              <Text mt={20} textAlign="left" lineHeight="35px" fontSize="lg">
                {destination.famous}
              </Text>
              <Text mt={20} textAlign="left" lineHeight="35px" fontSize="lg">
                {destination.history}
              </Text>
            </Box>
          )}
          </Box>
        </Flex>
       
      </Box>

      {/* Traveler Form Details */}
      <Box  p={20}   w="100%" borderWidth="2px" borderRadius="10px" borderColor="#1071DB">
      <Text fontSize="3xl" fontWeight="bold" textAlign="left">Traveler Details  </Text>

        <form onSubmit={handleSubmit}>
          
          <Box mt="50px" >
            
            <Flex justifyContent="space-between" gap="5%">

              <Box w="100%">

              <FormLabel fontWeight="bold">Name</FormLabel>
              <Input
                //css
                display="inline"
                w="100%"
                borderColor="gray.300" // Border color
                borderWidth="1px" // Border width
                borderRadius="md" // Border radius
                boxShadow= "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"

                //css
                type="text" // Use type="tel" for card numbers
                name="name"
                placeholder="Name"
                value={state.name}
                onChange={handleChange}
              />
              </Box>
              <Box w="100%">

              <FormLabel>Mobile Number</FormLabel>
              <Input
                //css
                boxShadow= "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"

                //css
                type="number"
                name="mobileNo"
                placeholder="Mobile Number"
                value={state.mobileNo}
                onChange={handleChange}
              />
              </Box>

              <Box w="100%">

              <FormLabel>Email</FormLabel>
              <Input
                //css
                boxShadow= "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"

                //css
                type="email"
                name="email"
                placeholder="Email"
                value={state.email}
                onChange={handleChange}
              />
              </Box>

              </Flex>

          </Box>

          <Box mt="50px" w="100%">
            
            <Flex justifyContent="space-between" gap="5%">

              <Box w="100%">
                <FormLabel>Gender</FormLabel>
                  <Select placeholder='Select option' colorScheme='blue' variant='outline' border="2px" borderColor="#1071BD"
                  name="gender"
                  value={state.gender}
                  onChange={handleChange}
                  >
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    
                  </Select>
              </Box>

              <Box w="100%">
                <FormLabel>No. Of Travlers</FormLabel>
                  <Select 
                  //placeholder='Select option' 
                  colorScheme='blue' 
                  variant='outline' 
                  border="2px" 
                  borderColor="#1071BD"
                  name="noOfPeople"
                  value={state.noOfPeople}
                  onChange={handleChange}
                  >
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    
                  </Select>


              </Box>

              <Box w="40%" >
                  
                <FormLabel>Choose Date</FormLabel>
                <Input
                  //css
                  boxShadow= "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
                  //css
                  type="date" // Use type="tel" for CVC
                  name="date"
                  placeholder="Date"
                  value={state.date}
                  onChange={handleChange}
                />
              </Box>

              
              

            </Flex>

            

            <Box w="30%" mt="50px">
                  
                <FormLabel>Nationality</FormLabel>
                <Input
                  //css
                  boxShadow= "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
                  //css
                  type="tel" // Use type="tel" for CVC
                  name="national"
                  placeholder="Nationality"
                  value={state.national}
                  onChange={handleChange}
                />
              </Box>

              
            <Box textAlign="left" mt="50px">
              <Flex justifyContent="space-between">
                
             {/* <Link to={'/Payment'}> */}
               <Button width="30%"  colorScheme='blue' h={50} borderRadius="25px"  backgroundColor="#1071BD" color="white"
               type='submit'
               >
                Book Now
              </Button>

            {/* </Link> */}

            {destination &&<Text fontSize="3xl" color="green">Total : {state.noOfPeople*destination.price}</Text>}
              </Flex>

          
            </Box>
           
           

          </Box>

          

        </form>


      </Box>


      {/* Traveler Form Details */}


      <Box mb="50px" mt="50px">
        <Flex justifyContent="space-around">
          
            <Link to={`/Destinations/${+id-1}`}>
              <Button leftIcon={<ArrowBackIcon />} colorScheme='blue' borderRadius="20px" variant='outline'>
                Previous
              </Button>
            </Link>
          
            <Link to={`/Destinations/${+id+1}`}>
              <Button rightIcon={<ArrowForwardIcon />} colorScheme='blue' borderRadius="20px" variant='outline'>
                Next
              </Button>
            </Link>
            
        </Flex>
      </Box>
    </div>
  );
};
