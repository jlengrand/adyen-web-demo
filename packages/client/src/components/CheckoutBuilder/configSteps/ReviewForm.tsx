import { Grid, Box, Divider, Button } from '@mui/material';
import JSONInput from 'react-json-editor-ajrm';
import { dark_vscode_tribute, localeEn } from '../../../helpers/jsonEditor';
import ComponentBase from '../../ComponentBase/ComponentBase';
import { NavButtons } from './NavButtons';
import React from 'react';

type ReviewFormProps = {
  configuration: object;
  step: number;
  setActiveStep: (step: number) => void;
};

export const ReviewForm = ({ configuration, step, setActiveStep }: ReviewFormProps) => {
  return (
    <React.Fragment>
      <Grid mt={2} container>
        <Grid item xs={8}>
          <ComponentBase />
        </Grid>
      </Grid>
      <Grid
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
        container
        sx={{ position: 'fixed', top: 0, right: 0, height: '100vh', bgcolor: 'secondary.main', width: '25%' }}
      >
        <Grid item xs={10} sx={{ height: '90%' }}>
          <JSONInput viewOnly={true} placeholder={configuration} colors={dark_vscode_tribute} locale={localeEn} height="100%" width="100%" />
        </Grid>
        <Grid item xs={1}>
          <Grid p={1} sx={{ height: '100%' }} direction="row" container justifyContent="space-between" alignItems="flex-end">
            <Grid item>
              <Button variant="contained">Edit</Button>
            </Grid>
            <Grid item>
              <NavButtons step={step} setActiveStep={setActiveStep} configuration={configuration} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
