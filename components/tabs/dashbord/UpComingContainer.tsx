import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import { router, Link } from "expo-router";
import { ServicesData } from "../../../data";
import DashBoardSection from "@comp/container/DashBoardSection";
import Avatars from "@comp/basic/Avatars";
import { FontAwesome, Fontisto, MaterialIcons,Ionicons } from "@expo/vector-icons";
import Reacf, { useState, useEffect } from "react";
interface Props {
    // Define your props here
}

const UpComingContainer = (props: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    const [isConfirm, setisConfirm] = useState(null);
    return (
        <DashBoardSection
            title={"UpComing Shedule"}
            linkTitle={"See All"}
            linkPath={"/"}
            style={style.serviceInner}
        >
            <Pressable style={style.container}>
                <View style={style.header}>
                    <Text style={style.title}>Appointment</Text>
                    <Pressable>
                        <FontAwesome name="edit" size={24} color={colors.white} />
                    </Pressable>
                </View>
                <View style={style.body}>
                    <View style={style.bodyInner}>
                        <Fontisto name="date" size={24} color={colors.white} />
                        <Text style={style.date}>1 Mars,2024</Text>
                    </View>
                    <View style={style.bodyInner}>
                        <Ionicons name="time" size={24} color={colors.white} />
                        <Text style={style.date}>08:00 AM - 08:30 AM</Text>
                    </View>
                </View>
                <Pressable style={style.user}>
                    <View style={style.userProfile}>
                        <Avatars letter={"J"} r={size.s3} s={size.s100*0.58}/>
                        <View style={style.userInfo}>
                            <Text style={style.userName}>Jean Doe</Text>
                            <Text style={style.appointementType}>Rdv</Text>
                        </View>
                    </View>
                    {isConfirm === true ? (
                        <Ionicons
                            name="checkmark-done"
                            size={24}
                            color="black"
                        />
                    ) : isConfirm === false ? (
                        <Ionicons name="checkmark" size={24} color="black" />
                    ) : (
                        <MaterialIcons
                            name="radio-button-unchecked"
                            size={24}
                            color="black"
                        />
                    )}
                </Pressable>
            </Pressable>
        </DashBoardSection>
    );
};

export default UpComingContainer;

const styles = ({ colors, size }) => StyleSheet.create({
  container:{
    width:size.width*0.95,
    height:size.s100*2,
    backgroundColor:colors.blue,
    alignSelf:'center',
    borderRadius:size.s5,
    padding:size.s5,
    gap:size.s4
  },
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  title:{
    fontFamily:'inter',
    fontSize:size.s4*1.1,
    color:colors.white,
    fontWeight:'700'
  },
  body:{
    gap:size.s4
  },
  bodyInner:{
    flexDirection:'row',
    alignItems:'center',
    gap:size.s2
  },
  date:{
    fontFamily:'inter',
    fontSize:size.s4*0.9,
    color:colors.white,
    fontWeight:'bold'
  },
  user:{
    width:'100%',
    height:size.s100*0.8,
    backgroundColor:colors.bg.bg2,
    borderRadius:size.s3,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:size.s4,
    marginTop:size.s2,
    elevation:1
  },
  userProfile:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    gap:size.s2
  },
  userInfo:{
    gap:size.s1
  },
  userName:{
    fontFamily:'inter',
    fontSize:size.s5,
  fontWeight:'700',
  color:colors.blue
  },
  appointementType:{
    fontFamily:'inter',
    fontSize:size.s4,
  fontWeight:'500',
  color:colors.blue
  }
  
});
