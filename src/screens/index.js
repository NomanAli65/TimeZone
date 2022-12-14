import { AspectRatio, Box, Button, FlatList, Heading, HStack, Icon, IconButton, Image, Pressable, ScrollView, Skeleton, Stack, Text, View, VStack } from 'native-base';
import React, { Component, useState } from 'react';
import AppBar from '../components/Appbar';
import SearchBar from '../components/SearchBar';
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
import { Dimensions, View as RNView, Image as RNImage, RefreshControl, Linking, Platform } from "react-native";
import WatchItem from '../components/WatchItem';
import { connect } from 'react-redux';
import { GeneralMiddleware } from '../redux/Middlewares/GeneralMiddleware';
import { img_url } from '../configs/APIs';
import GeneralActions from '../redux/Actions/GeneralActions';
import AuthAction from '../redux/Actions/AuthActions';
import { DeviceType, getDeviceTypeAsync } from "expo-device"
import * as Notifications from "expo-notifications";

const { width } = Dimensions.get("window");


const dummy_data = ["", "",];

class index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
      search: "",
      deviceType: "",
    };
  }

  async componentDidMount() {
    Notifications.addNotificationResponseReceivedListener(this._handleNotificationResponse);
    Notifications.getLastNotificationResponseAsync().then((val) => {
      let data = val.notification.request?.content?.data;
      if (data) {
        if (data.type == "product") {
          this.props.getProduct({
            onSuccess: (dt) => {
              if (dt)
                this.props.navigation.navigate("ProductDetail", { item: dt })
            },
            id: data.id,
          })
        }
      }
    })
    Linking.getInitialURL().then((url) => {
      if (url && url.includes("product_id")) {
        let idArr = url.split("/");
        let id = Platform.OS == "ios" ? idArr[idArr.length - 1] : idArr[idArr.length - 3];
        if (id)
          this.props.getProduct({
            onSuccess: (data) => {
              if (data)
                this.props.navigation.navigate("ProductDetail", { item: data })
            },
            id: Platform.OS == "ios" ? id : id.replace(":", ""),
          })
      }
    })
    Linking.addEventListener("url", ({ url }) => {
      if (url && url.includes("product_id")) {
        let idArr = url.split("/");
        let id = Platform.OS == "ios" ? idArr[idArr.length - 1] : idArr[idArr.length - 3];
        if (id)
          this.props.getProduct({
            onSuccess: (data) => {
              if (data)
                this.props.navigation.navigate("ProductDetail", { item: data })
            },
            id: Platform.OS == "ios" ? id : id.replace(":", ""),
          })
      }
    })
    // this.props.getTopCategories({
    //   callback: () => {
    //     this.setState({ loading: false })
    //   }
    // })

    getDeviceTypeAsync().then((value) => {
      this.setState({
        deviceType: value
      })
    })
    this.props.navigation.addListener("focus", () => {
      // this.props.getDashboard({
      //   onSuccess: () => {
      //     this.setState({ loading: false })
      //   }
      // });
      this.onRefresh();
    })
  }

  _handleNotificationResponse = (response: Notifications.NotificationResponse) => {
    let data = response.notification.request?.content?.data;
    if (data) {
      if (data.type == "product") {
        this.props.getProduct({
          onSuccess: (dt) => {
            if (dt)
              this.props.navigation.navigate("ProductDetail", { item: dt })
          },
          id: data.id,
        })
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  BackPress = () => {
    this.props.StopLoading();
    return false;
  }

  _renderItem = ({ item }) => (
    <WatchItem
      loading={this.state.loading}
      item={item}
    />
  )

  _renderItemSmall = ({ item }) => {
    // <Box p={3} position="absolute" left={0} right={0} bottom={0} backgroundColor={"rgba(0,0,0,0.5)"}>
    //           </Box>

    if (this.state.loading)
      return (
        <Box w={width * 0.45} h={width * 0.5} marginRight={3} backgroundColor="#f7f7f7" overflow={"hidden"} _dark={{ backgroundColor: "gray.800" }} rounded="lg" >
          <Skeleton flex={1} />
        </Box>
      )
    else
      return (
        <Box w={width * 0.45} h={width * 0.53} marginRight={3} backgroundColor="#f7f7f7" _dark={{ backgroundColor: "gray.800" }} overflow={"hidden"} rounded="lg">
          <Pressable
            flex={1}
            onPress={() => {
              this.props.navigation.navigate("Products", { category: item })
            }}
          >
            <VStack flex={1}>
              <Image flex={1} source={item.category_image ? { uri: img_url + item.category_image } : require("../../assets/placeholder.png")} alt="image" resizeMode='stretch' />
              <Box p={3}>
                <Heading size="md" numberOfLines={1}>
                  {item?.category_name}
                </Heading>
              </Box>
            </VStack>
          </Pressable>
        </Box>
      )
  }

  _renderItemSmallBrand = ({ item }) => {
    if (this.state.loading)
      return (
        <Box alignItems="center" marginRight={3} backgroundColor="#f7f7f7" overflow={"hidden"} rounded="lg" >
          <Stack space={4} alignItems="center">
            <Skeleton h={70} w={70} />
          </Stack>
        </Box>
      )
    else
      return (
        <Box alignItems="center" marginRight={3} backgroundColor="#f7f7f7" overflow={"hidden"} rounded="lg" p={2}>
          <Pressable
            onPress={() => {
              this.props.navigation.navigate("Products", { brand: item })
            }}
          >
            <Stack space={4} alignItems="center">
              <Image alignSelf={"center"} h={60} w={60} source={item.brand_image ? { uri: img_url + item.brand_image } : require("../../assets/placeholder.png")} alt="image" resizeMode='stretch' />
            </Stack>
          </Pressable>
        </Box>
      )
  }

  _renderBanner = ({ item }) => {
    if (this.state.loading)
      return (
        <RNView style={{ width }}>
          <Skeleton width={"100%"} height={"100%"} />
        </RNView>
      )
    else {
      if (this.state.deviceType == DeviceType.TABLET && item.banner_status == 0)
        return (
          <RNView style={{ width }}>
            <RNImage source={{ uri: img_url + item.banner_path }} style={{ width, height: 250, }} resizeMode="stretch" />
          </RNView>
        )
      else
        return (
          <RNView style={{ width }}>
            <RNImage source={{ uri: img_url + item.banner_path }} style={{ width, height: 250, }} resizeMode="stretch" />
          </RNView>
        )
    }
  }

  onRefresh = () => {
    this.setState({ loading: true })
    this.props.emptyDashboard()
    this.props.getDashboard({
      onSuccess: () => {
        this.setState({ loading: false })
      }
    });
  }

  render() {
    let brands = this.props.dashboard?.top_brands ? this.props.dashboard?.top_brands.filter((value, index, self) =>
      index == self.findIndex((t) => (t.id == value.id))
    ) : [];
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
      >
        <View flex={1}
          backgroundColor="#fff"
          _dark={{
            backgroundColor: "#000"
          }}
          paddingBottom={30}
        >
          <AppBar
            title={"TIMEZONE"}
            noCart
            noWish
            noLeftIcon
          />
          <SearchBar
            placeholder={"Search TIMEZONE"}
            onChangeText={(search) => this.setState({ search })}
            onSubmitEditing={() => {
              this.props.navigation.navigate("Products", { search: this.state.search })
              this.setState({ search: "" })
            }}
            value={this.state.search}
          />
          <Box
            width={"100%"}
            height={250}
            mb={10}
          >
            <Carousel
              autoplay
              loop
              sliderHeight={250}
              itemHeight={250}
              sliderWidth={width}
              itemWidth={width}
              snapToInterval={width}
              enableSnap={false}
              data={this.state.loading ? [{}, {}, {}, {}] : this.props.dashboard?.banners}
              extraData={this.state.loading}
              renderItem={this._renderBanner}
            />
          </Box>
          <Stack px={3} space={10}>
            <Stack space={2}>
              <HStack justifyContent={"space-between"}>
                <Heading>
                  Popular Watches
                </Heading>
                <Button
                  onPress={() => this.props.navigation.navigate("Products", { filter: ["popular"] })}
                  variant={"unstyled"} rightIcon={<Icon as={MaterialIcons} name="chevron-right" size={"sm"} mx={-2} />}>
                  View More
                </Button>
              </HStack>
              <FlatList
                horizontal
                keyExtractor={(item) => item.id}
                data={!this.state.loading ? this.props.dashboard?.popular_watches : dummy_data}
                renderItem={this._renderItem}
                ListEmptyComponent={
                  <Box ml={'32'}>
                    <Heading fontSize={"md"}>
                      No Data Found
                    </Heading>
                  </Box>
                }
              />
            </Stack>
            {
              this.state.loading ?
                <Stack space={2}>
                  <HStack justifyContent={"space-between"}>
                    <Heading>
                      Brands
                    </Heading>
                    <Button
                      onPress={() => this.props.navigation.navigate("AllBrands")}
                      variant={"unstyled"} rightIcon={<Icon as={MaterialIcons} name="chevron-right" size={"sm"} mx={-2} />}>
                      All Brands
                    </Button>
                  </HStack>
                  <FlatList
                    horizontal
                    keyExtractor={(item) => item.id}
                    data={dummy_data}
                    renderItem={this._renderItemSmallBrand}
                    ListEmptyComponent={
                      <Box ml={'32'}>
                        <Heading fontSize={"md"}>
                          No Data Found
                        </Heading>
                      </Box>
                    }
                  />
                </Stack>
                :
                <Stack space={2}>
                  <HStack justifyContent={"space-between"}>
                    <Heading>
                      Brands
                    </Heading>
                    <Button
                      onPress={() => this.props.navigation.navigate("AllBrands")}
                      variant={"unstyled"} rightIcon={<Icon as={MaterialIcons} name="chevron-right" size={"sm"} mx={-2} />}>
                      All Brands
                    </Button>
                  </HStack>
                  <FlatList
                    key={"brandlist"}
                    horizontal
                    keyExtractor={(item, index) => index + ""}
                    data={brands}
                    renderItem={this._renderItemSmallBrand}
                    ListEmptyComponent={
                      <Box ml={'32'}>
                        <Heading fontSize={"md"}>
                          No Data Found
                        </Heading>
                      </Box>
                    }
                  />
                </Stack>
            }

            <Stack space={2}>
              <HStack justifyContent={"space-between"}>
                <Heading>
                  Featured Watches
                </Heading>
                <Button
                  onPress={() => this.props.navigation.navigate("Products", { filter: ["featured"] })}
                  variant={"unstyled"} rightIcon={<Icon as={MaterialIcons} name="chevron-right" size={"sm"} mx={-2} />}>
                  View More
                </Button>
              </HStack>
              <FlatList
                horizontal
                keyExtractor={(item) => item.id}
                data={!this.state.loading ? this.props.dashboard?.featured_watches : dummy_data}
                renderItem={this._renderItem}
                ListEmptyComponent={
                  <Box ml={'32'}>
                    <Heading fontSize={"md"}>
                      No Data Found
                    </Heading>
                  </Box>
                }
              />
            </Stack>
            <Stack space={2}>
              <HStack justifyContent={"space-between"}>
                <Heading>
                  Categories
                </Heading>
                {/* <Button
                  onPress={() => this.props.navigation.navigate("TopCategories")}
                  variant={"unstyled"} rightIcon={<Icon as={MaterialIcons} name="chevron-right" size={"sm"} mx={-2} />}>
                  View more
                </Button> */}
              </HStack>
              <FlatList
                numColumns={2}
                keyExtractor={(item) => item.id}
                data={!this.state.loading ? this.props.dashboard?.top_categories : dummy_data}
                renderItem={this._renderItemSmall}
                ListEmptyComponent={
                  <Box ml={'32'}>
                    <Heading fontSize={"md"}>
                      No Data Found
                    </Heading>
                  </Box>
                }
              />
            </Stack>
            <Stack space={2}>
              <HStack justifyContent={"space-between"}>
                <Heading>
                  Latest Watches
                </Heading>
                <Button
                  onPress={() => this.props.navigation.navigate("Products")}
                  variant={"unstyled"} rightIcon={<Icon as={MaterialIcons} name="chevron-right" size={"sm"} mx={-2} />}>
                  View More
                </Button>
              </HStack>
              <FlatList
                horizontal
                keyExtractor={(item) => item.id}
                data={!this.state.loading ? this.props.dashboard?.latest_watches : dummy_data}
                renderItem={this._renderItem}
                ListEmptyComponent={
                  <Box ml={'32'}>
                    <Heading fontSize={"md"}>
                      No Data Found
                    </Heading>
                  </Box>
                }
              />
            </Stack>
          </Stack>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.GeneralReducer.loading,
  top_categories: state.GeneralReducer.top_categories,
  dashboard: state.GeneralReducer.dashboardData,
  user: state.Auth.user
})

const mapDispatchToProps = dispatch => ({
  getTopCategories: data => dispatch(GeneralMiddleware.getTopCategories(data)),
  getDashboard: data => dispatch(GeneralMiddleware.getDashboardData(data)),
  emptyDashboard: () => dispatch(GeneralActions.SetDashboardData(undefined)),
  StopLoading: () => dispatch(GeneralActions.HideLoading()),
  getProduct: (data) => dispatch(GeneralMiddleware.getProduct(data)),
  Login: (data) => dispatch(AuthAction.Login(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
