import { Box, Button, Heading, HStack, IconButton, Input, Icon, Stack, Text, View, FormControl, WarningOutlineIcon, ScrollView, Image } from 'native-base';
import React, { Component } from 'react';
import { Ionicons } from "@expo/vector-icons";
import LGButton from '../../components/LGButton';
import { ImageBackground } from 'react-native';
import theme from '../../configs/Theme';

class Signup extends Component {
    render() {
        return (
            // <ImageBackground style={{flex:1,backgroundColor:"#fff"}} source={require("../../../assets/watchd.png")} imageStyle={{opacity:0.2,transform:[{scale:0.6}],resizeMode:"contain"}}>
            <View flex={1} backgroundColor="#fff" _dark={{backgroundColor:"black"}}>
                {/* <Image 
                left={"-50%"}
                top={"10%"}
                position={"absolute"} 
                opacity={0.1}
                source={require("../../../assets/watchd.png")} /> */}
                {/* <Image
                    right={"-15%"}
                    top={"-10%"}
                    position={"absolute"}
                    opacity={0.1}
                    w={"40%"}
                    h={"40%"}
                    resizeMode="contain"
                    tintColor={"#fff"}
                    source={require("../../../assets/watchd.png")} /> */}
                <Box position="absolute" top={"5%"} left="3%">
                    <IconButton
                        onPress={() => this.props.navigation.goBack()}
                        icon={<Ionicons name='md-close' size={25} color={theme.config.initialColorMode=="dark"?"#fff":"#000"} />} />
                </Box>
                {/* <ScrollView flex={1}> */}
                <View flex={1} justifyContent="center" p="5%">
                    <Stack>
                        <Heading bold fontSize={35} color="black" _dark={{color:"#fff"}}>
                            Signup
                        </Heading>
                        <Text color="coolGray.400" fontSize={17}>Please Signup to continue</Text>
                    </Stack>
                    <Stack w="100%" space="md" marginY={50}>
                        <Input InputLeftElement={<Icon as={Ionicons} name='person' size={5} color="#bbb" ml={2} />} placeholder="First Name" />
                        <Input InputLeftElement={<Icon as={Ionicons} name='person' size={5} color="#bbb" ml={2} />} placeholder="Last Name" />
                        <FormControl isInvalid={false}>
                            <Input InputLeftElement={<Icon as={Ionicons} name='mail' size={5} color="#bbb" ml={2} />} placeholder="Email" />
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                Email already taken
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={false}>
                            <Input
                                secureTextEntry
                                InputLeftElement={<Icon as={Ionicons} name='lock-closed' size={5} color="#bbb" ml={2} />}
                                InputRightElement={<Icon as={Ionicons} name='eye' size={5} color="#bbb" mr={2} />}
                                placeholder="Password"
                                marginBottom={4} />
                            <Input
                                secureTextEntry
                                InputLeftElement={<Icon as={Ionicons} name='lock-closed' size={5} color="#bbb" ml={2} />}
                                InputRightElement={<Icon as={Ionicons} name='eye' size={5} color="#bbb" mr={2} />}
                                placeholder="Confirm Password" />
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                Password not match
                            </FormControl.ErrorMessage>
                        </FormControl>
                    </Stack>
                    <LGButton
                        title="SIGNUP" />
                </View>
                {/* </ScrollView> */}
                <HStack alignItems="center" justifyContent="center">
                    <Text>
                        Already have an account ?
                    </Text>
                    <Button variant="ghost" _text={{
                        fontSize: "lg"
                    }}>
                        Login
                    </Button>
                </HStack>
            </View>
            //  </ImageBackground>
        );
    }
}


export default Signup;
