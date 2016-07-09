import React from 'react';
import cn from 'classnames';
import dates from './utils/dates';
import { accessor as get } from './utils/accessors';
import Modal from 'react-modal';
import EventModal from './EventModal'

export default class EventCell extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      open: false,
      currEvent: {}
    };
  }

  passEvent(event) {
    this.setState({
      open: true,
      currEvent: event
    });
  }

  render() {
    let {
        className, event, selected, eventPropGetter
      , startAccessor, endAccessor, titleAccessor
      , slotStart, slotEnd, onSelect, component, ...props } = this.props;

    let Component = component;

    let title = get(event, titleAccessor)
      , end = get(event, endAccessor)
      , start = get(event, startAccessor)
      , isAllDay = get(event, props.allDayAccessor)
      , continuesPrior = dates.lt(start, slotStart, 'day')
      , continuesAfter = dates.gt(end, slotEnd, 'day')

    if (eventPropGetter)
      var { style, className: xClassName } = eventPropGetter(event, start, end, selected);

    return (
      <div>
        <div
          {...props}
          style={{...props.style, ...style}}
          className={cn('rbc-event', className, xClassName, {
            'rbc-selected': selected,
            'rbc-event-allday': isAllDay || dates.diff(start, dates.ceil(end, 'day'), 'day') > 1,
            'rbc-event-continues-prior': continuesPrior,
            'rbc-event-continues-after': continuesAfter
          })}
          onClick={()=> this.passEvent(event)}
        >
          <div className='rbc-event-content' title={title}>
            { Component
              ? <Component event={event} title={title}/>
              : title
            }
          </div>
        </div>
        <EventModal value={this.state} />
      </div>
    );
  }
};
