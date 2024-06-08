import React, { createContext, useState, useEffect, useMemo } from 'react';
import { ConfirmOption } from './../components/Confirm';

export type AlertConfirmOption = Omit<ConfirmOption, 'ConfirmIsOpen' | 'msg' | 'onPress'>;
export interface IAppAlertContext {
   alert: (msg: string, option: any) => void;
   confirm: (msg: string, option: AlertConfirmOption) => boolean;
}
export const AppAlertContext = createContext<IAppAlertContext>({} as IAppAlertContext);
