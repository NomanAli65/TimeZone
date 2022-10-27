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
import Cart from "../screens/Cart";
import Checkout from "../screens/Cart/Checkout";
import PaymentMethods from "../screens/PaymentMethods";
import AddCard from "../screens/PaymentMethods/AddCard";
import Address from "../screens/Cart/Address";
import AllAddress from "../screens/Cart/AllAddress";
import ContactUs from "../screens/ContactUs";
import VerifyPhone from "../screens/Auth/VerifyPhone";


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
            <StackNavigator.Screen name="VerifyPhone" component={VerifyPhone} />
            <StackNavigator.Screen name="Login" component={Login} />
            <StackNavigator.Screen name="Signup" component={Signup} />
            <StackNavigator.Screen name="Products" component={Products} />
            <StackNavigator.Screen name="Filters" component={SearchFilter} />
            <StackNavigator.Screen name="AllBrands" component={AllBrands} />
            <StackNavigator.Screen name="AllCategories" component={AllCategoires} />
            <StackNavigator.Screen name="TopCategories" component={TopCategories} />
            <StackNavigator.Screen name="ProductDetail" component={ProductDetail} />
            <StackNavigator.Screen name="CartIndex" component={Cart} />
            <StackNavigator.Screen name="Checkout" component={Checkout} />
            <StackNavigator.Screen name="Payments" component={PaymentMethods} />
            <StackNavigator.Screen name="AddCard" component={AddCard} />
            <StackNavigator.Screen name="AllAddress" component={AllAddress} />
            <StackNavigator.Screen name="Address" component={Address} />
            <StackNavigator.Screen name="ContactUs" component={ContactUs} />

        </StackNavigator.Navigator>
    );
};

export default MainStack;
