import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Animated as ReactNativeAnimated,
    PressEvent
} from "react-native";
import useTheme from "@/theme/useTheme";
import useThemeStyles from "@/theme/useThemeStyles";
import Avatars from "@comp/basic/Avatars";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate
} from "react-native-reanimated";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { CoreContext } from "@/core/CoreProvider";

type StatusColor = [string, string];
type Props = {
    statusCode?: number;
    name?: string;
    occupation?: string;
    id?: string;
    lastActivity?: string;
    uri?: string;
    index?: number;
    setSelected?: (selected: string[]) => void;
    sexe?: "M" | "F";
    searchItem?: boolean;
    onDelete?: () => void;
    onEdit?: (e: PressEvent, id: string) => void;
};

const PatientItem: React.FC<Props> = (props: Props) => {
    const { colors, size } = useTheme();
    const style = useThemeStyles(styles);
    const core = React.useContext(CoreContext);
    const {
        statusCode = 1,
        name = "John Doe",
        occupation = "Obesity",
        id = "1234",
        lastActivity = "02/03/2024",
        uri,
        index = 1,
        setSelected,
        sexe = "M",
        searchItem = false,
        onDelete = () => {},
        onEdit = () => {}
    } = props;
    let statusColor: StatusColor = [colors.w300, colors.w100];
    if (statusCode === 1) statusColor = [colors.yellow300, colors.yellow100];
    if (statusCode === 2) statusColor = [colors.green200, colors.greenBg];
    if (statusCode === 0) statusColor = [colors.red300, colors.red100];
    const [isSelected, setIsSelected] = React.useState(false);
    const s = useSharedValue<number>(0);
    const Animated
