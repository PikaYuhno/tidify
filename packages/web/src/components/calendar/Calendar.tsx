import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import React from "react";
import BoxWrapper from "../shared/BoxWrapper";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createEvent, getEvents } from "../../api/event";
import { useSelectedGuild } from "../../store/useSelectedGuild";
import { useDisclosure } from "@chakra-ui/hooks";
import CreateEventModal from "./CreateEventModal";
import Button from "../../ui/Button";

const localizer = momentLocalizer(moment);

const MyCalendar: React.FC = () => {
    const disclosure = useDisclosure();
    const { onOpen } = disclosure;
    const selectedGuild = useSelectedGuild((state) => state.selectedGuild);
    const { data, isLoading } = useQuery(
        "events",
        () => getEvents(selectedGuild?.id),
        { enabled: !!selectedGuild }
    );
    const [modalData, setModalData] = React.useState<Date | null>(null);

    if (isLoading) return null;

    const handleDateClick = (currentDate: Date) => {
        setModalData(currentDate);
        onOpen();
    };

    return (
        <>
            <BoxWrapper>
                <Calendar
                    onDrillDown={handleDateClick}
                    localizer={localizer}
                    events={data.data}
                    views={["month", "week"]}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: "100%", width: "100%", color: "white" }}
                />
            </BoxWrapper>
            <CreateEventModal disclosure={disclosure} currentDate={modalData!} />
        </>
    );
};

export default MyCalendar;

