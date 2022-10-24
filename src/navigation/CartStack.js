import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cart from "../screens/Cart/index";
import Checkout from "../screens/Cart/Checkout";
import AddCard from "../screens/PaymentMethods/AddCard";
import Payments from "../screens/PaymentMethods";
import Address from "../screens/Cart/Address";
import AllAddress from "../screens/Cart/AllAddress";


const StackNavigator = createNativeStackNavigator();


const CartStack = () => {
    return (
        <StackNavigator.Navigator
            initialRouteName="CartIndex"
            screenOptions={{
                headerShown: false
            }}>
            <StackNavigator.Screen name="CartIndex" component={Cart} />
            <StackNavigator.Screen name="Checkout" component={Checkout} />
            <StackNavigator.Screen name="Payments" component={Payments} />
            <StackNavigator.Screen name="AddCard" component={AddCard} />
            <StackNavigator.Screen name="Address" component={Address} />
            <StackNavigator.Screen name="AllAddress" component={AllAddress} />
        </StackNavigator.Navigator>
    );
};

export default CartStack;
