import { Box, Heading, HStack, IconButton, Input, Icon, Stack, Text, View, VStack, } from 'native-base';
import React, { Component } from 'react';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import LGButton from '../../components/LGButton';
import theme from '../../configs/Theme';
import { UserMiddleware } from '../../redux/Middlewares/UserMiddleware';
import { connect } from 'react-redux';

class AddCard extends Component {

    state={
        number:"",
        expiry:"",
        cvc:""
    }

    AddCard=()=>{
        let {
            number,
            expiry,
            cvc
        }=this.state;
        if(!number && !expiry && !cvc)
        {
            return;
        }
        this.props.AddCard({
            number,
            expiry,
            cvc,
            onSuccess:()=>{
                this.props.navigation.goBack()
            }
        });
    }

    render() {
        return (
            <View flex={1} backgroundColor="#fff" _dark={{ backgroundColor: "black" }}>
                <Box position="absolute" top={"5%"} left="3%">
                    <IconButton
                        onPress={() => this.props.navigation.goBack()}
                        icon={<MaterialIcons name="chevron-left" size={25} color={theme.config.initialColorMode=="dark"?"#fff":"#000"} />} />
                </Box>

                <View flex={1} justifyContent="center" p="5%">
                    <Stack>
                        <Heading bold fontSize={35} color="black" _dark={{ color: "#fff" }}>
                            Add Payment Method
                        </Heading>
                        <Text color="coolGray.400" fontSize={17}>Please fill all fields to continue</Text>
                    </Stack>
                    <VStack w="100%" space="md" marginY={50}>
                        <Input InputLeftElement={<Icon as={Ionicons} name='person' size={5} color="#bbb" ml={2} />} placeholder="Card number" 
                        onChangeText={(number)=>this.setState({number})}
                        />
                        <HStack space={3} w="100%">
                            <Input w="48%" InputLeftElement={<Icon as={Ionicons} name='person' size={5} color="#bbb" ml={2} />} placeholder="Expiry" 
                            maxLength={7}
                            onChangeText={(expiry)=>{
                                if(expiry.length==2)
                                {
                                    this.setState({expiry:expiry+"/"})
                                }
                                else
                                {
                                    this.setState({expiry})
                                }
                            }}
                            />
                            <Input w="48%" InputLeftElement={<Icon as={Ionicons} name='person' size={5} color="#bbb" ml={2} />} placeholder="CVC/CVV" 
                            onChangeText={(cvc)=>this.setState({cvc})}
                            />
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


const mapStateToProps = state => ({
    loading: state.GeneralReducer.loading,
})

const mapDispatchToProps = dispatch => ({
    AddCard: data => dispatch(UserMiddleware.AddMethod(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);
