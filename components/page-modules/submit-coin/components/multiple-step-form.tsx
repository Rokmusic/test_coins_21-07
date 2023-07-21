'use client';

import { FC, useState } from 'react';

import styles from './multiple-spep-form.module.css';

import UploadImage from './upload-image';
import ProjectInform from './project-inform';
import AddLinks from './add-links';
import Overview from './overview';

import minusSquare from '@/public/minus-square.svg';
import emptyLogoContainer from '@/public/empty-logo.svg';
import defaultLogo from '@/public/default-logo.svg';

export type TSteps = 1 | 2 | 3 | 4;

const headlines = [
  {
    id: 1,
    headline: 'Upload coin logo',
  },
  {
    id: 2,
    headline: 'Project information',
  },
  {
    id: 3,
    headline: 'Add Linnks',
  },
  {
    id: 4,
    headline: 'Overview',
  },
];

const MultiStepFormContainer: FC = () => {
  const [step, setStep] = useState<TSteps>(1);
  const [stepFrame, setStepFrame] = useState<string>('start');
  const [fileObject, setFileObject] = useState<{ url: string; name: string }>({
    url: defaultLogo.src,
    name: '',
  });

  const onClickButtonHandler = (typeWithStep: string) => {
    setStepFrame(typeWithStep);
  };

  const getButtonStatus = () => {
    const status = (step === 1 && fileObject.name) || step === 2 || step === 3;
    return !status;
  };

  return (
    <section className={styles.container}>
      <h1>Submit Coin</h1>
      <div className={styles.headlinesContainer}>
        {headlines.map((item) => {
          const active = item.id === step;
          return (
            <div key={item.id} className={`${styles.headlineBlock} ${active ? styles.active : ''}`}>
              <span>{item.id}</span>
              <h3>{item.headline}</h3>
            </div>
          );
        })}
      </div>
      <div className={styles.logoContainer}>
        <div
          className={styles.logoBack}
          style={{ backgroundImage: `url(${emptyLogoContainer.src})` }}
        >
          <img
            className={styles.logoImage}
            alt="logo"
            role="presentation"
            src={fileObject.url || defaultLogo.src}
          />
          <span className={styles.resolution}>256x256</span>
        </div>
        <div className={styles.logoNameContainer}>
          {fileObject.url && fileObject.name && (
            <button
              type="button"
              className={styles.removeBtn}
              onClick={() => setFileObject({ url: defaultLogo.src, name: '' })}
            >
              <img src={minusSquare.src} alt="remove" />
            </button>
          )}
          <span>
            {fileObject.url ? fileObject.name : 'Optimal dimensions 512x512px, size up to 1MB'}
          </span>
        </div>
      </div>
      {step === 1 && (
        <UploadImage
          stepFrame={stepFrame}
          setStep={setStep}
          setFileObject={setFileObject}
          fileObject={fileObject}
        />
      )}
      {step === 2 && <ProjectInform stepFrame={stepFrame} setStep={setStep} />}
      {step === 3 && <AddLinks stepFrame={stepFrame} setStep={setStep} />}
      {step === 4 && <Overview stepFrame={stepFrame} setStep={setStep} />}
      <div className={styles.controls}>
        {step === 1 ? (
          ''
        ) : (
          <button onClick={() => onClickButtonHandler(`back_${step - 1}`)}>Back</button>
        )}
        {step === 4 ? (
          <button>Submit Coin</button>
        ) : (
          <button
            className={styles.controlsNext}
            onClick={() => onClickButtonHandler(`next_${step + 1}`)}
            disabled={getButtonStatus()}
          >
            Continue
          </button>
        )}
      </div>
    </section>
  );
};

export default MultiStepFormContainer;
