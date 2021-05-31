import { useMe } from "../../hooks/useMe";
import Loader from "../shared/Loader";

export interface IHomeProps {};

const Home: React.FC<IHomeProps> = (props) => {
    const {data, isLoading } = useMe(); 

    if (isLoading) return <Loader />

    return (<>
        <code>{JSON.stringify(data, null, 2)}</code>
    </>);
}

export default Home;