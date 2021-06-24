import {Text} from '@chakra-ui/react';
import { Flex } from "@chakra-ui/layout";
import React from "react";
import BoxWrapper from "../shared/BoxWrapper";
import Members from "../shared/Members";
import { useSelectedGuild } from '../../store/useSelectedGuild';

interface Props {}

const Overview: React.FC<Props> = () => {
    const selectedGuild = useSelectedGuild(state => state.selectedGuild);
	return (
		<>
			<Flex w="100%" h="100%">
				<Flex flex="4" h="100%" w="100%" flexDirection="column" p="10px">
                    {selectedGuild && <BoxWrapper>
                        <Text fontWeight="bold" fontSize="3xl" color="white">Welcome to {selectedGuild?.name}</Text>
                    </BoxWrapper> }
                </Flex>
				<Members />
			</Flex>
		</>
	);
};

export default Overview;

