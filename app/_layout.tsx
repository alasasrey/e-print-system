import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from "expo-router";
import { useEffect } from "react";
import { Platform, StatusBar } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function Layout() {
  {/* PUTTING THIS CODE HERE SO THAT NO TEXT OR COMPONENTS STACK WITH THE SYSTEM NAVIGATION */ }
  useEffect(() => {
    if (Platform.OS === 'android') {
      // This sets the bottom navigation bar background/button style
      NavigationBar.setBackgroundColorAsync('#0A0A1B'); // Matches your dark theme
      NavigationBar.setButtonStyleAsync('dark');
    }
  }, []);

  return (
    <>
      {/* PUTTING THIS CODE HERE SO THAT NO TEXT OR COMPONENTS STACK WITH THE SYSTEM NAVIGATION */}
      <SafeAreaProvider>
        <StatusBar barStyle='light-content' />

        {/* TODO: MAKE THE headerShown: false IF YOU ARE DONE WITH TESTING!!! */}
        <Stack screenOptions={{ headerShown: true }}>
          <Stack.Screen name="index" options={{ title: "Login" }} />
          <Stack.Screen name="(tabs)/student/home" options={{ title: "Home" }} />
          <Stack.Screen name="(tabs)/student/submitJob" options={{ title: "Submit Job" }} />
          <Stack.Screen name="(tabs)/student/orders" options={{ title: "My Orders" }} />
          <Stack.Screen name="(tabs)/student/profile" options={{ title: "Profile" }} />
          <Stack.Screen name="(tabs)/manager/dashboard" options={{ title: "Manager Dashboard" }} />
          <Stack.Screen name="(tabs)/manager/orders" options={{ title: "Manager Orders" }} />
          <Stack.Screen name="(tabs)/manager/settings" options={{ title: "Manager Settings" }} />
          <Stack.Screen name="(tabs)/admin/dashboard" options={{ title: "Admin Dashboard" }} />
          <Stack.Screen name="(tabs)/admin/shops" options={{ title: "Admin Shops" }} />
          <Stack.Screen name="(tabs)/admin/allJobs" options={{ title: "Admin AllJobs" }} />
        </Stack>
      </SafeAreaProvider>
    </>
  );
}