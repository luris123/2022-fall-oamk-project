import { createContext, useState } from "react";

//Can use user state anywhere needed
const DatasetsContext = createContext();

export const DatasetsProvider = ({ children }) => {
    const [ datasets, setDatasets] = useState();

    return (
        <DatasetsContext.Provider value={{datasets, setDatasets}}>
            {children}
        </DatasetsContext.Provider>
    )
}

export default DatasetsContext;