import {
    StyleSheet,
    View,
    ScrollView,
    ViewStyle,
    LayoutEvent,
    Keyboard,
    KeyboardAvoidingView,
    KeyboardEvent
} from "react-native";
import React from "react";

interface Props {
    onLayout: (e: LayoutEvent) => void;
    scrollable?: boolean;
    style?: ViewStyle;
    onKeyboardDidShow?: (e: KeyboardEvent) => void;
    onKeyboardDidHide?: (e: KeyboardEvent) => void;
}

const KeyboardAwareScrollViewContainer = React.forwardRef(
    (props: React.PropsWithChildren<Props>, ref) => {
        const {
            scrollable = false,
            children,
            style = {},
            scrollViewProps = {},
            onLayout,
            onKeyboardDidShow,
            onKeyboardDidHide
        } = props;
        const [isScrollable, setIsScrollable] = React.useState<boolean>(false);
        Keyboard.addListener("keyboardDidShow", (e: KeyboardEvent) => {
            onKeyboardDidShow && onKeyboardDidShow(e);
            setIsScrollable(true);
        });
        Keyboard.addListener("keyboardDidHide", (e: KeyboardEvent) => {
            onKeyboardDidHide && onKeyboardDidHide(e);
            setIsScrollable(false);
        });
        return (
          <View style={style}>
            <ScrollView
                ref={ref && ref}
                contentContainerStyle={[styles.container]}
                {...scrollViewProps}
                keyboardShouldPersistTaps={"handled"}
                keyboardDismissMode={"none"}
                scrollEnabled={true}
                removeClippedSubviews
                onLayout={onLayout && onLayout}
            >
                {children}
            </ScrollView>
            </View>
        );
    }
);

export default KeyboardAwareScrollViewContainer;

const styles = StyleSheet.create({
    container: {}
});
