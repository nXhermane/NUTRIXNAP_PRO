import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, {
    useEffect,
    useState,
    useMemo,
    useCallback,
    PropsWithChildren
} from "react";
import KeyboardAwareScrollViewContainer from "./KeyboardAwareScrollViewContainer";
interface Props {}

const KeyboardAwareScrollView = (props: PropsWithChildren<Props>) => {
    const { children } = props;

    const [active, setactive] = useState<boolean>(false);

    return (
        <KeyboardAwareScrollViewContainer scrollable>
            <View
                style={{
                    width: "100%",
                    height: "100%"
                }}
            >
                {typeof children === "function"
                    ? children({ active })
                    : children}
            </View>
        </KeyboardAwareScrollViewContainer>
    );
};

export default KeyboardAwareScrollView;

const styles = StyleSheet.create({});
