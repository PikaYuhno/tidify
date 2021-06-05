import { useSelectedChannel } from "../../store/useSelectedChannel";
import Chat from "../chat/Chat";
import Layout from "../shared/Layout";
import Loader from "../shared/Loader";
import ChannelSidebar from "./ChannelSidebar";
import Navigation from "./Navigation";
import Calendar from "../calendar/Calendar";
import Members from "../members/Members";
import KanbanBoard from "../kanban/KanbanBoard";
import React from "react";
import LogoOverlay from "../animations/LogoOverlay";

export interface IHomeProps { };

const Home: React.FC<IHomeProps> = () => {

    const selectedChannel = useSelectedChannel(state => state.selectedChannel);

    const currentView = () => {
        if (selectedChannel === 'overview') { }
        if (selectedChannel === 'members') return <Members memberCount={1} />
        if (selectedChannel === 'calendar') return <Calendar />
        if (selectedChannel === 'kanban') return <KanbanBoard />
        if (selectedChannel === 'text') return <Chat />
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