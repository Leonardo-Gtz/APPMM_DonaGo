// src/screens/IniciarSesion.js
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Center, VStack, Input, Button, Text, Pressable, Image } from 'native-base';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function IniciarSesion({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Faltan datos', 'Ingresa correo y/o contraseña');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        Alert.alert('Inicio exitoso', `Bienvenido, ${userCredential.user.email}`);
        navigation.navigate('Principal'); // Reemplaza por tu pantalla principal
      })
      .catch(error => {
        Alert.alert('Error en el login', error.message);
      });
  };

  return (
    <Center flex={1} px={4} bg="#fff">
      <VStack space={4} w="100%" maxW="300px" alignItems="center">
        <Text fontSize="2xl" color="#9c9c9c" fontWeight="bold">BIENVENIDOS</Text>
        <Image source={require('../../assets/DPG.png')} alt="Logo" size="xl" />
        <Text fontSize="sm" color="gray.500">Inicia sesión para continuar</Text>

        <Input placeholder="Correo electrónico" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <Input placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
        <Button colorScheme="teal" w="100%" onPress={handleLogin}>Iniciar sesión</Button>

        <Pressable onPress={() => navigation.navigate('Registro')}>
          <Text mt={2} color="teal.500" underline>¿No tienes cuenta? Regístrate aquí</Text>
        </Pressable>
      </VStack>
    </Center>
  );
}