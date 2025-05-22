import React, { useState } from 'react';
import { Box, VStack, Input, Button, Text, Center, Pressable, Image } from 'native-base';
import { Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (!name || !email || !password) {
      Alert.alert('Faltan datos', 'Completa todos los campos');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        Alert.alert('Registro exitoso', `Bienvenido, ${name}`);
        navigation.navigate('IniciarSesion');
      })
      .catch(error => {
        Alert.alert('Error en el registro', error.message);
      });
  };

  return (
    <Center flex={1} px={4} bg="#fff">
      <VStack space={4} w="100%" maxW="300px" alignItems="center">
        <Image source={require('../../assets/DPG.png')} alt="Logo" size="xl" resizeMode="contain" />
        <Text fontSize="2xl" fontWeight="bold" textAlign="center">Crear cuenta</Text>

        <Input placeholder="Nombre completo" value={name} onChangeText={setName} />
        <Input placeholder="Correo electrónico" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <Input placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />

        <Button colorScheme="teal" onPress={handleRegister}>Registrarse</Button>

        <Pressable onPress={() => navigation.navigate('IniciarSesion')}>
          <Text mt={2} color="teal.500" underline textAlign="center">
            ¿Ya tienes cuenta? Inicia sesión
          </Text>
        </Pressable>
      </VStack>
    </Center>
  );
}