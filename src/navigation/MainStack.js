import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Auth/Login";
import Signup from "../screens/Auth/Signup";
import ForgotPass from "../screens/Auth/ForgotPass";
import Dash from "../screens/";
import Products from "../screens/Products";
import SearchFilter from "../screens/Products/SearchFilter";
import EditProfile from "../screens/Profile/EditProfile";
import ChangePass from "../screens/Profile/ChangePass";
import AllBrands from "../screens/BrandsAndCategories/AllBrands";
import AllCategoires from "../screens/BrandsAndCategories/AllCategories";
import ProductDetail from "../screens/Products/ProductDetail";


const StackNavigator = createNativeStackNavigator();


const MainStack = () => {
    return (
        <StackNavigator.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
                headerShown: false
            }}>
            <StackNavigator.Screen name="Dashboard" component={Dash} />
            <StackNavigator.Screen name="ForgotPass" component={ForgotPass} />
            <StackNavigator.Screen name="Login" component={Login} />
            <StackNavigator.Screen name="Signup" component={Signup} />
            <StackNavigator.Screen name="Products" component={Products} />
            <StackNavigator.Screen name="Filters" component={SearchFilter} />
            <StackNavigator.Screen name="AllBrands" component={AllBrands} />
            <StackNavigator.Screen name="AllCategories" component={AllCategoires} />
            <StackNavigator.Screen name="ProductDetail" component={ProductDetail} />

        </StackNavigator.Navigator>
    );
};

export default MainStack;
