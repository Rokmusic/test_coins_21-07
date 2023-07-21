import { Dispatch, FC, SetStateAction, useEffect } from 'react';

import { TSteps } from './multiple-step-form';

interface IStepProps {
  stepFrame: string;
  setStep: Dispatch<SetStateAction<TSteps>>;
}

const AddLinks: FC<IStepProps> = ({ stepFrame, setStep }) => {
  useEffect(() => {
    const type = stepFrame.split('_')[0];
    const step = Number(stepFrame.split('_')[1]);
    if (step === 3) return;
    if (type !== 'start') setStep(step as TSteps);
  }, [setStep, stepFrame]);
  return <div>AddLinks</div>;
};

export default AddLinks;
