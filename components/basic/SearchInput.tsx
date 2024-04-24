import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  useWindowDimensions
} from "react-native";
import {
  ThemeInterface,
  useTheme,
  useThemeStyles
} from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { PressableProps } from "react-native";
import { TextInputProps } from "react-native";
import { ViewProps } from "react-native";
import { TextProps } from "react-native";
import { ThemeConsumerProps } from "@/theme";

interface Props {
  // Define your props here
  onBlur?: () => void;
  onFocus?: () => void;
  isFocus?: boolean;
  disableClearIcon?: boolean;
  h?: number;
  w?: number;
  r?: number;
  bw?: number;
  st?: any;
  v?: string;
  onChange?: (text: string) => void;
  p?: string;
  pC?: string;
  iM?: "text" | "decimal" | "numeric" | "email" | "phone" | undefined;
  ref?: any;
  onClear?: () => void;
  autoCorrect?: boolean;
}

const SearchInput = (props: Props) => {
  const {
    onBlur = () => {},
    onFocus = () => {},
    isFocus = false,
    disableClearIcon = true,
    h,
    w,
    r,
    bw,
    st,
    v,
    onChange,
    p = "Search...",
    pC = "gray",
    iM = "text",
    ref,
    onClear,
    autoCorrect = true
  } = props;
  const { colors, size } = useTheme();
  const style = useThemeStyles(styles);
  const { width } = useWindowDimensions();
  return (
    <View
      style={style.search({
        h: h || width * 0.1,
        w: w || width * 0.8,
        r: r || size.s100 * 2,
        bw: bw || size.s1 / 6,
        st: st || {}
      })}
    >
      <View style={style.iconContainer}>
        <MaterialIcons name={"search"} size={24} color={colors.gray} />
      </View>
      <View style={style.textInputContainer}>
        <TextInput
          style={style.textInput}
          value={v}
          onChangeText={onChange}
          placeholder={p}
          placeholderTextColor={pC}
          autoCorrect={autoCorrect}
          inputMode={iM}
          ref={ref}
          onBlur={() => onBlur()}
          onFocus={() => {
            onFocus();
          }}
        />
      </View>
      {disableClearIcon && (
        <Pressable
