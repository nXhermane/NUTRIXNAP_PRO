import { StyleSheet, Text, View, ScrollView } from "react-native";
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
import React, { iseEffect, useState } from "react";
import { router } from "expo-router";
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
                <StatusBar />
                <ScrollView
                    //stickyHeaderIndices={[0]}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingTop: theme.size.s50,
                         width: theme.size.width,
                        height: theme.size.height
                    }}
                >
                    <View style={style.container}>
                        <Top
                            st={{
                                paddingTop: theme.size.s5
                            }}
                        />
                        <SearchInput
                            w={theme.size.width * 0.85}
                            h={theme.size.s50}
                            v={searchValue}
                            p={"Search..."}
                            onChange={v => setSearchValue(v)}
                            onFocus={() => {
                                setIsFocus(true);
                                router.navigate("search");
                            }}
                            onBlur={() => {
                                setIsFocus(false);
                            }}
                            isFocus={isFocus}
                            disableClearIcon={searchValue !== ""}
                            onClear={() => {
                                setSearchValue("");
                            }}
                            st={{
                                alignSelf: "center",
                                marginTop: theme.size.s8
                            }}
                            pC={theme.colors.gray}
                        />
                        <ServiceContainer />
                        <UpComingContainer />
                    </View>
                </ScrollView>
                <HeaderTabs nav={navigation} />
                <View style={style.flotBtnContainer}>
                    <FlotingBtn s={60} onPress={() => alert("oui")} />
                </View>
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
            flex: 1
        }
    });
