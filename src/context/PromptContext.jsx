import { createContext, useContext, useReducer, useEffect } from 'react';

const PromptContext = createContext(null);

const STORAGE_KEY = 'prompter-history';

const initialState = {
  projectType: null,
  formData: {},
  history: []
};

function loadHistoryFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveHistoryToStorage(history) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Failed to save history:', error);
  }
}

function promptReducer(state, action) {
  switch (action.type) {
    case 'SET_PROJECT_TYPE':
      return {
        ...state,
        projectType: action.payload,
        formData: {}
      };

    case 'SET_FORM_DATA':
      return {
        ...state,
        formData: action.payload
      };

    case 'SAVE_TO_HISTORY': {
      const newHistory = [action.payload, ...state.history].slice(0, 50);
      saveHistoryToStorage(newHistory);
      return {
        ...state,
        history: newHistory
      };
    }

    case 'DELETE_FROM_HISTORY': {
      const newHistory = state.history.filter(item => item.id !== action.payload);
      saveHistoryToStorage(newHistory);
      return {
        ...state,
        history: newHistory
      };
    }

    case 'CLEAR_HISTORY':
      saveHistoryToStorage([]);
      return {
        ...state,
        history: []
      };

    case 'LOAD_HISTORY':
      return {
        ...state,
        history: action.payload
      };

    case 'RESET':
      return {
        ...state,
        projectType: null,
        formData: {}
      };

    default:
      return state;
  }
}

export function PromptProvider({ children }) {
  const [state, dispatch] = useReducer(promptReducer, initialState);

  useEffect(() => {
    const history = loadHistoryFromStorage();
    dispatch({ type: 'LOAD_HISTORY', payload: history });
  }, []);

  return (
    <PromptContext.Provider value={{ state, dispatch }}>
      {children}
    </PromptContext.Provider>
  );
}

export function usePrompt() {
  const context = useContext(PromptContext);
  if (!context) {
    throw new Error('usePrompt must be used within a PromptProvider');
  }
  return context;
}
