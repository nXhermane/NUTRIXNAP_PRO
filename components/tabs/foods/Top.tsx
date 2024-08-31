import { StyleSheet, Text, View } from 'react-native';
import Avatars from '@comp/basic/Avatars';
import useTheme from '@/theme/useTheme';
import useThemeStyles from '@/theme/useThemeStyles';
import DashBoardSection from '@comp/container/DashBoardSection';
import React from 'react';
interface Props {
   // Define your props here
}

const Top = (props: Props) => {
   const { colors, size } = useTheme();
   const style = useThemeStyles(styles);

   return (
      <DashBoardSection
         title={"Bases de données d'aliments"}
         body={'Créer, Consultez et mettez à jour les aliments pour les utiliser dans vos plans alimentaires'}
      />
   );
};

export default Top;

const styles = ({ colors, size }) => StyleSheet.create({});
