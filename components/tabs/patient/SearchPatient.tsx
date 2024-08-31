import { StyleSheet, Text, View } from 'react-native';
import Avatars from '@comp/basic/Avatars';
import useTheme from '@/theme/useTheme';
import useThemeStyles from '@/theme/useThemeStyles';
import DashBoardSection from '@comp/container/DashBoardSection';
import SearchBtn from '@comp/tabs/SearchBtn';
import React from 'react';
interface Props {
   // Define your props here
}

const SearchPatient = (props: Props) => {
   const { colors, size } = useTheme();
   const style = useThemeStyles(styles);

   return (
      <DashBoardSection body={"Recherchez des Patients par nom,numéro de contact ou d'identification,email,occupation..."}>
         <SearchBtn placeholder={'Recherchez des patients'} searchPageLink={'search/searchPatient'} />
      </DashBoardSection>
   );
};

export default SearchPatient;

const styles = ({ colors, size }) => StyleSheet.create({});
