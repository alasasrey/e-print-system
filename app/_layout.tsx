import { Stack } from "expo-router";


export default function Layout() {
  return (
    //TODO: MAKE THE headerShown: false IF YOU ARE DONE WITH TESTING!!!
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{ title: "Login" }} />
      <Stack.Screen name="(tabs)/student/home" options={{ title: "Home" }} />
      <Stack.Screen name="(tabs)/student/submitJob" options={{ title: "Submit Job" }} />
      <Stack.Screen name="(tabs)/student/orders" options={{ title: "My Orders" }} />
      <Stack.Screen name="(tabs)/student/profile" options={{ title: "Profile" }} />
      <Stack.Screen name="(tabs)/manager/dashboard" options={{ title: "Manager Dashboard" }} />
      <Stack.Screen name="(tabs)/manager/orders" options={{ title: "Manager Orders" }} />
      <Stack.Screen name="(tabs)/manager/settings" options={{ title: "Manager Settings" }} />
    </Stack>
  );
}