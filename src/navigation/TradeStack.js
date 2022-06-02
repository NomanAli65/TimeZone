import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PersonalDetail from "../screens/TradeIn/PersonalDetail";
import Trade from "../screens/TradeIn/index";


const StackNavigator = createNativeStackNavigator();


const TradeStack = () => {
    return (
        <StackNavigator.Navigator
            initialRouteName="Trade"
            screenOptions={{
                headerShown: false
            }}>
            <StackNavigator.Screen name="Trade" component={Trade} />
            <StackNavigator.Screen name="PersonalDetail" component={PersonalDetail} />


        </StackNavigator.Navigator>
    );
};

export default TradeStack;
