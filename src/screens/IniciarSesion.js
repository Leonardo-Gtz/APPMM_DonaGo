import React, { useEffect, useState } from 'react';
import { NativeBaseProvider, Box, VStack, Input, Button, Text, Center, Image, Pressable } from 'native-base';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Alert } from 'react-native';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../firebase';

WebBrowser.maybeCompleteAuthSession();

export default function IniciarSesion({ navigation }) {
  const [email, setEmail] = useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'TU_EXPO_CLIENT_ID',
    androidClientId: 'TU_ANDROID_CLIENT_ID',
    iosClientId: 'TU_IOS_CLIENT_ID',
    webClientId: 'TU_WEB_CLIENT_ID',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.authentication;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then(userCredential => {
          Alert.alert('¡Sesión iniciada!', `Bienvenido ${userCredential.user.email}`);
          navigation.navigate('Principal');
        })
        .catch(error => {
          Alert.alert('Error', error.message);
        });
    }
  }, [response]);

  const handleManualLogin = () => {
    if (email.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa tu correo');
      return;
    }
    Alert.alert('Inicio de sesión', `Bienvenido, ${email}`);
  };

  const handleRegistro = () => {
    navigation.navigate('Registro');
  };

  return (
    <Center flex={1} px={4} bg="#fff">
      <VStack space={4} w="100%" maxW="300px" alignItems="center">
        <Text fontSize="2xl" color="#9c9c9c" fontWeight="bold">BIENVENIDOS</Text>
        <Image source={require('../../assets/DPG.png')} alt="Logo" size="xl" resizeMode="contain" />
        <Text fontSize="sm" color="gray.500">Inicia sesión para continuar</Text>

        <Button
          rounded="full"
          variant="outline"
          leftIcon={
            <Image
              source={require('../../assets/D.png')}
              alt="Google"
              size={5}
            />
          }
          _text={{ fontSize: "md", fontWeight: "bold" }}
          w="100%"
          onPress={() => promptAsync()}
        >
          Iniciar con Google
        </Button>

        <Text color="gray.400">o usa tu cuenta</Text>
        <Input
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          w="100%"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Button colorScheme="teal" w="100%" onPress={() => navigation.navigate('Principal')}>
          Ingresar
        </Button>

        <Pressable onPress={handleRegistro}>
          <Text mt={2} color="teal.500" underline>
            ¿No tienes cuenta? Regístrate aquí
          </Text>
        </Pressable>
      </VStack>
    </Center>
  );
}