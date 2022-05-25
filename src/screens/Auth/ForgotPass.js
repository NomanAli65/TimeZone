import { Box, Button, Center, Container, Divider, Flex, FormControl, Heading, HStack, Icon, IconButton, Image, Input, ScrollView, Stack, Text, View, WarningOutlineIcon } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { AntDesign, Fontisto } from "@expo/vector-icons";
import LGButton from '../../components/LGButton';
import { Ionicons } from "@expo/vector-icons";

class ForgotPass extends Component {
    render() {
        return (
            <View flex={1} backgroundColor="white">
                <Box position="absolute" top={"5%"} left="3%">
                    <IconButton
                        onPress={() => this.props.navigation.goBack()}
                        icon={<Ionicons name='md-close' size={25} color="#000" />}
                    />
                </Box>
                <View flex={1} justifyContent="center" p="5%">
                    <Stack>
                        <Heading bold fontSize={35} color="black">
                            Forgot Password
                        </Heading>
                        <Text color="coolGray.400" fontSize={17}>Please write your email to continue</Text>
                    </Stack>
                    <Stack w="100%" marginY={50}>
                        <FormControl isInvalid={false}>
                            <Input
                                InputLeftElement={<Icon as={Ionicons} name='mail' size={5} color="#bbb" ml={2} />}
                                placeholder="Email" />
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                Email not found
                            </FormControl.ErrorMessage>
                        </FormControl>

                    </Stack>
                    <LGButton title={"Reset Password"} />
                </View>
            </View>
        );
    }
}


export default ForgotPass;
