import {
   StyleSheet,
   Text,
   View,
   ScrollView,
   Dimensions,
   KeyboardAvoidingView,
   KeyboardEvent,
   TextInput,
   UIManager,
   findNodeHandle,
   Platform,
} from 'react-native';
import React, { useEffect, useState, useMemo, useCallback, useRef, PropsWithChildren } from 'react';
import KeyboardAwareScrollViewContainer from './KeyboardAwareScrollViewContainer';
interface Props {}
const KEYBOARD_EXTRA_HEIGHT = 60;
const KeyboardAwareScrollView = (props: PropsWithChildren<Props>) => {
   const { children, style } = props;
   const scrollView = useRef(null);
   const scrollViewTarget = useRef(null);
   const containerScrollViewTarget = useRef(null);
   // const [scrollViewHeight, setScrollViewHeight] = useState({ h: 0, p: 0 });
   const [keyboardSpace, setkeyboardSpace] = useState<number>(0);
   const [containerHeight, setContainerHeight] = useState<number>(0);
   function updateKeyboadSpace(e: KeyboardEvent) {
      if (true) {
         let keyboardSpace = e.endCoordinates.height + KEYBOARD_EXTRA_HEIGHT;
         setkeyboardSpace(keyboardSpace);
         UIManager.measureInWindow(scrollViewTarget.current, (x: number, y: number, width: number, height: number) => {
            setContainerHeight(e.endCoordinates.screenY - y);
         });
         const currentlyFocusedInput = TextInput.State.currentlyFocusedInput()
            ? findNodeHandle(TextInput.State.currentlyFocusedInput())
            : TextInput.State.currentlyFocusedField();
         const responder = scrollView.current.getScrollResponder();
         if (!currentlyFocusedInput || !responder || !containerScrollViewTarget.current) return;

         UIManager.viewIsDescendantOf(currentlyFocusedInput, responder.getInnerViewNode(), (isAncestor: boolean) => {
           console.log("View Is Descending",isAncestor,currentlyFocusedInput)
            if (isAncestor) {
               // Voir si le etxtInput peut etre cacher par le keyboard
               UIManager.measureInWindow(currentlyFocusedInput, (x: number, y: number, width: number, height: number) => {
                  const textInputBottomPosition = y + height;
                  const keyboardPosition = e.endCoordinates.screenY;
                  if (textInputBottomPosition > keyboardPosition) {
                     responder.scrollTo({
                        x: 0,
                        y: textInputBottomPosition,
                        animated: true,
                     });
                  } else {
                  }
               });
            } else {
               console.log('Is not Cached By scrollView');
            }
         });
      }
   }

   function onKeyboardDidShow(e) {
      updateKeyboadSpace(e);
      //setkeyboardSpace(500);
   }
   function onKeyboardDidHide(e) {
      setContainerHeight(0);
   }

   return (
      <KeyboardAwareScrollViewContainer
         ref={scrollView}
         onKeyboardDidShow={(e) => onKeyboardDidShow(e)}
         onKeyboardDidHide={onKeyboardDidHide}
         onLayout={(e) => {
            e.persist();
            console.log(e.nativeEvent)
            scrollViewTarget.current = e.nativeEvent.target;
         }}
         onLayoutContainer={(e) => {
            e.persist();
            containerScrollViewTarget.current = e.nativeEvent.target;
         }}
         style={
            {
               // paddingBottom: 30
            }
         }
         containerStyle={{
            maxHeight: containerHeight != 0 ? containerHeight : '100%',
         }}
      >
         <View
            style={{
               width: '100%',
               ...style,
            }}
         >
            {typeof children === 'function' ? children() : children}
         </View>
      </KeyboardAwareScrollViewContainer>
   );
};

export default React.memo(KeyboardAwareScrollView);

const styles = StyleSheet.create({});
