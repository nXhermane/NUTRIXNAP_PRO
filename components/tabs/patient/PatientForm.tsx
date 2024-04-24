import React, { useState, useReducer, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Modal,
    KeyboardAvoidingView,
    ScrollView,
    Keyboard,
    findNodeHandle,
    UIManager
} from 'react-native';
import { ThemeInterface, useTheme, useThemeStyles } from '@/theme';
import { PatientEntity } from '@/core/interfaces';
import { Ionicons } from '@expo/vector-icons';
import { useFormik } from 'formik';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    interpolate,
    withTiming,
    runOnJS
} from 'react-native-reanimated';

import {

