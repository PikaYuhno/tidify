import { Box, Placement, Tooltip } from "@chakra-ui/react";
import React from "react";
import { Icon } from "react-feather";

type IconWrapper = {
    icon: Icon;
    tooltip?: {
        label: string;
        placement: Placement;
    };
    p?: string;
    h?: string;
    w?: string;
    onClick?: () => void;
}

const IconWrapper: React.FC<IconWrapper> = ({ icon: Icon, tooltip, p, onClick, w, h }) => {
    const WrappedIcon = (<Box
        p={p || '3px'}
        sx={{
            "&:hover": {
                bg: 'var(--background-secondary)',
                borderRadius: '5px',
                cursor: 'pointer'
            }
        }}
        d="flex"
        justifyContent="center"
        alignItems="center"
        onClick={onClick}
    >
        <Icon color="var(--text-primary)" width={w || '24px'} height={h || '24px'} />

    </Box>);
    return (
        <>
            {tooltip
                ?
                <Tooltip hasArrow label={tooltip.label} placement={tooltip.placement} bg="var(--background-primary)">
                    {WrappedIcon}
                </Tooltip>
                :
                WrappedIcon
            }
        </>
    );
}

export default IconWrapper;