import * as axios from 'axios';
import { Axconfig } from '../nuovo/api';
export declare const customAxios: ({ baseUrl, apiKey }: Axconfig) => axios.Axios;
