import { createContext, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

const PromptContext = createContext(null);

const STORAGE_KEY = 'prompter-history';

const initialState = {
  projectType: null,
  formData: {},
  history: [],
  editingId: null
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
        history: newHistory,
        editingId: null
      };
    }

    case 'UPDATE_IN_HISTORY': {
      const newHistory = state.history.map(item =>
        item.id === action.payload.id
          ? { ...action.payload, updatedAt: new Date().toISOString() }
          : item
      );
      saveHistoryToStorage(newHistory);
      return {
        ...state,
        history: newHistory,
        editingId: null
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

    case 'EDIT_PROMPT': {
      const item = state.history.find(h => h.id === action.payload);
      if (!item) return state;
      return {
        ...state,
        projectType: item.projectType,
        formData: item.formData,
        editingId: item.id
      };
    }

    case 'CANCEL_EDIT':
      return {
        ...state,
        projectType: null,
        formData: {},
        editingId: null
      };

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
        formData: {},
        editingId: null
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

PromptProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export function usePrompt() {
  const context = useContext(PromptContext);
  if (!context) {
    throw new Error('usePrompt must be used within a PromptProvider');
  }
  return context;
}
