import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import React, { Fragment } from 'react';
import JSONInput from 'react-json-editor-ajrm';
import type { OnDeckPropType } from '../../../app/types';
import { dark_vscode_tribute, localeEn } from '../../../helpers/jsonEditor';
import { Content } from './Content';
import { NavButtons } from './NavButtons';

interface ProfileFormProps {
  configuration: OnDeckPropType;
  step: number;
  action: any;
  updateStore: (value: any, action: ActionCreatorWithPayload<any>) => void;
  setActiveStep: (step: number) => void;
}

const content = {
  title: 'Profile',
  version: 'Web Components/Drop-in v5.19.0',
  description:
    'The SDK instance accepts parameters related to itself. You must set global or component-specific configuration either on the locally on the main instance, globally through the AdyenCheckout , or in API request. Create and store a configuration profile for future use.'
};

export const ProfileForm = ({ configuration, step, setActiveStep, action, updateStore }: ProfileFormProps) => {
  const handleChange = (e: any) => {
    updateStore({ [e.target.name]: e.target.value }, action);
  };

  return (
    <Fragment>
      <Content title={content.title} version={content.version} description={content.description} />
      <Grid spacing={1} mt={2} container>
        <Grid item xs={7}>
          <TextField
            sx={{ borderRadius: '0' }}
            id="profileName"
            name="name"
            label="Name"
            fullWidth
            value={configuration.name}
            onChange={handleChange}
          />
          <FormHelperText>Required</FormHelperText>
        </Grid>
        <Grid item xs={7}>
          <FormControl fullWidth>
            <InputLabel>Product</InputLabel>
            <Select
              sx={{ width: '100%', borderRadius: '0', borderColor: '#0066ff', color: '#0066ff' }}
              labelId="product-select-label"
              id="product-select"
              name="product"
              value={configuration.product}
              onChange={handleChange}
              label="Product"
              defaultValue="dropin"
            >
              <MenuItem value={'dropin'}>dropin</MenuItem>
            </Select>
          </FormControl>
          <FormHelperText>Required</FormHelperText>
        </Grid>
      </Grid>
      <Grid
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
        container
        sx={{ position: 'fixed', top: 0, right: 0, height: '100vh', bgcolor: 'secondary.main', width: '28%' }}
      >
        <Grid item xs={10} sx={{ height: '90%' }}>
          <JSONInput viewOnly={true} placeholder={configuration} colors={dark_vscode_tribute} locale={localeEn} height="100%" width="100%" />
        </Grid>
        <Grid item xs={1}>
          <Grid p={1} sx={{ height: '100%' }} direction="row" container justifyContent="flex-end" alignItems="flex-end">
            <Grid item>
              <NavButtons step={step} setActiveStep={setActiveStep} configuration={configuration} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};
