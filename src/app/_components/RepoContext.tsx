"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

interface RepoContextType {
  repo: string;
  setRepo: (repo: string) => void;
}

const RepoContext = createContext<RepoContextType>({ repo: "", setRepo: () => {} });

export function RepoProvider({ children }: { children: React.ReactNode }) {
  const [repo, setRepoState] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("crh-repo");
    if (saved) setRepoState(saved);
  }, []);

  const setRepo = useCallback((value: string) => {
    setRepoState(value);
    localStorage.setItem("crh-repo", value);
  }, []);

  return (
    <RepoContext.Provider value={{ repo, setRepo }}>
      {children}
    </RepoContext.Provider>
  );
}

export function useRepo() {
  return useContext(RepoContext);
}
