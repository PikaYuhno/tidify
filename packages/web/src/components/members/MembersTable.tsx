import {Table, Thead, Tbody, Tr, Th, Td, Avatar} from '@chakra-ui/react';

interface Props {};

const MembersTable: React.FC<Props> = () => {
    return (
        <>
            <Table>
                <Thead>
                    <Tr borderColor="var(--background-secondary)">
                        <Th color="var(--background-primary)">Avatar</Th>
                        <Th>Name</Th>
                        <Th>Last online</Th>
                        <Th>Joined</Th>
                        <Th>Role</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>
                            <Avatar />
                        </Td>
                        <Td>PikaYuhno</Td>
                        <Td>Now</Td>
                        <Td>4mo</Td>
                        <Td>Member</Td>
                    </Tr>
                </Tbody>
            </Table>
        </>
    );
}

export default MembersTable;