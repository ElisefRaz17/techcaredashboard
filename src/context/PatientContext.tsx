import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of your item

interface PatientContextType {
  selectedPatient: any | null;
  setSelectedPatient: (item: any) => void;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);


export const PatientProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null);

  return (
    <PatientContext.Provider value={{ selectedPatient, setSelectedPatient }}>
      {children}
    </PatientContext.Provider>
  );
};

// Custom hook for easy consumption
export const usePatient = () => {
  const context = useContext(PatientContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
};
