import * as React from 'react';
import { useEffect, useState } from 'react';
import { getClientConfiguration_Response } from '../../helpers/payloadSamples';
import EditOptions from './EditOptions';

const OptionalConfig = (props: any) => {
  const { configuration, setConfiguration } = props;
  const { optionalConfiguration } = configuration;
  const [configDictionary, setConfigDictionary]: any = useState({});

  useEffect(() => {
    if (typeof configuration === 'object') {
      addConfigurationList(getClientConfiguration_Response);
    }
  }, []);

  const addConfigurationList = (payload: any) => {
    let updateOptionalConfigurations: any = {};
    for (const property in payload) {
      if (!configuration[property]) {
        updateOptionalConfigurations[property] = new Object();
      }
    }
    updateOptionalConfigurations = {...configuration, ...updateOptionalConfigurations};
    setConfiguration(updateOptionalConfigurations);
    setConfigDictionary(payload);
  };
  if (Object.keys(configDictionary).length > 0 && typeof configDictionary === 'object') {
    return (
      <React.Fragment>
        {Object.keys(configDictionary).map((category: any, i: any) => (
          <EditOptions
            configDictionary={{ [category]: configDictionary[category] }}
            configuration={configuration}
            setConfiguration={setConfiguration}
            key={i}
          />
        ))}
      </React.Fragment>
    );
  }

  return <React.Fragment>Loading...</React.Fragment>;
};

export default OptionalConfig;
