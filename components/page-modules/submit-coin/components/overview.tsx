import { Dispatch, FC, SetStateAction, useEffect } from 'react';

import { TSteps } from './multiple-step-form';

interface IStepProps {
  stepFrame: string;
  setStep: Dispatch<SetStateAction<TSteps>>;
}

const Overview: FC<IStepProps> = ({ stepFrame, setStep }) => {
  useEffect(() => {
    const type = stepFrame.split('_')[0];
    const step = Number(stepFrame.split('_')[1]);
    if (step === 4) return;
    if (type !== 'start') setStep(step as TSteps);
  }, [setStep, stepFrame]);
  return <div>Overview</div>;
};

export default Overview;
