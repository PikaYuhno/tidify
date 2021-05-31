import React from "react";
import { AlertIcon, AlertDescription, CloseButton, Box, Alert as CAlert, VStack } from "@chakra-ui/react";
import styled from "styled-components";
import { useAlerts } from '../../store/useAlerts';

const Alert: React.FC = () => {
    const { alerts, add, remove } = useAlerts();

    return (
        <Container>
            <VStack spacing="10px">
                {alerts.length !== 0 &&
                    alerts.map((alert) => {
                        return (
                            <CAlert key={alert.id} status={alert.alertType}>
                                <AlertIcon />
                                <AlertDescription>{alert.message}</AlertDescription>
                                <CloseButton position="absolute" right="8px" top="8px" onClick={() => remove(alert.id)} />
                            </CAlert>
                        );
                    })}
            </VStack>
        </Container>
    );
};

const Container = styled.div`
	position: fixed;
	right: 0;
	top: 0;
	height: auto;
	width: 500px;
	z-index: 5;
	padding: 0.75rem 1.25rem;
`;

export default Alert;