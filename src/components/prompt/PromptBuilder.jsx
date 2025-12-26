import { useState } from 'react';
import { usePrompt } from '../../context/PromptContext';
import ProjectTypeSelector from '../project-types/ProjectTypeSelector';
import MobileAppForm from '../project-types/MobileAppForm';
import WebAppForm from '../project-types/WebAppForm';
import ApiForm from '../project-types/ApiForm';
import DesktopAppForm from '../project-types/DesktopAppForm';
import PromptPreview from './PromptPreview';
import { Button } from '../common';
import './PromptBuilder.css';

const PROJECT_FORMS = {
  mobile: MobileAppForm,
  web: WebAppForm,
  api: ApiForm,
  desktop: DesktopAppForm
};

export default function PromptBuilder() {
  const { state, dispatch } = usePrompt();
  const [step, setStep] = useState(1);

  const handleProjectTypeSelect = (type) => {
    dispatch({ type: 'SET_PROJECT_TYPE', payload: type });
    setStep(2);
  };

  const handleFormSubmit = (formData) => {
    dispatch({ type: 'SET_FORM_DATA', payload: formData });
    setStep(3);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
    setStep(1);
  };

  const ProjectForm = PROJECT_FORMS[state.projectType];

  return (
    <div className="prompt-builder">
      <div className="builder-progress">
        <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
          <span className="step-number">1</span>
          <span className="step-label">Project Type</span>
        </div>
        <div className="progress-line" />
        <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
          <span className="step-number">2</span>
          <span className="step-label">Details</span>
        </div>
        <div className="progress-line" />
        <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
          <span className="step-number">3</span>
          <span className="step-label">Generate</span>
        </div>
      </div>

      <div className="builder-content">
        {step === 1 && (
          <ProjectTypeSelector onSelect={handleProjectTypeSelect} />
        )}

        {step === 2 && ProjectForm && (
          <div className="form-container">
            <Button variant="outline" size="small" onClick={handleBack}>
              Back
            </Button>
            <ProjectForm onSubmit={handleFormSubmit} />
          </div>
        )}

        {step === 3 && (
          <div className="preview-container">
            <Button variant="outline" size="small" onClick={handleBack}>
              Back
            </Button>
            <PromptPreview />
            <div className="preview-actions">
              <Button variant="secondary" onClick={handleReset}>
                Start Over
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
