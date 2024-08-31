import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { ThemeInterface, useTheme, useThemeStyles } from '@/theme';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import React from 'react';
import useImagePicker from '@/hooks/useImagePicker';
import Avatars from './Avatars';
export type ImagePickerItemType = { uri: string; type: string; id: number };
export interface ImagePickerProps {
   onChange?: (images: ImagePickerItemType[]) => void;
   label?: string;
   placeholder?: string;
   isRequire?: boolean;
   withPreview?: boolean;
   numberOfImages?: number;
   value?: ImagePickerItemType[];
}

const ImagePicker = (props: React.PropsWithChildren<ImagePickerProps>) => {
   const { colors, size } = useTheme();
   const style = useThemeStyles(styles);
   const { label, isRequire, placeholder, onChange, withPreview, numberOfImages = 1, value = [], children } = props;
   const [selectedImage, setSelectedImage] = React.useState<ImagePickerItemType[]>(value);
   const [picker] = useImagePicker({
      allowsMultipleSelection: numberOfImages > 1 ? true : false,
      allowsEditing: numberOfImages > 1 ? false : true,
   });
   React.useEffect(() => {
      onChange && onChange(selectedImage);
   }, [selectedImage]);
   return (
      <View style={style.container}>
         <View style={style.labelContainer}>
            {label && <Text style={style.label}>{label}</Text>}
            {isRequire && (
               <View style={style.isRequireIconContainer}>
                  <Text style={style.isRequireIcon}>*</Text>
               </View>
            )}
         </View>
         <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
               if (selectedImage.length < numberOfImages) {
                  picker().then((images) => {
                     images.forEach((image, index) => {
                        const rest = numberOfImages - selectedImage.length;
                        if (rest > index) {
                           setSelectedImage((prev) => [...prev, { ...image, id: prev.length + 1 }]);
                        }
                     });
                  });
               }
            }}
         >
            {!children ? (
               <View style={style.imagePickerZone}>
                  <View style={style.imagePickerInnerZone}>
                     <Ionicons name={'cloud-upload-outline'} size={size.s5} color={colors.gray300} />
                     {placeholder && selectedImage.length === 0 && <Text style={style.placeholder}>{placeholder}</Text>}
                     {selectedImage.length != 0 && (
                        <Text style={style.placeholder}>
                           {selectedImage.length} {'image(s) selectionnée(s)'}
                        </Text>
                     )}
                  </View>
               </View>
            ) : (
               children
            )}
         </TouchableOpacity>
         {withPreview && (
            <View style={style.selectedImageContainer}>
               <ScrollView horizontal>
                  <View style={{ gap: size.s1, flexDirection: 'row' }}>
                     {selectedImage.map((item, index) => (
                        <View key={item.id}>
                           <Avatars image={{ uri: item.uri }} r={size.s1} />
                           <TouchableOpacity
                              style={style.deleteBtn}
                              onPress={() => {
                                 setSelectedImage((prev) => {
                                    const images = prev.filter((image) => image.id != item.id);
                                    return images;
                                 });
                              }}
                           >
                              <Ionicons name={'close'} size={size.s5} color={colors.white} />
                           </TouchableOpacity>
                        </View>
                     ))}
                  </View>
               </ScrollView>
            </View>
         )}
      </View>
   );
};

export default ImagePicker;

const styles = ({ colors, size }: ThemeInterface) =>
   StyleSheet.create({
      container: {
         width: '100%',
         paddingHorizontal: size.s3,
         gap: size.s2,
      },
      labelContainer: {
         flexDirection: 'row',
         justifyContent: 'flex-start',
         alignItems: 'center',
      },
      label: {
         fontFamily: 'inter_sb',
         fontSize: size.s3 * 1.2,
         color: colors.gray300,
      },
      isRequireIconContainer: {
         marginLeft: size.s1 / 2,
      },
      isRequireIcon: {
         fontFamily: 'inter_sb',
         fontSize: size.s4,
         color: colors.green300,
         textAlignVertical: 'top',
      },
      imagePickerZone: {
         height: size.s50 * 1.2,
         width: '100%',
         borderColor: colors.blue300,
         borderWidth: size.s1 / 2,
         borderRadius: size.s3,
         borderStyle: 'solid',
         padding: size.s1 / 2,
         backgroundColor: colors.blue300 + '40',
      },
      imagePickerInnerZone: {
         width: '100%',
         height: '100%',
         borderColor: colors.blue300,
         borderWidth: size.s1 / 2,
         borderRadius: size.s2,
         borderStyle: 'dotted',
         padding: size.s1,
         justifyContent: 'center',
         alignItems: 'center',
      },
      placeholder: {
         fontFamily: 'inter_m',
         fontSize: size.s3,
         color: colors.gray300,
      },
      selectedImageContainer: {
         width: '100%',
      },
      deleteBtn: {
         position: 'absolute',
         top: 0,
         right: 0,
      },
   });
