import React, { createContext, useContext, useState } from "react";

export interface ToyData {
  id: string;
  name: string;
  battery: string;
  status: string;
  personality: string;
  parentalGuidance: boolean;
  isNewlyConnected?: boolean;
}

interface ToyContextType {
  toys: ToyData[];
  addToy: (toy: ToyData) => void;
  updateToy: (id: string, updates: Partial<ToyData>) => void;
  removeToy: (id: string) => void;
}

const ToyContext = createContext<ToyContextType | undefined>(undefined);

export function ToyProvider({ children }: { children: React.ReactNode }) {
  const [toys, setToys] = useState<ToyData[]>([
    {
      id: "toy1",
      name: "Toy1",
      battery: "85%",
      status: "Active",
      personality: "friendly",
      parentalGuidance: true,
    },
    {
      id: "toy2",
      name: "Learning Robot",
      battery: "67%",
      status: "Standby",
      personality: "educational",
      parentalGuidance: true,
    },
  ]);

  const addToy = (toy: ToyData) => {
    setToys((prevToys) => [...prevToys, toy]);
  };

  const updateToy = (id: string, updates: Partial<ToyData>) => {
    setToys((prevToys) =>
      prevToys.map((toy) => (toy.id === id ? { ...toy, ...updates } : toy))
    );
  };

  const removeToy = (id: string) => {
    setToys((prevToys) => prevToys.filter((toy) => toy.id !== id));
  };

  return (
    <ToyContext.Provider value={{ toys, addToy, updateToy, removeToy }}>
      {children}
    </ToyContext.Provider>
  );
}

export function useToys() {
  const context = useContext(ToyContext);
  if (context === undefined) {
    throw new Error("useToys must be used within a ToyProvider");
  }
  return context;
}
