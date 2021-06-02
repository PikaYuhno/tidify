import MyCalendar from "../calendar/Calendar";
import Chat from "../chat/Chat";
import Layout from "../shared/Layout";
import Loader from "../shared/Loader";
import ChannelSidebar from "./ChannelSidebar";
import Navigation from "./Navigation";

export interface IHomeProps { };

const Home: React.FC<IHomeProps> = () => {
    return (
        <>
            <Navigation />
            <Layout>
                <ChannelSidebar />
                {/*<Chat />*/}
                <MyCalendar />
            </Layout>
        </>
    );
}

export default Home;