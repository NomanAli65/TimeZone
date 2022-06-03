import { Box, Heading, IconButton, Stack, Text, TextArea, useColorModeValue, View, } from 'native-base';
import React, { Component } from 'react';
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import LGButton from '../components/LGButton';
import { connect } from 'react-redux';
import AppBar from '../components/Appbar';
import theme from '../configs/Theme';

class Help extends Component {
    render() {
        return (
            <View flex={1} backgroundColor="white" _dark={{backgroundColor:"black"}}>
                <Box position="absolute" top={"5%"} left="3%">
                    <IconButton
                        onPress={() => this.props.navigation.goBack()}
                        icon={<MaterialIcons name='chevron-left' size={25} color={theme.config.initialColorMode=="dark"?"#fff":"#000"} />}
                    />
                </Box>
                {/* <AppBar
                title={"Help"}
                noCart
                noWish
                back
                /> */}
                <View flex={1} justifyContent="center" p="5%">
                    <Stack>
                        <Heading bold fontSize={35} color="black" _dark={{color:"white"}}>
                            Help
                        </Heading>
                        <Text color="coolGray.400" fontSize={17}>Please fill required fields to continue</Text>
                    </Stack>
                    <Stack w="100%" marginY={50}>
                        <TextArea
                        placeholder='Tell us how can we help you...'
                        />
                    </Stack>
                    <LGButton title={"Submit"} onPress={() => {
                        this.props.navigation.navigate("Dashboard")
                    }} />
                </View>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}


export default connect(null, mapDispatchToProps)(Help);

