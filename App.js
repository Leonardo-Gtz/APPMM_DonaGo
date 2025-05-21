import React from 'react';
import { NativeBaseProvider, Box, Text, VStack, HStack, Avatar, Divider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Principal from './src/screens/Principal';
import MisRecaudaciones from './src/screens/MisRecaudaciones';
import Ajustes from './src/screens/Ajustes';
import LogoutScreen from './src/screens/LogoutScreen';
import CamWeb from './src/screens/CamWeb';
import IniciarSesion from './src/screens/IniciarSesion';
import Registro from './src/screens/Registro';
import Perfil from './src/screens/Perfil';

const Drawer = createDrawerNavigator();

// 👉 Drawer personalizado directamente en App.js
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <Box px={4} py={6} bg="gray.200">
        <HStack space={4} alignItems="center">
          <Avatar
            bg="white"
            size="lg"
            source={{ uri: 'https://cdn-icons-png.freepik.com/512/3607/3607444.png' }}
          />
          <VStack>
            <Text fontSize="md" bold color="gray.800">
              Usuario
            </Text>
            <Text fontSize="xs" color="gray.500">
              usuario@email.com
            </Text>
          </VStack>
        </HStack>
      </Box>
      <Divider my={2} />

      <DrawerItemList {...props} />

      <Divider my={2} />

      <DrawerItem
        label="Cerrar sesión"
        icon={({ color, size }) => <Icon name="logout" size={size} color={color} />}
        onPress={() => props.navigation.navigate('Cerrar sesión')}
      />
    </DrawerContentScrollView>
  );
}


export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Iniciar Sesion"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen
            name="Campaña Web"
            component={CamWeb}
            options={{ headerShown: false, drawerItemStyle: { display: 'none' }  }}
          />
          <Drawer.Screen
            name="Iniciar Sesion"
            component={IniciarSesion}
            options={{ headerShown: false, drawerItemStyle: { display: 'none' }  }}
          />
          <Drawer.Screen
            name="Registro"
            component={Registro}
            options={{ headerShown: false, drawerItemStyle: { display: 'none' }  }}
          />
          <Drawer.Screen
            name="Perfil"
            component={Perfil}
            options={{
              headerShown: false,
              drawerIcon: ({ color, size }) => (
                <Icon name="person" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Principal"
            component={Principal}
            options={{
              headerShown: false,
              drawerIcon: ({ color, size }) => (
                <Icon name="home" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Mis Recaudaciones"
            component={MisRecaudaciones}
            options={{
              headerShown: false,
              drawerIcon: ({ color, size }) => (
                <Icon name="dashboard" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Ajustes"
            component={Ajustes}
            options={{
              headerShown: false,
              drawerIcon: ({ color, size }) => (
                <Icon name="settings" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Cerrar sesión"
            component={LogoutScreen}
            options={{ headerShown: false, drawerItemStyle: { display: 'none' } }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}