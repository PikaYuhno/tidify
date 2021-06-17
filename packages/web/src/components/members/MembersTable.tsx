import { Table, Thead, Tbody, Tr, Th, Td, Avatar } from '@chakra-ui/react';

interface Props { };

const MembersTable: React.FC<Props> = () => {
    //@todo
    //const {data, isLoading} = useQuery("guildmembers", getGuildMembers);
    return (
        <>
            <Table color="white">
                <Thead>
                    <Tr borderColor="var(--background-secondary)">
                        <Th color="var(--background-primary)">Avatar</Th>
                        <Th color="var(--background-primary)">Name</Th>
                        <Th color="var(--background-primary)">Last online</Th>
                        <Th color="var(--background-primary)">Joined</Th>
                        <Th color="var(--background-primary)">Role</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>
                            <Avatar />
                        </Td>
                        <Td>Muaz_Ahmed</Td>
                        <Td>Now</Td>
                        <Td>1mo</Td>
                        <Td>Member</Td>
                    </Tr>
                </Tbody>
            </Table>
        </>
    );
}

export default MembersTable;