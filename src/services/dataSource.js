import { MOCK } from '@/constants/dataSourceTypes';
import mockGetPayments from '@/mocks/getPayments';
import api from '@/api';

export default {
  getPayments(params) {
    switch (process.env.VUE_APP_DATA_SOURCE_TYPE) {
      case MOCK:
        return mockGetPayments(params);
      default:
        return api.getPayments(params);
    }
  },
};
