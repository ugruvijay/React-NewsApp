import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';
import { Redirect } from 'react-router-dom'
import _ from "lodash";

type State = {
  inputValue: string,
};

const loadOptions = (inputValue, callback) => {
  let res = get_suggestions(inputValue)
  res.then(function(result) {
    callback(result);
  })
};

const get_suggestions = async(q) => {  
  try {
    const response = await fetch(
        'https://autosearch-vijay.cognitiveservices.azure.com/bing/v7.0/suggestions?mkt=en-US&q=' + q,
        {
          headers: {
            "Ocp-Apim-Subscription-Key": "92838e8248854910b0a0dbf6336819b2"
          }
        }
      );
      const data = await response.json();
      const results = renderSearchResults(data, q);
      return results;
    } catch (error) {
      console.error('Error fetching search');
    }
};

const renderSearchResults = (results, query) => {
  let i = 0;
  let options = [];
  let searchResults = results.suggestionGroups[0].searchSuggestions;
  let defaultOption = {'value': query, 'label': query}
  options.push(defaultOption)
  for(i = 0; i < searchResults.length; i++){
    if(searchResults[i].displayText === query)
      continue;
    let option = {'value': searchResults[i].displayText, 'label': searchResults[i].displayText};
    options.push(option);
  }
  return options;
}

export default class WithCallbacks extends Component<*, State> {
  state = { inputValue: '', isSelected:false };

  handleInputChange = (newValue: string) => {
    const input = newValue.replace(/\W/g, '');
    this.setState({ 
      inputValue: input,
      isSelected:false
    });
    return input;
  };

  handleSelectionChange = (selectedValue : string) => {
    console.log(selectedValue)
    this.setState({
      inputValue:selectedValue.value,
      isSelected:true
    })
  };

  // componentWillReceiveProps(nextProps){
  //   console.log("with call backs componentWillReceiveProps " + nextProps)
  //   this.setState((state) => { 
  //     return {
  //     inputValue: this.props.resetText === true ? "": state.inputValue,
  //     isSelected: state.isSelected
  //   };
  // })
  // }

  noOptionsMessage(){
    return "No match"
  }

  render() {
    if(this.state.isSelected){
      return (
          <div style={{width:"300px"}}>
          <AsyncSelect
            value={this.state.inputValue}
            loadOptions={_.debounce(loadOptions, 1000)}
            onInputChange={_.debounce(this.handleInputChange, 1500)}
            onChange={this.handleSelectionChange}
            noOptionsMessage={this.noOptionsMessage}
            placeholder={"Enter keyword.."}
          />
           <Redirect to={{ pathname:'/search', 
              state: {
                query: this.state.inputValue
              }
            }}/>
        </div>
         
        )
    }
  
    return (
      <div style={{width:"300px"}}>
        <AsyncSelect
          value={this.props.resetText ? "": this.state.inputValue}
          loadOptions={_.debounce(loadOptions, 1000)}
          onInputChange={_.debounce(this.handleInputChange, 1500)}
          onChange={this.handleSelectionChange}
          noOptionsMessage={this.noOptionsMessage}
          placeholder={"Enter keyword.."}
        />
      </div>
    );
  }
}
