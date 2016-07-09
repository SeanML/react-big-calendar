import React, { Component } from 'react';
import Modal from 'react-modal';
import EventCell from './EventCell'

const customStyles = {
  overlay : {
    backgroundColor   : 'rgba(255, 255, 255, .1)',
    zIndex:  1000
  }
};

export default class EventModal extends Component {
  constructor(props){
    super(props);

    this.state = {
      open: this.props.value.open,
      currEvent: this.props.value.currEvent
    };

    this.openPopup = this.openPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount(){
    this.setState({
      open: this.props.open,
      currEvent: this.props.value.currEvent
    });
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      open: nextProps.value.open,
      currEvent: nextProps.value.currEvent
    });
  }

  openPopup(){
    this.setState({
      open: true
    });
  }

  closePopup(){
    this.setState({
      open: false
    });
  }

  save(e){
    e.preventDefault();

    let updatedEvent = {
      title: this.refs.title,
      desc: this.refs.description || "",
      start: this.refs.start,
      end: this.refs.end
    }

    this.closePopup();

  }

  render(){
    return (
      <div style={{height: 100}}>
          <Modal isOpen={this.state.open} onRequestClose={this.closePopup} style={customStyles}>
            <h1>Date Info</h1>
            <form className="eventEditor" onSubmit={this.save}>
              <button className="saveEvent" type="submit">Save</button>
              <button onClick={this.closePopup}>Close</button>
              <input type="text" defaultValue={this.state.currEvent.title} ref="title" />
              <input type="text" defaultValue={this.state.currEvent.desc ||"Enter description here"} ref="description" />
              <input type="datetime" defaultValue={this.state.currEvent.start} ref="start" />
              <input type="datetime" defaultValue={this.state.currEvent.end} ref="end" />
            </form>
          </Modal>
      </div>
    );
  }
}