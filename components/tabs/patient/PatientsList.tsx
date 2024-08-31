import { StyleSheet, Text, View, FlatList, PressEvent } from 'react-native';

import useTheme from '@/theme/useTheme';
import useThemeStyles from '@/theme/useThemeStyles';
import { router, Link } from 'expo-router';
import PatientSection from '@comp/container/PatientSection';
import PatientItem from '@comp/tabs/patient/PatientItem';
import SearchInput from '@comp/search/SearchInput';
import SearchPatientFilter, { searchFilterReducer, searchFilterInitialState } from '@comp/search/SearchPatientFilter';
import { dataPatientList } from '@/data';
import React, { useState, useReducer, useEffect, useContext } from 'react';
import useCore from '@/hooks/useCore';
import { useAppAlert } from '@pack/AppAlert';
interface Props {
   onPressAddBtn: (e: PressEvent) => void;
   openPopup?: boolean;
}

const PatientsList = (props: Props) => {
   const { colors, size } = useTheme();
   const style = useThemeStyles(styles);
   const Alert = useAppAlert();
   const core = useCore();
   const [selectedPatient, setSelectedPatient] = useState([]);
   const [searchIsActive, setSearchIsActive] = useState<boolean>(false);
   const [filterIsActive, setFilterIsActive] = useState<boolean>(false);
   const [searchFilterState, searchFilterDispatch] = useReducer(searchFilterReducer, searchFilterInitialState);
   const [patientList, setPatientList] = useState([]);
   const [forceUpdate, setForceUpdate] = useState<boolean>(true);
   const [searchValue, setSearchValue] = useState<string>('');
   useEffect(() => {
      core.patientS.searchPatient(searchValue).then((patients) => {
         setPatientList(patients);
      });
   }, [core.patientS, props.openPopup, forceUpdate, searchValue]);

   return (
      <PatientSection
         title={'Liste des Patients'}
         body={"Recherchez des patient par nom,occupation,email,numéro de contact ou l'#id ou Filtrez les patients"}
         withRight
         withAddBtn
         withFilter
         withSearch
         header
         onPressFilter={() => {
            setFilterIsActive((prev) => !prev);
         }}
         onPressAddBtn={(e: PressEvent) => {
            props.onPressAddBtn && props.onPressAddBtn(e);
            //router.navigate("forms/addPatientForm")
         }}
         onPressSearch={() => {
            setSearchIsActive((prev) => !prev);
         }}
      >
         <View style={style.container}>
            {searchIsActive && (
               <View style={style.searchInputContainer}>
                  <SearchInput value={searchValue} setValue={setSearchValue} placeholder={'Recherchez des patients'} />
               </View>
            )}
            {filterIsActive && (
               <View style={style.searchFilterContainer}>
                  <SearchPatientFilter state={searchFilterState} dispatch={searchFilterDispatch} />
               </View>
            )}
            <FlatList
               data={patientList}
               showsVerticalScrollIndicator={false}
               renderItem={({ item, index }) => (
                  <PatientItem
                     statusCode={1}
                     name={item.name}
                     occupation={item.occupancy}
                     id={item.id}
                     lastActivity={item.updateAt}
                     index={index}
                     setSelected={setSelectedPatient}
                     selected={selectedPatient}
                     sexe={item.gender}
                     uri={item.profil_img}
                     onDelete={() => {
                        Alert.confirm(`Voulez-vous vraiment supprimer le patient ${item.name} ajouté le ${item.createdAt} ?`).then(
                           (check: boolean) => {
                              if (check) {
                                 core.patientS.deletePatient(item.id).then(() => {
                                    setForceUpdate((prev) => !prev);
                                 });
                              }
                           },
                        );
                     }}
                     onEdit={(e: PressEvent, id: number) => {
                        props.onPressItemEdit && props.onPressItemEdit(e, id);
                     }}
                  />
               )}
               keyExtractor={(item) => item.id.toString()}
            />
         </View>
      </PatientSection>
   );
};

export default PatientsList;

const styles = ({ colors, size }) =>
   StyleSheet.create({
      container: {
         marginTop: size.s1,
         maxHeight: size.height * 0.65,
      },
      searchInputContainer: {
         paddingHorizontal: size.s2,
      },
      searchFilterContainer: {
         paddingVertical: size.s2,
      },
   });
