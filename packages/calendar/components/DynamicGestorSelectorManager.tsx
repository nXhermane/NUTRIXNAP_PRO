import { StyleSheet, Text, View, Button } from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import GestureSelector from "./GestureSelector";
import DemoGesture from './DemoGesture'
interface Props {
    // Define your props here
}

const DynamicGestorSelectorManager = (props: Props) => {
    const {
        selectorWidth,
        selectorOffset,
        selectorStart,
        selectorIsPressed,
        selectorHeight,
        selectorHeightStart,
        selectorTopDist,
        cellHeight,
        scrollViewVisibleContentWidth,
        format
    } = props;
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);

    const [allVisibleSelector, setAllVisibleSelector] = useState([
        {
            id: "gestureD",
            component: (
                <GestureSelector
                    key={"gestureD"}
                    selectorOffset={selectorOffset}
                    selectorStart={selectorStart}
                    selectorIsPressed={selectorIsPressed}
                    selectorHeight={selectorHeight}
                    selectorHeightStart={selectorHeightStart}
                    selectorTopDist={selectorTopDist}
                    cellHeight={cellHeight}
                    selectorWidth={selectorWidth}
                    scrollViewVisibleContentWidth={
                        scrollViewVisibleContentWidth
                    }
                    format={format}
                />
            )
        },
        //         {
        //     id: "gestureDemo",
        //     component: (
        //         <DemoGesture
        //             key={"gestureDemo"}
        //             selectorOffset={selectorOffset}
        //             selectorStart={selectorStart}
        //             selectorIsPressed={selectorIsPressed}
        //             selectorHeight={selectorHeight}
        //             selectorHeightStart={selectorHeightStart}
        //             selectorTopDist={selectorTopDist}
        //             cellHeight={cellHeight}
        //             selectorWidth={selectorWidth}
        //             scrollViewVisibleContentWidth={
        //                 scrollViewVisibleContentWidth
        //             }
        //             format={format}
        //         />
        //     )
        // }
    ]);
    
    

    return (
        <View style={style.dynamicGestorSelectorContainer}>

            {allVisibleSelector.map(item => item.component)}
        </View>
    );
};

export default DynamicGestorSelectorManager;

const styles = ({ colors, size }) =>
    StyleSheet.create({
        dynamicGestorSelectorContainer: {
            flex: 1,
            position: "absolute"
        }
    });
