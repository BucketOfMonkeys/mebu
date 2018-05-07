import axios from 'axios';

const GET_RESIDENTS = 'GET_RESIDENTS';
const GET_RESIDENTS_BY_UNIT_ID = 'GET_RESIDENTS_BY_UNIT_ID';
const CREATE_RESIDENT = 'CREATE_RESIDENT';
const GET_BILLS = 'GET_BILLS';
const GET_BILLING_HISTORY = 'GET_BILLING_HISTORY';

const initialState = {
  residents: [],
  bills: [],
  billingHistory: [],
  loading: false,
  error: false,
};

export default function propertyReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_RESIDENTS}_PENDING`:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case `${GET_RESIDENTS}_FULFILLED`:
      return {
        ...state,
        residents: action.payload,
        loading: false,
        error: false,
      };
    case `${GET_RESIDENTS_BY_UNIT_ID}_PENDING`:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case `${GET_RESIDENTS_BY_UNIT_ID}_FULFILLED`:
      return {
        ...state,
        residents: action.payload,
        loading: false,
        error: false,
      };
    case `${CREATE_RESIDENT}_PENDING`:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case `${CREATE_RESIDENT}_FULFILLED`:
      return {
        ...state,
        loading: false,
        error: false,
      };

    case `${GET_BILLS}_PENDING`:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case `${GET_BILLS}_FULFILLED`:
      return {
        ...state,
        bills: action.payload,
        loading: false,
        error: false,
      };

    case `${GET_BILLING_HISTORY}_PENDING`:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case `${GET_BILLING_HISTORY}_FULFILLED`:
      return {
        ...state,
        billingHistory: action.payload,
        loading: false,
        error: false,
      };

    default:
      return state;
  }
}

export function getResidents(propertyId) {
  return {
    type: GET_RESIDENTS,
    payload: axios
      .get(`/residents/getResidents/${propertyId}`)
      .then((response) => {
        console.log(response.data);
        return response.data.residents;
      })
      .catch(err => err),
  };
}

export function getResidentsByUnitId(unitid) {
  return {
    type: GET_RESIDENTS_BY_UNIT_ID,
    payload: axios
      .get(`/residents/getResidentsByUnit/${unitid}`)
      .then((response) => {
        console.log(response.data);
        return response.data.residents;
      })
      .catch(err => err),
  };
}

export function addResident(obj) {
  return {
    type: CREATE_RESIDENT,
    payload: axios
      .post('/users/add', obj)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch(err => err),
  };
}

export function getBills() {
  return {
    type: GET_BILLS,
    payload: axios
      .get('/bills/getUnpaid')
      .then(response => response.data)
      .catch(err => err),
  };
}

export function getBillingHistory() {
  return {
    type: GET_BILLING_HISTORY,
    payload: axios
      .get('/bills/getBillingHistory')
      .then(response => response.data)
      .catch(err => err),
  };
}
