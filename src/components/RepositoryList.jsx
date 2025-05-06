import { FlatList, View, StyleSheet } from 'react-native';
import { Menu, Button, Searchbar } from 'react-native-paper';
import { useState, useEffect } from 'react';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
    separator: {
        height: 10,
        backgroundColor: '#bdbdbd'
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SortRepo = ({ setSortBy, setSearchQuery, searchQuery }) => {
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

    console.log('searchQuery', searchQuery)

    return (
        <View style={{ paddingHorizontal: 16, paddingVertical: 10 }}>
            <Searchbar
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={{ marginBottom: 16, marginTop: 8 }}
            />
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

export const RepositoryListContainer = ({ repositories, setSortBy, sortBy, searchQuery, setSearchQuery, onEndReached }) => {

    return (
        <FlatList
            data={repositories}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <RepositoryItem item={item} />}
            keyExtractor={(item) => item.id}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            ListHeaderComponent={<SortRepo
                sortBy={sortBy}
                setSortBy={setSortBy}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />}
        />
    );
};

const RepositoryList = () => {

    const [sortBy, setSortBy] = useState({
        "orderBy": "CREATED_AT",
        "orderDirection": "DESC"
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    useEffect(() => {
        if (debouncedSearchQuery === '') {
            // Explicitly refetch all repositories when search is cleared
            refetch({
                ...sortBy,
                searchKeyword: '',
                first: 8
            });
        }
    }, [debouncedSearchQuery]);

    console.log('searchQuery', searchQuery)

    const { repositories, fetchMore, refetch } = useRepositories(sortBy, debouncedSearchQuery, 2);

    const onEndReached = () => {
        console.log('You have reached the end of the list');
        fetchMore();
    }

    return <RepositoryListContainer
        repositories={repositories}
        sortBy={sortBy}
        setSortBy={setSortBy}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onEndReached={onEndReached} />;
}

export default RepositoryList;