import { registerSheet, SheetDefinition } from "react-native-actions-sheet";
import ModalSheet from "@/components/ModalSheet";

registerSheet('modalSheet', ModalSheet);

declare module 'react-native-actions-sheet' {
  interface Sheets {
    'modalSheet': SheetDefinition;
  }
}

export {};