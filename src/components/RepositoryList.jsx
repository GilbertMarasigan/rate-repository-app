import { FlatList, View, StyleSheet } from 'react-native';
import { Menu, Button } from 'react-native-paper';
import { useState } from 'react';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
    separator: {
        height: 10,
        backgroundColor: '#bdbdbd'
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SortRepo = ({ setSortBy }) => {
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState('latest');

    const sortOptions = {
        latest: {
            label: 'Latest',
            orderBy: 'CREATED_AT',
            orderDirection: 'DESC'
        },
        highestRated: {
            label: 'Highest Rated',
            orderBy: 'RATING_AVERAGE',
            orderDirection: 'DESC'
        },
        lowestRated: {
            label: 'Lowest Rated',
            orderBy: 'RATING_AVERAGE',
            orderDirection: 'ASC'
        }
    };


    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const selectOption = (key) => {
        setSelected(key);
        setSortBy({
            orderBy: sortOptions[key].orderBy,
            orderDirection: sortOptions[key].orderDirection
        });
        closeMenu();
    };

    return (
        <View style={{ paddingHorizontal: 16, paddingVertical: 10 }}>
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                    <Button mode="outlined" onPress={openMenu}>
                        Sort by: {sortOptions[selected].label}
                    </Button>
                }
            >
                <Menu.Item onPress={() => selectOption('latest')} title="Latest" />
                <Menu.Item onPress={() => selectOption('highestRated')} title="Highest Rated" />
                <Menu.Item onPress={() => selectOption('lowestRated')} title="Lowest Rated" />
            </Menu>
        </View>
    );
};

export const RepositoryListContainer = ({ repositories, setSortBy, sortBy }) => {

    return (
        <FlatList
            data={repositories}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <RepositoryItem item={item} />}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={<SortRepo sortBy={sortBy} setSortBy={setSortBy} />}
        />
    );
};

const RepositoryList = () => {

    const [sortBy, setSortBy] = useState({
        "orderBy": "CREATED_AT",
        "orderDirection": "DESC"
    });

    const { repositories } = useRepositories(sortBy);
    return <RepositoryListContainer repositories={repositories} sortBy={sortBy} setSortBy={setSortBy} />;
}

export default RepositoryList;