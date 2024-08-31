import { StyleSheet, Text, View } from 'react-native';
import useTheme from '@/theme/useTheme';
import useThemeStyles from '@/theme/useThemeStyles';
import DashBoardSection from '@comp/container/DashBoardSection';
import React from 'react';
import { BarChart, LineChart, PieChart, PopulationPyramid } from 'react-native-gifted-charts';
interface Props {
   // Define your props here
}
function getStartAndEndOfWeeks() {
   const weeks = [];

   for (let i = 5; i >= 0; i--) {
      const currentDate = new Date();
      const startOfWeek = new Date(currentDate.getTime() - i * 7 * 24 * 60 * 60 * 1000);
      startOfWeek.setUTCHours(0, 0, 0, 0); // Début du jour
      const endOfWeek = new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000);
      endOfWeek.setUTCHours(23, 59, 59, 999); // Fin du jour
      const options = { month: 'short', day: 'numeric' };
      weeks.push({
         start: startOfWeek.toLocaleDateString(undefined, options),
         end: endOfWeek.toLocaleDateString(undefined, options),
      });
   }

   return weeks;
}
const weeks = getStartAndEndOfWeeks();
const data = [{ value: 1 }, { value: 4 }, { value: 8 }, { value: 1 }, { value: 5 }, { value: 0 }];
for (let i = 0; i <= 5; i++) {
   data[i].labelComponent = () => <LabelComponent>{weeks[i].start}</LabelComponent>;
}
const LabelComponent = (props) => {
   const { colors, size } = useTheme();
   return (
      <Text
         style={{
            color: colors.gray300,
            fontSize: size.s3,
            fontFamily: 'inter_l',
            transform: [
               {
                  rotateZ: '40deg',
               },
            ],
            zIndex: 10000,
            position: 'absolute',
            paddingLeft: size.s10,
            paddingTop: size.s1,
            width: size.s100,
         }}
      >
         {props.children}
      </Text>
   );
};
const GeneralInfo = (props: Props) => {
   const { colors, size } = useTheme();
   const style = useThemeStyles(styles);
   return (
      <DashBoardSection title={'Information Generale'} body={'Nombres de patients ajouter au cours des 6 dernières semaines '}>
         <View style={style.container}>
            <LineChart
               width={size.width * 0.8}
               initialSpacing={0}
               spacing={size.s50 * 1.2}
               yAxisTextStyle={{
                  fontFamily: 'inter_l',
                  color: colors.gray300,
               }}
               color={colors.green200}
               yAxisColor={colors.gray300}
               xAxisColor={colors.gray300}
               verticalLinesColor={colors.gray100}
               horizontalLinesColor={colors.gray100}
               showVerticalLines
               thickness={3}
               hideDataPoints
               data={data}
               focusEnabled
               showStripOnFocus
               stripHeight={size.s100 * 1.3}
               stripWidth={size.s1 / 4}
               stripColor={colors.green300}
               overflowTop={0}
               noOfSections={5}
               stepValue={2}
               adjustToWidth
               disableScroll
               isAnimated
               areaChart
               curved
               startFillColor={colors.green100}
               startOpacity={0.8}
               endFillColor={colors.green100}
               endOpacity={0.3}
            />
         </View>
      </DashBoardSection>
   );
};

export default GeneralInfo;

const styles = ({ colors, size }) =>
   StyleSheet.create({
      container: {
         paddingHorizontal: size.s1,
         paddingTop: size.s3,
         paddingBottom: size.s3,
         alignItems: 'center',
      },
   });
