import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditProfile from "../screens/Profile/EditProfile";
import ChangePass from "../screens/Profile/ChangePass";
import Account from "../screens/Profile";
import Profile from "../screens/Profile/Profile";
import Help from "../screens/Help";
import Payments from "../screens/PaymentMethods";
import AddCard from "../screens/PaymentMethods/AddCard";
import ChangePass2 from "../screens/Profile/ChangePass2";
import EditProfile2 from "../screens/Profile/EditProfile2";
import History from "../screens/Orders/History";


const StackNavigator = createNativeStackNavigator();


const AccountStack = () => {
    return (
        <StackNavigator.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <StackNavigator.Screen name="Account" component={Account} />
            <StackNavigator.Screen name="Help" component={Help} />
            <StackNavigator.Screen name="Profile" component={Profile} />
            <StackNavigator.Screen name="EditProfile" component={EditProfile2} />
            <StackNavigator.Screen name="ChangePass" component={ChangePass2} />
            <StackNavigator.Screen name="Payments" component={Payments} />
            <StackNavigator.Screen name="AddCard" component={AddCard} />
            <StackNavigator.Screen name="OrderHistory" component={History} />
        </StackNavigator.Navigator>
    );
};

export default AccountStack;
