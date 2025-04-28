import { Platform } from "react-native";

const theme = {
    colors: {
        textPrimary: '#24292e',
        textSecondary: '#586069',
        primary: '#0366d6',
        background: '#ffffff',
        appBar: '#24292e',
        white: '#ffffff',
    },
    fontSizes: {
        body: 14,
        subheading: 16,
        heading: 24,
    },
    fonts: {
        main: Platform.select({
            ios: 'Aria',
            android: 'Roboto',
            default: 'System'
        }),
    },
    fontWeights: {
        normal: '400',
        bold: '700',
        light: '300',
    },
    spacing: {
        sm: 8,
        md: 16,
        lg: 24,
    },
    avatar: {
        size: 50,
    },
    repositoryItem: {
        container: {
            display: 'flex',
            paddingTop: 16,
            paddingHorizontal: 16,
            paddingBottom: 16,
        },
        itemHeader: {
            flexDirection: 'row',
        },
        headerAvatar: {
            flexGrow: 0.1,
        },
        headerContent: {
            flexGrow: 1,
            justifyContent: 'center',
            paddingHorizontal: 16,
        },
        avatar: {
            width: 50,
            height: 50,
            borderRadius: 5,
        },
        title: {
            fontSize: 18,
            fontWeight: '700',
            color: '#24292e',
        },
        description: {
            fontSize: 14,
            fontWeight: '300',
            color: '#586069',
            paddingBottom: 8
        },
    },
};

export default theme;
