import { useState, useCallback } from 'react';
import { generatePrompt } from '../utils/promptGenerator';

export function usePromptBuilder() {
  const [projectType, setProjectType] = useState(null);
  const [formData, setFormData] = useState({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [step, setStep] = useState(1);

  const selectProjectType = useCallback((type) => {
    setProjectType(type);
    setFormData({});
    setGeneratedPrompt('');
    setStep(2);
  }, []);

  const submitForm = useCallback((data) => {
    setFormData(data);
    const prompt = generatePrompt(projectType, data);
    setGeneratedPrompt(prompt);
    setStep(3);
  }, [projectType]);

  const goBack = useCallback(() => {
    if (step > 1) {
      setStep(step - 1);
    }
  }, [step]);

  const reset = useCallback(() => {
    setProjectType(null);
    setFormData({});
    setGeneratedPrompt('');
    setStep(1);
  }, []);

  return {
    projectType,
    formData,
    generatedPrompt,
    step,
    selectProjectType,
    submitForm,
    goBack,
    reset
  };
}
