import {
    StyleSheet,
    View,
    ScrollView,
    ViewStyle,
    LayoutEvent,
    Keyboard,
    KeyboardAvoidingView
} from "react-native";
import React from "react";

interface Props {
    onLayout: (e: LayoutEvent) => void;
    scrollable?: boolean;
    style?: ViewStyle;
}

const KeyboardAwareScrollViewContainer = React.forwardRef(
    (props: React.PropsWithChildren<Props>, ref) => {
        const {
            scrollable = false,
            children,
            style = {},
            scrollViewProps = {},
            onLayout
        } = props;
        const [isScrollable, setIsScrollable] = React.useState<boolean>(false);
        Keyboard.addListener("keyboardDidShow", () => {
            setIsScrollable(false);
        });
        Keyboard.addListener("keyboardDidHide", () => {
            setIsScrollable(true);
        });
        return (
            <ScrollView
                ref={ref && ref}
                contentContainerStyle={[styles.container, style]}
                {...scrollViewProps}
                onLayout={onLayout && onLayout}
                keyboardShouldPersistTaps={"always"}
                scrollEnabled={isScrollable}
            >
                {children}
            </ScrollView>
        );
    }
);

export default KeyboardAwareScrollViewContainer;

const styles = StyleSheet.create({
    container: {
      
    }
});
