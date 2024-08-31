import { AppAlertContext } from './../context/Context';
import React from 'react';
export default function useAppAlert() {
   return React.useContext(AppAlertContext);
}
