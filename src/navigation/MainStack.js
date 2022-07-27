import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Auth/Login";
import Signup from "../screens/Auth/Signup";
import ForgotPass from "../screens/Auth/ForgotPass";
import Dash from "../screens/";
import Products from "../screens/Products";
import SearchFilter from "../screens/Products/SearchFilter";
import AllBrands from "../screens/BrandsAndCategories/AllBrands";
import AllCategoires from "../screens/BrandsAndCategories/AllCategories";
import ProductDetail from "../screens/Products/ProductDetail";
import PersonalDetail from "../screens/TradeIn/PersonalDetail";
import TopCategories from "../screens/BrandsAndCategories/TopCategories";
import VerifyCode from "../screens/Auth/VerifyCode";
import ResetPass from "../screens/Auth/ResetPass";


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
            <StackNavigator.Screen name="VerifyCode" component={VerifyCode} />
            <StackNavigator.Screen name="ResetPass" component={ResetPass} />
            <StackNavigator.Screen name="Login" component={Login} />
            <StackNavigator.Screen name="Signup" component={Signup} />
            <StackNavigator.Screen name="Products" component={Products} />
            <StackNavigator.Screen name="Filters" component={SearchFilter} />
            <StackNavigator.Screen name="AllBrands" component={AllBrands} />
            <StackNavigator.Screen name="AllCategories" component={AllCategoires} />
            <StackNavigator.Screen name="TopCategories" component={TopCategories} />
            <StackNavigator.Screen name="ProductDetail" component={ProductDetail} />

        </StackNavigator.Navigator>
    );
};

export default MainStack;
