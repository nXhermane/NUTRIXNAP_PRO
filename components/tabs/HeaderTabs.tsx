import { StyleSheet, Text, View, Pressable } from "react-native";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import Avatars from "@comp/basic/Avatars";
import Logo from "@comp/basic/Logo"
import { Entypo, Ionicons,Feather } from "@expo/vector-icons";
import {useNavigation,router} from 'expo-router'
interface Props {
    // Define your props here
}

const HeaderTabs = ({nav}: Props) => {
    const theme = useTheme();
    const style = useThemeStyles(styles);
    const navigation=useNavigation()
    return (
        <View style={style.headerContainer}>
            <View style={style.headerRight}>
                <Pressable style={style.icon}onPress={()=>{
                  navigation.openDrawer()
                }}>
                    {({ pressed }) => (
                      <Feather  style={{
                        transform:[{rotateZ:'90deg'}]
                      }}name="bar-chart-2" size={theme.size.s7}
                        color={pressed?theme.colors.blue:theme.colors.b} />
                    )}
                </Pressable>
            </View>
            <View style={style.headerCenter}>
            
            <Logo s={theme.size.s6} />
            <Text style={style.logoText}>nutriXnap</Text>
            </View>
            
            <View style={style.headerLeft}>
               { /*<Pressable style={style.icon}>
                    {({ pressed }) => (
                        <Ionicons
                            name="search"
                            size={theme.size.s5}
                            color={pressed?theme.colors.blue:theme.colors.b}
                        />
                    )}
                </Pressable>

                <Pressable style={({pressed})=>style.avatars(pressed)}>
                    {({ pressed }) => (
                        <Avatars
                            s={theme.size.s10}
                            image={{
                                uri: "https://lh3.googleusercontent.com/a/ACg8ocL10GHjCILxoFxiWqckBVP5kUiUJ9jq7I0W20vUMk6r=s96-c"
                            }}
                        />
                    )}
                </Pressable>*/}
                                <Pressable style={style.icon}
                                onPress={()=>router.navigate('(drawer)/notification')}>
                    {({ pressed }) => (
                        <Ionicons
                            name="notifications-sharp"
                            size={theme.size.s5}
                            color={pressed?theme.colors.blue:theme.colors.b}
                        />
                    )}
                </Pressable>
            </View>
        </View>
    );
};

export default HeaderTabs;

const styles = theme =>
    StyleSheet.create({
        headerContainer: {
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            height: theme.size.s100,
            backgroundColor: theme.colors.bg.bg2+'98',
            paddingTop: theme.size.s50,
            paddingHorizontal: theme.size.s3,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        },
        headerRight: {},
        headerLeft: {
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            
        },
        avatars:(pressed)=>({
          borderRadius:500,
          borderWidth:theme.size.s1/3,
          borderColor:pressed?theme.colors.tangerine:'transparent',
          padding:theme.size.s1/3
        }),
        pressable:{
          width:theme.size.s50,
          height:theme.size.s50,
          backgroundColor:theme.colors.bg.bg2,
          borderRadius:500,
          borderColor:theme.colors.gray,
          borderWidth:theme.size.s1/4,
          justifyContent:'center',
          alignItems:'center'
        },
        logoText:{
          fontFamily:'inter',
          fontSize:theme.size.s5,
          color:theme.colors.text.primary,
          textTransform:'uppercase',
          fontWeight:'bold'
        },
        headerCenter:{
          justifyContent:'flex-start',
          alignItems:'center',
          flexDirection:'row',
          
        }
    });
