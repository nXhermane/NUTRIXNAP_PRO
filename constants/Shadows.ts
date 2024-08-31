interface ShadowConfig {
   shadowColor: string;
   shadowOffset: {
      width: number;
      height: number;
   };
   shadowOpacity: number;
   shadowRadius: number;
   elevation: number;
}

export interface ShadowSizes {
   small: ShadowConfig;
   medium: ShadowConfig;
   large: ShadowConfig;
}

const shadowConfig: ShadowSizes = {
   small: {
      shadowColor: '#000',
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
   },
   medium: {
      shadowColor: '#000',
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 5.84,
      elevation: 5,
   },
   large: {
      shadowColor: '#000',
      shadowOffset: {
         width: 10,
         height: 12,
      },
      shadowOpacity: 0.7,
      shadowRadius: 7.84,
      elevation: 15,
   },
};

export default shadowConfig;
