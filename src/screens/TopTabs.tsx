import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Home } from "@src/screens/home/Home";
import { Profile } from "@src/screens/profile/Profile";

const Tab = createMaterialTopTabNavigator();

const TopTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: "tomato" }, // Cor da linha indicadora
        tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" }, // Estilo do texto das abas
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};
export { TopTabs };
