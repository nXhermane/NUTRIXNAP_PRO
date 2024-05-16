import { StyleSheet, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import { StatusBar } from "expo-status-bar";
import HeaderTabs from "@comp/tabs/HeaderTabs";
import FlotingBtn from "@comp/basic/FlotingBtn";
import Top from "@comp/tabs/dashbord/Top";
import ServiceContainer from "@comp/tabs/dashbord/ServiceContainer";
import UpComingContainer from "@comp/tabs/dashbord/UpComingContainer";
import SearchInput from "@comp/basic/SearchInput";
import SearchBtn from "@comp/tabs/SearchBtn";
import React, { useEffect, useState } from "react";
import { router, Stack, Tabs } from "expo-router";
import GeneralInfo from "@comp/tabs/dashbord/GeneralInfo";
import DashBoardSection from "@comp/container/DashBoardSection";

interface Props {
    // Define your props here
}

const index = (props: Props) => {
    const theme = useTheme();
    const style = useThemeStyles(styles);
    const { navigation } = props;
    const [searchValue, setSearchValue] = useState("");
    const [isFocus, setIsFocus] = useState(false);
    return (
        <SafeAreaView>
            <>
                <Tabs.Screen
                    options={{
                        header: () => <HeaderTabs nav={navigation} />
                    }}
                />
                <StatusBar />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        width: theme.size.width,
                        // height: theme.size.height,
                        paddingTop: theme.size.s50,
                        paddingBottom: theme.size.s50 * 1.5
                    }}
                >
                    <View style={style.container}>
                        <Top />
                        <DashBoardSection header>
                            <SearchBtn placeholder={"Rechercher..."} />
                        </DashBoardSection>
                        <ServiceContainer />
                        <UpComingContainer />
                        <GeneralInfo />
                    </View>
                </ScrollView>

                {/*<View style={style.flotBtnContainer}>
                    <FlotingBtn s={60} onPress={() => alert("oui")} />
                </View>*/}
            </>
        </SafeAreaView>
    );
};

export default index;

const styles = theme =>
    StyleSheet.create({
        flotBtnContainer: {
            position: "absolute",
            bottom: theme.size.s100 * 0.7,
            right: theme.size.s4,
            zIndex: 4000
        },
        container: {
            flex: 1,
            backgroundColor: theme.colors.bg.secondary
        }
    });
