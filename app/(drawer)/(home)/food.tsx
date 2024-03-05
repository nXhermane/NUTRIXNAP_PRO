import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  const [components, setComponents] = useState([]);
  const [componentSize, setComponentSize] = useState(50);

  const handleIncreaseSize = () => {
    setComponentSize((prevSize) => prevSize + 10);
  };

  const handleDecreaseSize = () => {
    setComponentSize((prevSize) => Math.max(prevSize - 10, 10));
  };

  const handleAddComponent = () => {
    const newId = components.length + 1;
    setComponents((prevComponents) => [
      ...prevComponents,
      { id: newId, dynamicValue: 'Initial' },
    ]);
  };

  const handleUpdateDynamicValue = (componentId, newValue) => {
    setComponents((prevComponents) =>
      prevComponents.map((component) =>
        component.id === componentId ? { ...component, dynamicValue: newValue } : component
      )
    );
  };

  return (
    <View style={styles.container}>
      {components.map((component) => (
        <TouchableOpacity
          key={component.id}
          style={{ ...styles.componentContainer, height: componentSize }}
          onPress={() => handleUpdateDynamicValue(component.id, 'Updated Value')}
        >
          <Text>{`Component ${component.id}: ${component.dynamicValue}`}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddComponent}
      >
        <Text>Ajouter un composant</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.sizeButton}
        onPress={handleIncreaseSize}
      >
        <Text>Augmenter la taille</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.sizeButton}
        onPress={handleDecreaseSize}
      >
        <Text>Diminuer la taille</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  componentContainer: {
    marginVertical: 10,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeButton: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: 'lightcoral',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;