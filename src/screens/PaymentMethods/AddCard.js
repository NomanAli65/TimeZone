import { Box, Button, Heading, HStack, IconButton, Input, Icon, Stack, Text, View, FormControl, WarningOutlineIcon, ScrollView, Image, VStack } from 'native-base';
import React, { Component } from 'react';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import LGButton from '../../components/LGButton';

class AddCard extends Component {
    render() {
        return (
            <View flex={1} backgroundColor="#fff">
                <Box position="absolute" top={"5%"} left="3%">
                    <IconButton
                        onPress={() => this.props.navigation.goBack()}
                        icon={<MaterialIcons name="chevron-left" size={25} color="#000" />} />
                </Box>

                <View flex={1} justifyContent="center" p="5%">
                    <Stack>
                        <Heading bold fontSize={35} color="black">
                            Add Payment Method
                        </Heading>
                        <Text color="coolGray.400" fontSize={17}>Please fill all fields to continue</Text>
                    </Stack>
                    <VStack w="100%" space="md" marginY={50}>
                        <Input InputLeftElement={<Icon as={Ionicons} name='person' size={5} color="#bbb" ml={2} />} placeholder="Card number" />
                        <HStack space={3} w="100%">
                            <Input w="48%" InputLeftElement={<Icon as={Ionicons} name='person' size={5} color="#bbb" ml={2} />} placeholder="Expiry" />
                            <Input w="48%" InputLeftElement={<Icon as={Ionicons} name='person' size={5} color="#bbb" ml={2} />} placeholder="CVC/CVV" />
                        </HStack>
                        <Input InputLeftElement={<Icon as={Ionicons} name='person' size={5} color="#bbb" ml={2} />} placeholder="Card holder name" />
                    </VStack>
                    <LGButton
                        title="Add" />
                </View>
            </View>
        );
    }
}


export default AddCard;
