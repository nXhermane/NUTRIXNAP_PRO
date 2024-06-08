import { useFormik } from 'formik';
import { FoodDiaryDTO } from '@/core/interfaces';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import useCreateFoodDiary from './useCreateFoodDiary';
import useUpdateFoodDairy from './useUpdateFoodDiary';
import { DateManipulator } from '@/utils';
export default function useFoodDiaryForm(patientUniqueId: string, onFinish: () => void, foodDiaryData?: FoodDiaryDTO, isUpdate = false) {
   const handleCreateFoodDiaryProcess = useCreateFoodDiary(patientUniqueId);
   const handleUpdateFoodDiaryProcess = useUpdateFoodDairy(patientUniqueId);

   const onSubmit = (
      values: {
         images: {
            uri: string;
            type?: string;
            id: number;
         }[];
      } & Omit<FoodDiaryDTO, 'images'>,
   ) => {
      if (!isUpdate) {
         handleCreateFoodDiaryProcess(values).then((value: boolean) => {
            onFinish && onFinish();
         });
      } else {
         handleUpdateFoodDiaryProcess(values, foodDiaryData).then((value: boolean) => {
            onFinish && onFinish();
         });
      }
   };
   const food_diary_data = {
      mealsType: foodDiaryData?.mealsType || '',
      meals: foodDiaryData?.meals || '',
      observations: foodDiaryData?.observations,
      date: foodDiaryData?.date || DateManipulator.dateToDateTimeString(new Date()),
      images: foodDiaryData?.images?.map(
         (item, index) =>
            ({
               uri: item,
               id: index,
               type: item.split('.')[item.split('.').length - 1],
            }) || [],
      ),
      foodIds: foodDiaryData?.foodIds || [],
      foodQuantities: foodDiaryData?.foodQuantities || new Map(),
   };

   const formik = useFormik({
      initialValues: food_diary_data,
      onSubmit,
   });
   const { values, touched, handleSubmit, handleChange, errors, isSubmitting, isValid, setFieldValue } = formik;
   const setChangeValue = (key: string, value: any) => {
      if (typeof value === 'object') {
         setFieldValue(key, value);
      } else {
         handleChange(key)(value);
      }
   };

   return {
      values,
      onSubmit: handleSubmit,
      onChange: setChangeValue,
      errors,
      isSubmitting,
      isValid,
   };
}
