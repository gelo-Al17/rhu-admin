import { createContext, useContext, useReducer, ReactNode } from "react";
import type { User } from "../types";

interface AuthState {
  user: Omit<User, "id" | "joined" | "phone"> | null;
  isAuthenticated: boolean;
}

type AuthAction =
  | { type: "LOGIN"; user: AuthState["user"] }
  | { type: "LOGOUT" }
  | { type: "UPDATE_PROFILE"; data: Partial<AuthState["user"]> };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return { user: action.user, isAuthenticated: true };
    case "LOGOUT":
      return initialState;
    case "UPDATE_PROFILE":
      if (!state.user) return state;
      return { ...state, user: { ...state.user, ...action.data } };
    default:
      return state;
  }
}

interface AuthContextValue extends AuthState {
  login: (user: AuthState["user"]) => void;
  logout: () => void;
  updateProfile: (data: Partial<AuthState["user"]>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (user: AuthState["user"]) => dispatch({ type: "LOGIN", user });
  const logout = () => dispatch({ type: "LOGOUT" });
  const updateProfile = (data: Partial<AuthState["user"]>) => dispatch({ type: "UPDATE_PROFILE", data });

  return (
    <AuthContext.Provider value={{ ...state, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
