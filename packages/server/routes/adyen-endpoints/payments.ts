import { Request, Response, Router } from 'express';
import request from 'request-promise';
import { errorHandler } from '../helpers';
import { ADYEN_API_KEY, ADYEN_BASE_URL } from '../../config';

import type { InitializationRequest, RequestOptions } from './types';
import type { PaymentMethodsResponseInterface } from '@adyen/adyen-web/dist/types/types';

const router = Router();

router.post('/getPaymentMethods', async (req: Request, res: Response) => {
  const { version, apiKey, payload }: InitializationRequest = req.body;
  try {
    const options: RequestOptions = {
      url: `${ADYEN_BASE_URL}/${version}/paymentMethods`,
      headers: {
        'Content-type': 'application/json',
        'x-api-key': apiKey || ADYEN_API_KEY
      },
      body: payload,
      json: true
    };

    const response: PaymentMethodsResponseInterface = await request(options);
    res.send(201).json(response);
  } catch (err: any) {
    errorHandler('/getPaymentMethods', 500, err.message, res);
  }
});

router.post('/makePayment', async (req: Request, res: Response) => {
  const { version, apiKey, payload } = req.body;
  try {
    const options: RequestOptions = {
      url: `${ADYEN_BASE_URL}/${version}/payments`,
      headers: {
        'Content-type': 'application/json',
        'x-api-key': apiKey || ADYEN_API_KEY
      },
      body: payload,
      json: true
    };

    const response = await request(options);
    res.send(201).json(response);
  } catch (err: any) {
    errorHandler('/makePayment', 500, err.message, res);
  }
});

router.post('/additionalDetails', async (req: Request, res: Response) => {
  const { version, apiKey, payload } = req.body;
  try {
    const options: RequestOptions = {
      url: `${ADYEN_BASE_URL}/${version}/payments/details`,
      headers: {
        'Content-type': 'application/json',
        'x-api-key': apiKey || ADYEN_API_KEY
      },
      body: payload,
      json: true
    };

    const response = await request(options);
    res.send(201).json(response);
  } catch (err: any) {
    errorHandler('/additionalDetails', 500, err.message, res);
  }
});

export { router };
