import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cart from "../screens/Cart/index";
import Checkout from "../screens/Cart/Checkout";
import AddCard from "../screens/PaymentMethods/AddCard";
import Payments from "../screens/PaymentMethods";


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


        </StackNavigator.Navigator>
    );
};

export default CartStack;
