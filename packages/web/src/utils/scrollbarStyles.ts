export const scrollbarStyles = {
    "&::-webkit-scrollbar": {
        width: '4px',
        height: '4px',
        borderRadius: '10px'
    },
    "&::-webkit-scrollbar-corner": {
        backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: "var(--background-primary)",
        minHeight: '40px',
    },
    "&::-webkit-scrollbar-track": {
        marginBottom: '8px',
    },

}