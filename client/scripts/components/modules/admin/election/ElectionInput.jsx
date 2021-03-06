'use-strict';

var React = require('react');
var ElectionActions = require('../../../../actions/ElectionActions');
var ElectionStore = require('../../../../stores/ElectionStore');
var DatePicker = require('react-date-picker');
var _ = require('underscore');

var ElectionInput = React.createClass({
  handleChange: function(event) {
    var value;
    if ( this.props.type === 'checkbox' || this.props.type === 'radio' ) {
      value = event.target.checked;
    } else {
      value = event.target.value;
    }
    ElectionActions.changeElectionData( this.props.property, value );
    if ( this.props.type === 'checkbox' || this.props.type === 'radio' || this.props.type === 'select'){
      ElectionActions.postElectionData( this.props.property, value );
    }
    this.setState({
      value: value
    });
  },

  handleSave: function(event) {
    event.preventDefault();
    ElectionActions.postElectionData( this.props.property, this.state.value );
  },

  handleUndo: function(event) {
    event.preventDefault();
    ElectionActions.undoElectionChange( this.props.property );
  },

  isSaved: function() {
    if ( ElectionStore.isUnsavedProperty(this.props.property) ){
      return "unsaved";
    } else {
      return "saved";
    }
  },

  render: function() {
    var input, save, undo, editTooltip;

    save = (<button action="submit" className="save" onClick={this.handleSave}>Save</button>);
    undo = (<button action="submit" className="save" onClick={this.handleUndo}>Undo</button>);

    switch ( this.props.type ) { // different inputs are different!

      case 'text':
      case 'number':
        input = ( <input key={ this.props.property } className={ this.props.classes } type={ this.props.type } name={ this.props.name } value={ this.props.value } disabled={this.props.disabled} onChange={ this.handleChange } /> );
        editTooltip = ( <span className="edit-tooltip">Edit</span> );
      break;

      case 'textarea':
        input = ( <textarea key={ this.props.property } className={ this.props.classes } name={ this.props.name } value={ this.props.value } disabled={this.props.disabled} onChange={ this.handleChange } /> );
        editTooltip = ( <span className="edit-tooltip">Edit</span> );
      break;

      case 'select':
        var options = [];
        options.push((
          <option value="null" disabled="disabled">{this.props.defaultOption}</option>
        ));
        _.each(this.props.options, function(val, key) {
          options.push((
            <option key={val} value={val}>{key}</option>
          ));
        });
        input = (
                <select key={ this.props.property } className={this.props.classes} name={ this.props.name } value={ this.props.value } disabled={this.props.disabled} onChange={ this.handleChange }>
                  {options}
                </select>
                );
        save = null;
        undo = null;
      break;

      case 'checkbox':
      case 'radio':
        input = ( <input key={ this.props.property } className={ this.props.classes } type={ this.props.type } name={ this.props.name } value={ this.props.value } checked={ this.props.value } disabled={this.props.disabled} onChange={ this.handleChange }/> );
        save = null;
        undo = null;
      break;

      default: // no op

    }

    return(
      <div className={"electionInput" } >
        <label htmlFor={this.props.name}>{this.props.name}</label>
        <div className={"input-field " + this.props.name + " " + this.isSaved()}>
          {input}
          {editTooltip}
          <div className="save-buttons">
            {save}
            {undo}
          </div>
        </div>
      </div>
    );
  
  }

});

module.exports = ElectionInput;