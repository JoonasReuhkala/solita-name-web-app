import apiInteractor from './apiInteractor';

import takeRandom from './helpers/takeRandom.js';

import joonasNeutral from './images/Joonas-neutral-small.jpg';
import joonasHappy from './images/Joonas-happy-small.jpg';
import joonasSad from './images/Joonas-sad-small.jpg';

const greetings = ["Welcome,", "Hello there,", "Greetings,"]
const person = [" stranger!", " fellow human being!", " mate!"]
const continuation = [" Take your time.", " Try clicking stuff.", " I can sort lists and find names."]

async function defaultState(config) {
  const newKey = new Date().getTime(); 

  const data = await apiInteractor.seedAndGetEmployeeAll(config.apiEndpoint, newKey);

  return {
    key : newKey,
    employeeAll : data.names,
    totalAmount : data.totalAmountOf,
    message : greetings.takeRandom() + " " + person.takeRandom() + continuation.takeRandom(), 
    
    hasBeenHired: false,
    hasBeenSortedByName: false,
    hasBeenSortedByAmount: false,
    canReset: false,

    page: 0,
    maxPerPage: config.maxPerPage,

    potrait: joonasNeutral
  };
}

async function allByName (state, apiEndpoint) {
  const data = 
    await apiInteractor.getEmployeeAll(apiEndpoint, state.key);

  return { 
    employeeAll : data.names, 
    totalAmount : data.totalAmount,
    message : "Sorted employee list by names.",
  };
}

async function allByAmount (state, apiEndpoint) {
  const data = 
    await apiInteractor.getEmployeeAllByAmount(apiEndpoint, state.key);

  return { 
    employeeAll : data.names, 
    totalAmount : data.totalAmount,
    message : "Sorted employee list by amount.",
  };
}

async function byName (state, apiEndpoint) {
  const data = 
    await apiInteractor.findEmployeeByName(apiEndpoint, state.name, state.key);

  return {
    message : data
        ? `There is/are ${data.amount} ${data.name}(s) in the database.`
        : `There are no ${state.name} in the database.`,
    potrait : joonasNeutral,
  };
}

async function hire (state, apiEndpoint) {
  const data = 
    await apiInteractor.addEmployee(apiEndpoint, state.key);

  return {
    employeeAll : data.names,
    totalAmount : data.totalAmountOf,
    message : "Joonas was hired! Heck yeah!",
    hasBeenHired : true,
    potrait :joonasHappy,
  };
}

async function fire (state, apiEndpoint) {
  const data = 
    await apiInteractor.removeEmployee(apiEndpoint, state.key);

  return {
    employeeAll : data.names,
    totalAmount : data.totalAmountOf,
    message : "And then Joonas got fired...",
    hasBeenHired : false,
    potrait : joonasSad,
  }
}

const stateReducer = {
  getEmployee: {
    allByName,
    allByAmount,
    byName,
  },
  employee: {
    hire,
    fire,
  },
  build: {
    defaultState,
  },
}

export default stateReducer;
