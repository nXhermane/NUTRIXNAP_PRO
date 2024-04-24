type ShadowColor = string;
type ShadowOffset = {
  width: number;
  height: number;
};
type ShadowOpacity = number;
type ShadowRadius = number;
type Elevation = number;

interface ShadowConfig {
  shadowColor: ShadowColor;
  shadowOffset: ShadowOffset;
  shadowOpacity: ShadowOpacity;
  shadowRadius: ShadowRadius;
  elevation: Elevation;
}

export interface ShadowSizes {
  small: ShadowConfig;
  medium: ShadowConfig;
  large: ShadowConfig;
}

const shadowConfig = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  } as const,
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  } as const,
  large: {
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 12,
    },
    shadowOpacity: 0.7,
    shadowRadius: 7.84,
    elevation: 15,
  } as const,
} as const;

export default shadowConfig;
