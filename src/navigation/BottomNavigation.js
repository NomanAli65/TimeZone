import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainStack from "./MainStack";
import Help from "../screens/Help";
import Profile from "../screens/Profile/Profile";
import Wishlist from "../screens/Wishlist";
import AccountStack from "./AccountStack";
import { Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import theme from "../configs/Theme";
import Cart from "../screens/Cart/index";


const BottomNavigator = createBottomTabNavigator();

const BottomNav = () => {
    return (
        <BottomNavigator.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor:theme.colors.primary[100]
            }}>
            <BottomNavigator.Screen name="Home" component={MainStack}
                options={{
                    tabBarIcon: ({ size, color, focused }) => (
                        <Icon size={size} color={color} as={Ionicons} name={focused ? "home" : "home-outline"} />
                    )
                }}
            />
            <BottomNavigator.Screen name="Wishlist" component={Wishlist}
                options={{
                    tabBarIcon: ({ size, color, focused }) => (
                        <Icon size={size} color={color} as={Ionicons} name={focused ? "heart" : "heart-outline"} />
                    )
                }} />
            <BottomNavigator.Screen name="Cart" component={Cart}
                options={{
                    tabBarIcon: ({ size, color, focused }) => (
                        <Icon size={size} color={color} as={Ionicons} name={focused ? "cart" : "cart-outline"} />
                    )
                }} />
            <BottomNavigator.Screen name="More" component={AccountStack}
                options={{
                    tabBarIcon: ({ size, color, focused }) => (
                        <Icon size={size} color={color} as={Ionicons} name={focused ? "menu" : "menu-outline"} />
                    )
                }} />
        </BottomNavigator.Navigator>
    );
};

export default BottomNav;

