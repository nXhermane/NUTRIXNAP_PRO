import React, { useState, useEffect, useMemo } from "react";

import {
    AppAlertContext,
    IAppAlertContext,
    AlertConfirmOption
} from "./Context";
import Confirm from "./../components/Confirm";
import SnackBar from "./../components/SnackBar"
export const AppAlertProvider: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    const [alertIsShow, setAlertIsShow] = useState<boolean>(false);
    const [alertConfirmOption, setAlertConfirmOption] =
        useState<AlertConfirmOption>({});
    const [alertConfirmResult, setAlertConfirmResult] =
        useState<boolean>(false);
    const [alertConfirmMsg, setAlertConfirmMsg] = useState<string>("");
    const [alertConfirmResolver, setAlertConfirmResolver] = useState({
        res: (value: boolean) => {}
    });
    const AppAlert = {
        confirm: (msg: string, options?: AlertConfirmOption) => {
            return new Promise<boolean>((resolve, reject) => {
                setAlertConfirmResult(false);
                setAlertConfirmMsg(msg);
                setAlertConfirmOption(options ? options : {});
                setAlertIsShow(true);
                setAlertConfirmResolver({
                    res: (value: boolean) => resolve(value)
                });
            });
        }
    };

    return (
        <AppAlertContext.Provider value={AppAlert}>
                  
            {children}
            {alertIsShow && (
                <Confirm
                    confirmIsOpen={(value: boolean) => setAlertIsShow(value)}
                    {...alertConfirmOption}
                    onPress={(value: boolean) => {
                        setAlertConfirmResult(value);
                        alertConfirmResolver.res(value);
                        setAlertConfirmResolver({ res: () => {} });
                    }}
                    msg={alertConfirmMsg}
                />
            )}
  <SnackBar />
        </AppAlertContext.Provider>
    );
};
