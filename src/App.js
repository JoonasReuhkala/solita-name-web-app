import React, { Component } from "react"; 

import navigationElement  from './elements/navigationElement.jsx';
import dataElement        from './elements/dataElement.jsx';
import textElement        from './elements/textElement.jsx';
import imageElement       from './elements/imageElement.jsx';
import inputElement       from './elements/inputElement.jsx';
import buttonElement      from "./elements/buttonElement.jsx";

//import * as elements from './elements/ not possible? :(

import stateReducer from './stateReducer';

const text = `Solita Dev Academy 2021 Exercise \n
created by Joonas Reuhkala,
professional stay at home dad
'in-between jobs'. This is a front-end of a MERN stack
application.
`

class App extends Component {
  
  state = {
    key : 0,
    employeeAll : [],
    totalAmount : 0,
    message : "",
    
    hasBeenHired: false,
    hasBeenSortedByName: false,
    hasBeenSortedByAmount: false,
    canReset: false,

    page: 0,
    maxPerPage: this.props.config.maxPerPage,

    potrait: null
  }

  async componentDidMount() {
    const startState = await stateReducer.build.defaultState(this.props.config);
    this.setState(startState);
  }

  render = () => (
    <div className="Container">
      <div className="Board Navigation">
        { navigationElement("NAME APP") }
      </div >
      <div className="Board Data">
        { buttonElement('Sorting', 
          { text: 'BY NAME', onClick: this.updateState(this.action.sortByName) },
          { text: 'BY AMOUNT', onClick: this.updateState(this.action.sortByAmount) },
        )}
        { dataElement(this.state.page, this.state.maxPerPage, this.state.employeeAll) }
        { buttonElement('Paging',
          { text: 'PREVIOUS', onClick: this.previousPage }, 
          { text: 'NEXT', onClick: this.nextPage }
        )}
      </div>
      <div className="Board Message">
        { buttonElement ('Top', 
          {text: "RESET", onClick: this.updateState(this.action.resetAll), state: this.state.canReset}, 
          {text: "TOTAL AMOUNT", onClick: this.getEmployeeTotalAmount, state: false }
          )}
        { textElement(this.state.message) }
        { inputElement(
          'SearchField', this.inputHandler, 
          { text: 'FIND', onClick: this.updateState(this.action.findTarget) } 
        )}
      </div>
      <div className="Board Help">
        { textElement(text) }
        { imageElement(this.state.potrait) }
        { buttonElement ('Hiring', 
          {text: "HIRE JOONAS", onClick: this.updateState(this.action.hireEmployee), state: this.state.hasBeenHired}, 
          {text: "FIRE JOONAS", onClick: this.updateState(this.action.fireEmployee), state: !this.state.hasBeenHired}
        )}
      </div>
    </div>
  )

  action = {
    resetAll : () => stateReducer.build.defaultState(this.props.config),
    sortByName : () => stateReducer.getEmployee.allByName(this.state, this.props.config.apiEndpoint),
    sortByAmount : () => stateReducer.getEmployee.allByAmount(this.state, this.props.config.apiEndpoint),
    findTarget : () => stateReducer.getEmployee.byName(this.state, this.props.config.apiEndpoint),
    hireEmployee : () => stateReducer.employee.hire(this.state, this.props.config.apiEndpoint),
    fireEmployee : () => stateReducer.employee.fire(this.state, this.props.config.apiEndpoint),
  }

  updateState = (action) => {
    return async () => {
      console.log(action.name);
      const newState = await action();
      this.setState(newState);
    }
  }

  inputHandler = (event) => {
    this.setState({name: event.target.value}, () => {
       console.log(this.state.name);
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