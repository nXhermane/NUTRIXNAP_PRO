import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";

// Define the layout component as a functional component
const Layout = ({ children }: { children: JSX.Element }) => {
  return <Stack>{children}</Stack>;
};

// Define the routes as an array of objects
const routes = [
  {
    name: "index",
    options: { headerShown: false },
  },
  {
    name: "logininfo",
    options: { headerShown: false },
  },
];

// Define the styles using the StyleSheet API
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// Export the layout, routes, and styles as separate named exports
export { Layout, routes, styles };
