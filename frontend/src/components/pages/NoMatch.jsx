import React from 'react';
import { useTranslation } from 'react-i18next';

const NoMatch = () => {
  const { t } = useTranslation();
  return (
    <div style={{ margin: '100px auto' }}>
      <h1 style={{ textAlign: 'center' }}>{t('404')}</h1>
    </div>
  );
};

export default NoMatch;
