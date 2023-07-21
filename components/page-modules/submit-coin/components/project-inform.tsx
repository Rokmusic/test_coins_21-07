'use client';

import React, { FC, useEffect, Dispatch, SetStateAction, useState } from 'react';

import { Dropdown, DropdownChangeEvent, DropdownProps } from 'primereact/dropdown';

import { TSteps } from './multiple-step-form';

import styles from './multiple-spep-form.module.css';

import binanceIcon from '@/public/binance.svg';
import etheriumIcon from '@/public/etherium.svg';

interface IStepProps {
  stepFrame: string;
  setStep: Dispatch<SetStateAction<TSteps>>;
}

interface IDataProject {
  blockchain: TBlockchain;
}

const blockchains = [
  {
    name: 'Binance1',
    icon: (
      <span className={styles.optionImage} style={{ backgroundImage: `url(${binanceIcon.src})` }} />
    ),
  },
  {
    name: 'Binance2',
    icon: (
      <span className={styles.optionImage} style={{ backgroundImage: `url(${binanceIcon.src})` }} />
    ),
  },
  {
    name: 'Binance3',
    icon: (
      <span className={styles.optionImage} style={{ backgroundImage: `url(${binanceIcon.src})` }} />
    ),
  },
  {
    name: 'etherium1',
    icon: (
      <span
        className={styles.optionImage}
        style={{ backgroundImage: `url(${etheriumIcon.src})` }}
      />
    ),
  },
  {
    name: 'etherium2',
    icon: (
      <span
        className={styles.optionImage}
        style={{ backgroundImage: `url(${etheriumIcon.src})` }}
      />
    ),
  },
  {
    name: 'etherium3',
    icon: (
      <span
        className={styles.optionImage}
        style={{ backgroundImage: `url(${etheriumIcon.src})` }}
      />
    ),
  },
];

interface TBlockchain {
  name: string;
  icon: React.ReactNode | null;
}

const ProjectInform: FC<IStepProps> = ({ stepFrame, setStep }) => {
  const [dataProject, setDataProject] = useState<IDataProject>({
    blockchain: blockchains[0],
  });
  useEffect(() => {
    const type = stepFrame.split('_')[0];
    const step = Number(stepFrame.split('_')[1]);
    if (step === 2) return;
    if (type === 'back') setStep(step as TSteps);
    if (type === 'next') setStep(step as TSteps);
  }, [setStep, stepFrame]);

  const onChangeHandler = (type: string, data: TBlockchain) => {
    if (data.icon) {
      setDataProject((prev) => {
        prev[type as keyof IDataProject].name = data.name;
        prev[type as keyof IDataProject].icon = data.icon;
        return prev;
      });
    }
    setDataProject((prev) => {
      prev[type as keyof IDataProject] = data;
      return prev;
    });
  };

  const selectedCountryTemplate = (option: TBlockchain, props: DropdownProps) => {
    if (dataProject.blockchain.icon) {
      return (
        <div className={styles.option}>
          <span>{dataProject.blockchain.icon}</span>
          <span>{dataProject.blockchain.name}</span>
        </div>
      );
    }
    if (option) {
      return (
        <div className={styles.option}>
          {/* <span>{option.icon}</span> */}
          <span>{option.name}</span>
        </div>
      );
    }
    return <div className={styles.option}>{props.placeholder}</div>;
  };

  const countryOptionTemplate = (option: TBlockchain) => {
    if (option) {
      return (
        <div className={styles.option}>
          <span>{option.icon}</span>
          <span>{option.name}</span>
        </div>
      );
    }
  };
  return (
    <div>
      <form>
        <Dropdown
          dataKey="name"
          value={dataProject.blockchain}
          onChange={(e: DropdownChangeEvent) => onChangeHandler('blockchain', e.value)}
          options={blockchains}
          optionLabel="icon"
          placeholder="Blockchain"
          valueTemplate={selectedCountryTemplate}
          itemTemplate={countryOptionTemplate}
          className="no-scrollbar"
        />
      </form>
    </div>
  );
};

export default ProjectInform;
