import { CoreContext } from "@/core/CoreProvider";
import { useContext } from "react";
export default function useCore(): CoreInterface {
    return useContext(CoreContext);
}
