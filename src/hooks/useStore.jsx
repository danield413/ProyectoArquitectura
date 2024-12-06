import { useContext } from "react"
import { GlobalContext } from "../context/context"


export const useStore = () => {

    const { state, setState } = useContext(GlobalContext);

    return { state, setState };

}