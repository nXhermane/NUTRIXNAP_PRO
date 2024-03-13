import { StyleSheet, Text, View, ScrollView } from "react-native";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import React, { useState, useReducer } from "react";
import {
    Ionicons,
    MaterialCommunityIcons,
    Foundation
} from "@expo/vector-icons";
import ToggleBtn from "@comp/basic/ToggleBtn";

export type IntitialStateType = {
    active: boolean;
    nonActive: boolean;
    newPatient: boolean;
    thisWeek: boolean;
    thisMonth: boolean;
    man: boolean;
    woman: boolean;
};
export const searchFilterInitialState: IntitialStateType = {
    active: false,
    nonActive: false,
    newPatient: false,
    thisWeek: false,
    thisMonth: false,
    man: false,
    woman: false
};
export type ActionType = {
    type:
        | "active"
        | "non-active"
        | "new-patient"
        | "thisweek"
        | "thismonth"
        | "man"
        | "woman";
    payload: boolean;
};
export const searchFilterReducer = (
    state: IntitialStateType,
    action: ActionType
) => {
    switch (action.type) {
        case "active":
            return { ...state, active: action.payload };
        case "non-active":
            return { ...state, nonActive: action.payload };
        case "new-patient":
            return { ...state, newPatient: action.payload };
        case "thisweek":
            return { ...state, thisWeek: action.payload };
        case "thismonth":
            return { ...state, thisMonth: action.payload };
        case "man":
            return { ...state, man: action.payload };
        case "woman":
            return { ...state, woman: action.payload };
        default:
            throw new Error();
    }
};
interface Props {
    state: IntitialStateType;
    dispatch: (action: ActionType) => void;
}
const SearchPatientFilter:React.FC<Props> = ({ state, dispatch }) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    return (
        <ScrollView
            horizontal
            contentContainerStyle={{
                gap: size.s2,
                paddingHorizontal: size.s4
            }}
            showsHorizontalScrollIndicator={false}
        >
            <ToggleBtn
                icon={(color: string, size: number) => (
                    <Ionicons
                        name={"radio-button-on"}
                        color={color}
                        size={size}
                    />
                )}
                label={"Active"}
                value={state.active}
                setValue={value => dispatch({ type: "active", payload: value })}
            />
            <ToggleBtn
                label={"Non-active"}
                value={state.nonActive}
                setValue={value =>
                    dispatch({ type: "non-active", payload: value })
                }
                icon={(color: string, size: number) => (
                    <Ionicons
                        name={"radio-button-off"}
                        color={color}
                        size={size}
                    />
                )}
            />
            <ToggleBtn
                label={"New patient"}
                value={state.newPatient}
                setValue={value =>
                    dispatch({ type: "new-patient", payload: value })
                }
                icon={(color: string, size: number) => (
                    <Foundation name="burst-new" size={size} color={color} />
                )}
            />
            <ToggleBtn
                label={"This week"}
                value={state.thisWeek}
                icon={(color: string, size: number) => (
                    <MaterialCommunityIcons
                        name="calendar-week"
                        size={size}
                        color={color}
                    />
                )}
                setValue={value =>
                    dispatch({ type: "thisweek", payload: value })
                }
            />
            <ToggleBtn
                label={"This month"}
                icon={(color: string, size: number) => (
                    <MaterialCommunityIcons
                        name="calendar-month"
                        size={size}
                        color={color}
                    />
                )}
                value={state.thisMonth}
                setValue={value =>
                    dispatch({ type: "thismonth", payload: value })
                }
            />
            <ToggleBtn
                label={"Man"}
                icon={(color: string, size: number) => (
                    <Ionicons name={"man"} color={color} size={size} />
                )}
                value={state.man}
                setValue={value => dispatch({ type: "man", payload: value })}
            />
            <ToggleBtn
                label={"Woman"}
                icon={(color: string, size: number) => (
                    <Ionicons name={"woman"} color={color} size={size} />
                )}
                value={state.woman}
                setValue={value => dispatch({ type: "woman", payload: value })}
            />
        </ScrollView>
    );
};

export default SearchPatientFilter;

const styles = ({ colors, size }) => StyleSheet.create({});
