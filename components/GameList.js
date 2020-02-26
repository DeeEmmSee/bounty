import React, { Component, Fragment } from "react";
import { GetAPIFunctions } from '../library/common';
//import PropTypes from "prop-types";

class GameList extends Component {

  constructor(props) {
    super(props);

    let api = GetAPIFunctions();

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: "",
      suggestions: [],
      selectedGame: {},
      api: api
    };

    this.GetGames();
  }

  GetGames() {
    this.state.loaded = false;
    let ra = this;

    this.state.api.GetGameList()
      .then(res => {
        ra.setState((state) => { return { suggestions: res.data, loaded: true } });
      })
      .catch(err => {
        console.log(err);
        ra.setState({ loaded: true });
      });
  }

  // Event fired when the input value is changed
  onChange = e => {
    const { suggestions } = this.state;
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.Name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    // Update the user input and filtered suggestions, reset the active suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  // Event fired when the user clicks on a suggestion
  onClick = e => {
    let selection = this.state.suggestions.find((game) => { return game.Name === e.currentTarget.innerText; });

    this.props.selectedCallback(selection);

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText,
      selectedGame: selection
    });
  };

  // Event fired when the user presses a key down
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the suggestions
    if (e.keyCode === 13) {
      this.props.selectedCallback(filteredSuggestions[activeSuggestion]);

      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion].Name,
        selectedGame: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li
                  className={className}
                  key={suggestion.ID}
                  onClick={onClick}
                >
                  {suggestion.Name}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div class="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }

    return (
      <Fragment>
        <input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          className="form-control"
          placeholder="Start typing a game name..."
        />
        {suggestionsListComponent}
      </Fragment>
    );
  }
}

export default GameList;