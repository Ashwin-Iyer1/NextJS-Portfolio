"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";
import { usePathname } from "next/navigation";

const InitialDocumentEntry = createContext(false);
const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export default function IntroSessionProvider({ children }) {
  const pathname = usePathname();
  // React uses the server snapshot for SSR and the matching hydration render,
  // then the client snapshot for this persistent layout's remaining lifetime.
  // A Home page mounted by client navigation therefore never starts its intro.
  const hydrated = useSyncExternalStore(
    subscribe,
    clientSnapshot,
    serverSnapshot,
  );

  useEffect(() => {
    // Entering on, or navigating to, another route also consumes this session's
    // automatic intro, including a later full-document visit to Home.
    if (pathname === "/") return;
    try {
      sessionStorage.setItem("loaded", "true");
    } catch {
      // The persistent provider still prevents internal-navigation replay.
    }
  }, [pathname]);

  return (
    <InitialDocumentEntry.Provider value={!hydrated}>
      {children}
    </InitialDocumentEntry.Provider>
  );
}

export function useInitialDocumentEntry() {
  return useContext(InitialDocumentEntry);
}
