import { StyleSheet, View, ScrollView, ViewStyle, LayoutEvent, Keyboard, KeyboardAvoidingView, KeyboardEvent } from 'react-native';
import React from 'react';

interface Props {
   onLayout: (e: LayoutEvent) => void;
   scrollable?: boolean;
   style?: ViewStyle;
   onKeyboardDidShow?: (e: KeyboardEvent) => void;
   onKeyboardDidHide?: (e: KeyboardEvent) => void;
}

const KeyboardAwareScrollViewContainer = React.forwardRef((props: React.PropsWithChildren<Props>, ref) => {
   const { children, style = {}, onLayout, onLayoutContainer, onKeyboardDidShow, onKeyboardDidHide, containerStyle = {} } = props;

   React.useEffect(() => {
      const showsListener = Keyboard.addListener('keyboardDidShow', (e: KeyboardEvent) => {
         onKeyboardDidShow && onKeyboardDidShow(e);
      });
      const hideListener = Keyboard.addListener('keyboardDidHide', (e: KeyboardEvent) => {
         onKeyboardDidHide && onKeyboardDidHide(e);
      });
      return () => {
         showsListener.remove();
         hideListener.remove();
      };
   }, [onKeyboardDidHide, onKeyboardDidShow]);

   return (
      <View style={containerStyle} onLayout={onLayoutContainer && onLayoutContainer}>
         <ScrollView
            ref={ref && ref}
            contentContainerStyle={[styles.container, style]}
            {...props}
            keyboardShouldPersistTaps={'always'}
            keyboardDismissMode={'none'}
            scrollEventThrottle={1}
            onLayout={onLayout && onLayout}
         >
            {children}
         </ScrollView>
      </View>
   );
});

export default React.memo(KeyboardAwareScrollViewContainer);

const styles = StyleSheet.create({
   container: {},
});
