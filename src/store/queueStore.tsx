import { createContext, useContext, useReducer, ReactNode } from "react";

interface QueuePatient {
  id: number;
  name: string;
  number: number;
  priority: boolean;
}

interface QueueState {
  currentServing: number;
  waitingCount: number;
  priorityQueue: QueuePatient[];
  regularQueue: QueuePatient[];
}

type QueueAction =
  | { type: "CALL_NEXT" }
  | { type: "ADD_PRIORITY"; patient: QueuePatient }
  | { type: "ADD_REGULAR"; patient: QueuePatient }
  | { type: "MARK_SERVED"; id: number }
  | { type: "RESET" };

const initialState: QueueState = {
  currentServing: 0,
  waitingCount: 0,
  priorityQueue: [],
  regularQueue: [],
};

function queueReducer(state: QueueState, action: QueueAction): QueueState {
  switch (action.type) {
    case "CALL_NEXT": {
      const next = state.priorityQueue[0] ?? state.regularQueue[0];
      if (!next) return state;
      return {
        ...state,
        currentServing: next.number,
        priorityQueue: state.priorityQueue.filter((q) => q.id !== next.id),
        regularQueue: state.regularQueue.filter((q) => q.id !== next.id),
        waitingCount: Math.max(0, state.waitingCount - 1),
      };
    }
    case "ADD_PRIORITY":
      return { ...state, priorityQueue: [...state.priorityQueue, action.patient], waitingCount: state.waitingCount + 1 };
    case "ADD_REGULAR":
      return { ...state, regularQueue: [...state.regularQueue, action.patient], waitingCount: state.waitingCount + 1 };
    case "MARK_SERVED":
      return {
        ...state,
        priorityQueue: state.priorityQueue.filter((q) => q.id !== action.id),
        regularQueue: state.regularQueue.filter((q) => q.id !== action.id),
        waitingCount: Math.max(0, state.waitingCount - 1),
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

interface QueueContextValue extends QueueState {
  callNext: () => void;
  addPriority: (patient: QueuePatient) => void;
  addRegular: (patient: QueuePatient) => void;
  markServed: (id: number) => void;
  reset: () => void;
}

const QueueContext = createContext<QueueContextValue | null>(null);

export function QueueProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(queueReducer, initialState);

  const callNext = () => dispatch({ type: "CALL_NEXT" });
  const addPriority = (patient: QueuePatient) => dispatch({ type: "ADD_PRIORITY", patient });
  const addRegular = (patient: QueuePatient) => dispatch({ type: "ADD_REGULAR", patient });
  const markServed = (id: number) => dispatch({ type: "MARK_SERVED", id });
  const reset = () => dispatch({ type: "RESET" });

  return (
    <QueueContext.Provider value={{ ...state, callNext, addPriority, addRegular, markServed, reset }}>
      {children}
    </QueueContext.Provider>
  );
}

export function useQueueStore(): QueueContextValue {
  const ctx = useContext(QueueContext);
  if (!ctx) throw new Error("useQueueStore must be used inside QueueProvider");
  return ctx;
}
