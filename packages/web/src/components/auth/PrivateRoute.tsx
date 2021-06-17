import { useQuery } from 'react-query';
import React from 'react';
import { Redirect, RouteProps, Route } from 'react-router-dom';
import Loader from '../shared/Loader';
import { useMe } from '../../hooks/useMe';

interface Props extends RouteProps {
    excludedRoles?: string[];
}

const PrivateRoute: React.FC<Props> = ({ excludedRoles, ...rest }) => {
    const {data, isLoading } = useMe(); 
   // request to `/api/v1/users/me` 
    if (isLoading) {
        return <Loader />
    }
    console.log("useMe - ", data);
    if (!data.success) {
        return <Redirect to="/auth/login" />
    }

    return (
        <>
            <Route {...rest} />
        </>
    );
}

export default PrivateRoute;