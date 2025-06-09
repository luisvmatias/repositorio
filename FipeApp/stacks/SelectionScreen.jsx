import React from 'react';
import { FlatList } from 'react-native';
import { List, Searchbar } from 'react-native-paper';

const SelectionScreen = ({ route, navigation }) => {
  const { items, onSelect } = route.params;
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredItems, setFilteredItems] = React.useState(items);

  React.useEffect(() => {
    setFilteredItems(
      items.filter(item =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, items]);

  return (
    <>
      <Searchbar
        placeholder="Pesquisar"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={{ margin: 8 }}
      />
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.value.codigo}
        renderItem={({ item }) => (
          <List.Item
            title={item.label}
            onPress={() => {
              onSelect(item.value);
              navigation.goBack();
            }}
          />
        )}
      />
    </>
  );
};

export default SelectionScreen;