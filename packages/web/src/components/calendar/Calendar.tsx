import { Calendar, momentLocalizer, Event } from 'react-big-calendar'
import moment from 'moment'
import React from 'react'
import { Box } from '@chakra-ui/layout'
import BoxWrapper from '../shared/BoxWrapper'

const localizer = momentLocalizer(moment)

const MyCalendar: React.FC = () => {
    const myEventsList: Event[] = [{
        start: moment().toDate(),
        end: moment(moment()).add(1, 'days').toDate(),
        title: 'test'
    }]
    return (
        <BoxWrapper>
            <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%', width: '100%', color: 'white' }}
            />
        </BoxWrapper>
    );
}

export default MyCalendar;