import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    KeyboardAvoidingView,
    KeyboardEvent,
    TextInput,
    UIManager
} from "react-native";
import React, {
    useEffect,
    useState,
    useMemo,
    useCallback,
    useRef,
    PropsWithChildren
} from "react";
import KeyboardAwareScrollViewContainer from "./KeyboardAwareScrollViewContainer";
interface Props {}
const { height } = Dimensions.get("screen");
const KeyboardAwareScrollView = (props: PropsWithChildren<Props>) => {
    const { children, style } = props;
    const [active, setactive] = useState<boolean>(false);
    const scrollView = useRef(null);
    const [scrollViewTarget, setScrollViewTarget] = useState(null);
    const [currentInputTarget, setCurrentInputTarget] = useState(null);
    const [scrollViewMeasure, setscrollViewMeasure] = useState({
        x: 0,
        y: 0,
        h: 0,
        w: 0
    });
    const [currentInput, setCurrentInput] = useState({ x: 0, y: 0 });
    const [scrollViewHeight, setScrollViewHeight] = useState(null);
    
    useEffect(() => {
        if (scrollViewTarget === null) return;
        UIManager.measureInWindow(scrollViewTarget, (x, y, h, w) => {
            setscrollViewMeasure({ x, y, h, w });
        });
    }, [scrollViewTarget]);

    function onKeyboardDidShow(e: KeyboardEvent) {
        if (typeof scrollViewTarget === "number") {
        }
        /// console.log(e)
        // console.log(scrollViewMeasure)
        const scrollHeight = e.endCoordinates.screenY - scrollViewMeasure.y;
        console.log("\nScrollViewHeight : ", scrollHeight, "\n");
        setScrollViewHeight(scrollHeight);
        // console.log(e);
        // console.log(scrollView.current?.scrollTo({y:400}))
    }

    const onInputFocus = e => {
        const inputTarget = e.nativeEvent.target;
        
        scrollView.current
            .getScrollResponder()
            .scrollResponderScrollNativeHandleToKeyboard(
                inputTarget,
                500,
                true
            );
        // UIManager.measureInWindow(inputTarget, (x, y, h, w) => {
        //     setCurrentInput({ x, y });

        //     scrollView.current.scrollTo({
        //         y: Math.abs(y - scrollViewMeasure.y)
        //     });
        // });
    };

    return (
        <KeyboardAwareScrollViewContainer
            ref={scrollView}
            style={scrollViewHeight!=null&&scrollViewHeight!=0&&{
                maxHeight: scrollViewHeight,
               // backgroundColor: "red",
                
            }}
            onKeyboardDidShow={e => onKeyboardDidShow(e)}
            onKeyboardDidHide={e => {
               // scrollView.current?.scrollTo({ y: 0 });
             setScrollViewHeight(0);
            }}
            onLayout={e => {
                e.persist;
                setScrollViewTarget(e.nativeEvent.target);
            }}
        >
            <View
                style={{
                    width: "100%"
                }}
            >
                <Text>{React.Children.count(children)}</Text>
                {typeof children === "function"
                    ? children({ onInputFocus })
                    : children}
            </View>
        </KeyboardAwareScrollViewContainer>
    );
};

export default KeyboardAwareScrollView;

const styles = StyleSheet.create({});
