import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainStack from "./MainStack";
import CustomDrawerContent from "../components/DrawerComponent";
import Help from "../screens/Help";
import Profile from "../screens/Profile/Profile";


const DrawerNavigator = createDrawerNavigator();

const DrawerNav = () => {
    return (
        <DrawerNavigator.Navigator 
        initialRouteName="Home" 
        drawerContent={(props)=><CustomDrawerContent {...props} />}
        screenOptions={{
            headerShown: false
        }}>
            <DrawerNavigator.Screen name="Home" component={MainStack} />
            <DrawerNavigator.Screen name="Order History" component={MainStack} />
            <DrawerNavigator.Screen name="My Account" component={Profile} />
            <DrawerNavigator.Screen name="Payment Methods" component={MainStack} />
            <DrawerNavigator.Screen name="Help" component={Help} />
        </DrawerNavigator.Navigator>
    );
};

export default DrawerNav;

