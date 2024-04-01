import React, { createContext, useState, useEffect, useMemo } from "react";
import { AlertOption } from "./../components/Alert";

export type AlertComfirmOption = Omit<
    AlertOption,
    "alertIsOpen" | "msg" | "onPress"
>;
export interface IAppAlertContext {
    alert: (msg: string, option: any) => void;
    confirm: (msg: string, option: AlertComfirmOption) => boolean;
}
export const AppAlertContext = createContext<IAppAlertContext>(
    {} as IAppAlertContext
);
