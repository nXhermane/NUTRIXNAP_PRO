import { StyleSheet, Text, View } from 'react-native';
import { ThemeInterface, useTheme, useThemeStyles } from '@/theme';
import SelectionInput from '@comp/basic/SelectionInput';
import TextInput from '@comp/basic/TextInput';
import DateTimeInput from '@comp/basic/DateTimeInput';
import ImagePicker, { ImagePickerItemType as ImageItemType } from '@comp/basic/ImagePicker';
import { MealsTypes } from '@/data';
import { FoodDiaryDTO } from '@/core/interfaces';
import React from 'react';
interface Props {
   onChangeValue: (key: string, value: any) => void;
   values: {
      images: {
         uri: string;
         type?: string;
         id: number;
      }[];
   } & Omit<FoodDiaryDTO, 'images'>;
}

const FoodDiaryFormBody = ({ onChangeValue, values }: Props) => {
   const { size, colors } = useTheme();
   const style = useThemeStyles(styles);
   const [custormMealsType, setCustormMealsType] = React.useState<boolean>(false);
   return (
      <View style={style.foodDiaryFormBody}>
         <DateTimeInput
            label={'Date et heure de consommation du repas'}
            value={values && values?.date}
            r={size.s3}
            onChange={(date: Date) => {
               onChangeValue && onChangeValue('date', DateManipulator.dateToDateTimeString(date));
            }}
         />
         <SelectionInput
            r={size.s3}
            label={'Type de Repas'}
            data={MealsTypes}
            value={values && values?.mealsType}
            editable={custormMealsType}
            onChange={(ids: number, data: { label: string; id: number }) => {
               onChangeValue && onChangeValue('mealsType', data?.label || values.mealsType);
            }}
            onChangeText={(value: string) => {
               onChangeValue && onChangeValue('mealsType', value);
            }}
            unique
            onLongPress={() => {
               setCustormMealsType((prev) => !prev);
            }}
            enterKeyHint={'next'}
            placeholder={'Ex: Petit-déjeuner'}
         />
         <TextInput
            label={'Repas'}
            value={values && values?.meals}
            r={size.s3}
            multiline
            numberOfLines={4}
            inputContainerStyle={{
               minHeight: size.s100,
               maxHeight: size.s100 * 1.5,
            }}
            rows={10}
            onChangeText={(value: string) => {
               onChangeValue && onChangeValue('meals', value);
            }}
            placeholder={"Ex: Omelette aux légumes, pain complet, jus d'orange"}
         />
         <TextInput
            label={'Observations'}
            value={values && values?.observations}
            r={size.s3}
            multiline
            numberOfLines={4}
            inputContainerStyle={{
               minHeight: size.s100,
               maxHeight: size.s100 * 1.5,
            }}
            rows={10}
            onChangeText={(value: string) => {
               onChangeValue && onChangeValue('observations', value);
            }}
            placeholder={
               "Ex: Était fatigué et stressé avant le petit-déjeuner, mais s'est senti plus énergique après avoir consommé un bol de flocons d'avoine avec des fruits frais et un verre de jus d'orange."
            }
         />
         <ImagePicker
            label={'Image associée au repas'}
            placeholder={'Télécharger une photo du repas'}
            value={values && values?.images}
            onChange={(images: ImageItemType) => {
               onChangeValue && onChangeValue('images', images);
            }}
            withPreview
            numberOfImages={3}
         />
      </View>
   );
};

export default React.memo(FoodDiaryFormBody);

const styles = ({ size, colors }: ThemeInterface) =>
   StyleSheet.create({
      foodDiaryFormBody: {
         flex: 1,
         gap: size.s4,
         alignItems: 'center',
      },
   });
