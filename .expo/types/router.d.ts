/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(drawer)` | `/(drawer)/` | `/(drawer)/(home)` | `/(drawer)/(home)/` | `/(drawer)/(home)/agenda` | `/(drawer)/(home)/food` | `/(drawer)/(home)/patient` | `/(drawer)/agenda` | `/(drawer)/food` | `/(drawer)/notification` | `/(drawer)/patient` | `/(home)` | `/(home)/` | `/(home)/agenda` | `/(home)/food` | `/(home)/patient` | `/_sitemap` | `/agenda` | `/auth` | `/auth/` | `/auth/logininfo` | `/food` | `/forms/addFoodForm` | `/notification` | `/patient` | `/search/search` | `/search/searchFoods` | `/search/searchPatient`;
      DynamicRoutes: `/details/foods/${Router.SingleRoutePart<T>}` | `/details/patients/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/details/foods/[food_id]` | `/details/patients/[patient_Id]`;
    }
  }
}
