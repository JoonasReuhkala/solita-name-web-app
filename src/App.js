import React, { Component } from "react"; 

import navigationElement  from './elements/navigationElement.jsx';
import dataElement        from './elements/dataElement.jsx';
import textElement        from './elements/textElement.jsx';
import imageElement       from './elements/imageElement.jsx';
import inputElement       from './elements/inputElement.jsx';
import buttonElement      from "./elements/buttonElement.jsx";

//import * as elements from './elements/ not possible? :(
import joonasNeutral from './Joonas-neutral.jpg';
import joonasHappy from './Joonas-happy.jpg';
import joonasSad from './Joonas-sad.jpg';

import apiInteractor from './apiInteractor';

const text = `Solita Dev Academy 2021 Exercise \n
created by Joonas Reuhkala,
professional stay at home dad
'in-between jobs'. This is a front-end of a MERN stack
application.
`

class App extends Component {
  
  state = { 
    key : 0,

    employeeAll: [],

    message: '',

    hasBeenHired: false,
    hasBeenSortedByName: false,
    hasBeenSortedByAmount: false,
    canReset: false,

    name: '',

    page: 0,
    maxPerPage: this.props.config.maxPerPage,

    potrait: joonasNeutral
  }; //TODO perhaps all this stuff could be stored somewhere else? state = new immutable object

  async componentDidMount() {
    this.reset();
  }

  render = () => (
    <div className="Container">
      <div className="Board Navigation">
        { navigationElement("NAME APP") }
      </div >
      <div className="Board Data">
        { buttonElement('Sorting', 
          { text: 'BY NAME', onClick: this.getEmployeeAllByName }, 
          { text: 'BY AMOUNT', onClick: this.getEmployeeAllByAmount }
        )}
        { dataElement(this.state.page, this.state.maxPerPage, this.state.employeeAll) }
        { buttonElement('Paging',
          { text: 'PREVIOUS', onClick: this.previousPage }, 
          { text: 'NEXT', onClick: this.nextPage }
        )}
      </div>
      <div className="Board Message">
        { buttonElement ('Top', 
          {text: "RESET", onClick: this.reset, state: this.state.canReset}, 
          {text: "TOTAL AMOUNT", onClick: this.getEmployeeTotalAmount, state: false }
          )}
        { textElement(this.state.message) }
        { inputElement(
          'SearchField', this.inputHandler, 
          { text: 'FIND', onClick: this.findEmployeeByName } 
        )}
      </div>
      <div className="Board Help">
        { textElement(text) }
        { imageElement(this.state.potrait) }
        { buttonElement ('Hiring', 
          {text: "HIRE JOONAS", onClick: this.hireJoonas, state: this.state.hasBeenHired}, 
          {text: "FIRE JOONAS", onClick: this.fireJoonas, state: !this.state.hasBeenHired}
        )}
      </div>
    </div>
  )


  //TODO stuff below messy, should move rest of the code to another module(s)

  getEmployeeAllByName = async () => {
    const key = this.state.key;
    const apiEndpoint = this.props.config.apiEndpoint
    const data = 
      await apiInteractor.getEmployeeAll(apiEndpoint, key);

    const employeeAll = data.names;
    const totalAmount = data.totalAmountOf;
    const message = "Sorted employee list by names.";
    this.setState({ employeeAll, totalAmount, message });
  }

  getEmployeeAllByAmount = async() => {
    const key = this.state.key;
    const apiEndpoint = this.props.config.apiEndpoint + "/byAmount";
    const data = 
      await apiInteractor.getEmployeeAll(apiEndpoint, key);

    const employeeAll = data.names;
    const totalAmount = data.totalAmountOf;
    const message = "Sorted employee list by amount.";
    this.setState({ employeeAll, totalAmount, message});
  }

  hireJoonas = async() => {
    const key = this.state.key;
    const apiEndpoint = this.props.config.apiEndpoint
    const data = 
      await apiInteractor.addEmployee(apiEndpoint, key);

    const employeeAll = data.names;
    const totalAmount = data.totalAmountOf;
    const message = "Joonas was hired! Heck yeah!";
    const hasBeenHired = true;
    const potrait = joonasHappy;
    this.setState({ employeeAll, totalAmount, message, hasBeenHired, potrait});
  }

  fireJoonas = async() => {
    const key = this.state.key;
    const apiEndpoint = this.props.config.apiEndpoint;
    const data = await apiInteractor.removeEmployee(apiEndpoint, key);

    const state = {
      employeeAll : data.names,
      totalAmount : data.totalAmountOf,
      message : "And then Joonas got fired...",
      hasBeenHired : false,
      potrait : joonasSad,
    }

    this.setState(state);
  }

  findEmployeeByName = async() => {
    const name = this.state.name;
    const key = this.state.key;
    const apiEndpoint = this.props.config.apiEndpoint;
    await apiInteractor.findEmployeeByName(apiEndpoint, name, key)
      .then( response => {
        const message = (response)
          ? `There is/are ${response.amount} ${response.name}(s) in the database.`
          : `There are no ${this.state.name} in the database.`;

        const state = {
          message: message,
          potrait : joonasNeutral,
        }
        this.setState(state)
      })
  }

  inputHandler = (event) => {
    this.setState({name: event.target.value}, () => {
       console.log(this.state.name);
    });
  }

  getEmployeeTotalAmount = async() => {
    const key = this.state.key;
    const apiEndpoint = this.props.config.apiEndpoint;
    const data = await apiInteractor.getEmployeeTotalAmount(apiEndpoint, key);
    
    console.log(data);

    const state = {
      message : `Total number of employees is ${data.totalAmountOf}.`,
      potrait : joonasNeutral,
    }

    this.setState( state );
  }

  reset = async() => {
    const newKey = new Date().getTime(); 
    const apiEndpoint = this.props.config.apiEndpoint;
    await apiInteractor.seedAndGetEmployeeAll(apiEndpoint, newKey)
    .then( data => {
      const state = {
        key : newKey,
        employeeAll : data.names,
        totalAmount : data.totalAmountOf,
        message : "Welcome, stranger!",
        
        hasBeenHired: false,
        hasBeenSortedByName: false,
        hasBeenSortedByAmount: false,
        canReset: false,
  
        page: 0,
        maxPerPage: this.props.config.maxPerPage,
  
        potrait: joonasNeutral
      }
  
      this.setState( state )
    });
  }

  nextPage = async () => {
    if ((this.state.page + 1) * this.state.maxPerPage > this.state.employeeAll.length) return;
    const newPage = this.state.page + 1;
    this.setState( { page : newPage } );
  }

  previousPage = async () => {
    if (this.state.page === 0) return;
    const newPage = this.state.page - 1;
    this.setState( { page : newPage } );
  }
}

export default App;