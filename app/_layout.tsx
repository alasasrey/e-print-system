import { Stack } from "expo-router";


export default function Layout() {
  return (
    //TODO: MAKE THE headerShown: false IF YOU ARE DONE WITH TESTING!!!
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{ title: "Login" }} />
      <Stack.Screen name="student/home" options={{ title: "Home" }} />
      <Stack.Screen name="student/submitJob" options={{ title: "Submit Job" }} />
      <Stack.Screen name="student/orders" options={{ title: "My Orders" }} />
      <Stack.Screen name="student/profile" options={{ title: "Profile" }} />
    </Stack>
  );
}