import { useContext } from "react";
import { VendingMachineContext } from "../types/vending-machine.type";

export const useVendingMachine = () => {
  const context = useContext(VendingMachineContext);
  if (!context)
    throw new Error(
      "useVendingMachine must be used within a VendingMachineProvider"
    );
  return context;
};
