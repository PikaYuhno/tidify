import { Flex } from "@chakra-ui/layout";
import React from "react";
import Members from "../shared/Members";

interface Props {}

const Overview: React.FC<Props> = () => {
	return (
		<>
			<Flex w="100%" h="100%">
				<Flex flex="4" h="100%" w="100%" flexDirection="column" p="10px"></Flex>
				<Members />
			</Flex>
		</>
	);
};

export default Overview;

