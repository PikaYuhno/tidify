import { UseDisclosureProps, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, VStack, Text, Avatar } from "@chakra-ui/react";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { createBoard } from "../../api/board";
import { useSelectedGuild } from "../../store/useSelectedGuild";
import Button from '../../ui/Button';

interface Props {
    inviteToken: string | null;
    onClose: () => void;
};

const InviteModal: React.FC<Props> = ({inviteToken, onClose}) => {
    const selectedGuild = useSelectedGuild(state => state.selectedGuild);
    const queryClient = useQueryClient();

    const mutation = useMutation(createBoard);
    return (
        <>
            <Modal isOpen={!!inviteToken} onClose={onClose!} isCentered >
                <ModalOverlay />
                <ModalContent bg="var(--background-secondary)">
                    <ModalCloseButton />
                    <ModalBody
                        paddingBottom="24px"
                    >
                        <VStack>
                            <Avatar />
                            <Text>Somone invited you to join</Text>
                            <Text fontWeight="bold" fontSize="2xl">Team3</Text>
                        </VStack>
                        <Button>
                            Accept Invite
                        </Button>
                    </ModalBody>

                </ModalContent>
            </Modal>
        </>
    );
}

export default InviteModal;