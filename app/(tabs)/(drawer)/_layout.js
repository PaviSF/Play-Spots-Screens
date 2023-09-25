import { Drawer } from "expo-router/drawer";
import { Feather } from "@expo/vector-icons";
export default function Layout() {
  return (
    <Drawer
      screenOptions={{
        drawerActiveTintColor: "green",
        drawerPosition: "right",
        drawerType: "slide",
      }}
    >
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: "Profile",
          drawerIcon: () => <Feather name="log-out" size={20} color="black" />,
          headerTitle: "My profile",
          headerTitleAlign: "center",
          headerTitleStyle: { fontWeight: "100", fontSize: 15 },
        }}
      />
      <Drawer.Screen
        name="help"
        options={{
          drawerLabel: "Help & Support",
          drawerIcon: () => (
            <Feather name="headphones" size={20} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="cancellation"
        options={{
          drawerLabel: "Cancellation/Reschedule",
          drawerIcon: () => <Feather name="edit-3" size={20} color="black" />,
        }}
      />
      <Drawer.Screen
        name="delete"
        options={{
          drawerLabel: "Delete Account",
          drawerIcon: () => <Feather name="trash" size={20} color="black" />,
        }}
      />
      <Drawer.Screen
        name="logout"
        options={{
          drawerLabel: "Log out",
          drawerIcon: () => <Feather name="log-out" size={20} color="black" />,
        }}
      />
    </Drawer>
  );
}
