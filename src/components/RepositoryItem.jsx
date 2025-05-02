import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import { useNavigate } from 'react-router-native';
import theme from '../theme/theme';

const styles = StyleSheet.create({
    language: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginBottom: 14
    },
    languageText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 12,
    },
    statsSection: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 1
    },
    statsItem: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statNumber: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    statLabel: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '300',
        color: '#586069',
        paddingTop: 7
    }
});


const RepoStats = ({ stargazersCount, forksCount, reviewCount, ratingAverage }) => {

    const shortenNumber = num => {
        return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString();
    };

    return (
        <View style={styles.statsSection}>
            <View style={styles.statsItem}>
                <Text testID="Stars" style={styles.statNumber}>{shortenNumber(stargazersCount)}</Text>
                <Text style={styles.statLabel}>Stars</Text>
            </View>
            <View style={styles.statsItem}>
                <Text testID="Forks" style={styles.statNumber}>{shortenNumber(forksCount)}</Text>
                <Text style={styles.statLabel}>Forks</Text>
            </View>
            <View style={styles.statsItem}>
                <Text testID="Reviews" style={styles.statNumber}>{shortenNumber(reviewCount)}</Text>
                <Text style={styles.statLabel}>Reviews</Text>
            </View>
            <View style={styles.statsItem}>
                <Text testID="Rating" style={styles.statNumber}>{shortenNumber(ratingAverage)}</Text>
                <Text style={styles.statLabel}>Rating</Text>
            </View>
        </View>
    )
}



const RepoDetails = ({ title, image, description, language }) => {

    return (
        <>
            <View style={theme.repositoryItem.itemHeader}>
                <View style={theme.repositoryItem.headerAvatar}>
                    <Image style={theme.repositoryItem.avatar} source={{ uri: image }}></Image>
                </View>
                <View style={theme.repositoryItem.headerContent}>
                    <Text testID="title" style={theme.repositoryItem.title}>
                        {title}
                    </Text>
                    <Text testID="description" style={theme.repositoryItem.description}>
                        {description}
                    </Text>
                    <View style={styles.language}>
                        <Text testID="language" style={styles.languageText}>
                            {language}
                        </Text>
                    </View>
                </View>
            </View>

        </>
    )
}

const RepositoryItem = ({ item }) => {

    const navigate = useNavigate();

    const redirectSingleDetail = () => {
        console.log(`redirect to /${item.id}`);
        navigate(`/${item.id}`);
    }

    // console.log('item', item)

    return (
        <Pressable onPress={redirectSingleDetail}>
            <View testID="repositoryItem" style={theme.repositoryItem.container}>
                <RepoDetails key={item.id} title={item.fullName} image={item.ownerAvatarUrl} description={item.description} language={item.language} />
                <RepoStats stargazersCount={item.stargazersCount} forksCount={item.forksCount} reviewCount={item.reviewCount} ratingAverage={item.ratingAverage} />
            </View>
        </Pressable>
    )
}

export { RepoDetails, RepoStats };

export default RepositoryItem