import { useSelectedChannel } from "../../store/useSelectedChannel";
import Chat from "../chat/Chat";
import Layout from "../shared/Layout";
import ChannelSidebar from "./ChannelSidebar";
import Navigation from "./Navigation";
import Calendar from "../calendar/Calendar";
import Members from "../members/Members";
import KanbanBoard from "../kanban/KanbanBoard";
import React from "react";
import LogoOverlay from "../animations/LogoOverlay";
import { ChannelAttributes } from '@tidify/common';
import { useSocket } from "../../store/useSocket";
import shallow from 'zustand/shallow'

interface Props { };

const Home: React.FC<Props> = () => {

    const selectedChannel = useSelectedChannel(state => state.selectedChannel);
    const { connect, disconnect } = useSocket(state => ({ connect: state.connect, disconnect: state.disconnect }), shallow);

    React.useEffect(() => {
        connect();

        return () => disconnect()
    }, []);

    const currentView = () => {
        if (selectedChannel === 'overview') return null;
        if (selectedChannel === 'members') return <Members memberCount={1} />
        if (selectedChannel === 'calendar') return <Calendar />
        if (selectedChannel === 'kanban') return <KanbanBoard />
        return <Chat />
    }

    return (
        <>
            <LogoOverlay />
            <Navigation />
            <Layout>
                <ChannelSidebar />
                {currentView()}
            </Layout>
        </>
    );
}

export default Home;