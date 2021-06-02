import { Calendar, momentLocalizer, Event } from 'react-big-calendar'
import moment from 'moment'
import React from 'react'
import { Box } from '@chakra-ui/layout'

const localizer = momentLocalizer(moment)

const MyCalendar: React.FC = () => {
    const myEventsList: Event[] = [{}]
    return (
        <Box
            p="20px"
            w="100%"
        >
            <Box
                h="100%"
                bg="var(--background-secondary-alt)"
                p="20px"
                borderRadius="10px"
            >
                <Calendar
                    localizer={localizer}
                    events={myEventsList}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '100%', width: '100%' }}
                />
            </Box>
        </Box>
    );
}

export default MyCalendar;