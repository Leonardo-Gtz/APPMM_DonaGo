// src/screens/RegisterScreen.js
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Center, VStack, Input, Button, Text, Pressable, Image } from 'native-base';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function Registro({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistro = () => {
    if (!email || !password) {
      Alert.alert('Faltan datos', 'Ingresa correo y contraseña');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        Alert.alert('Registro exitoso', `Bienvenido, ${userCredential.user.email}`);
        navigation.navigate('IniciarSesion');
      })
      .catch(error => {
        Alert.alert('Error en el registro', error.message);
      });
  };

  return (
    <Center flex={1} px={4} bg="#fff">
      <VStack space={4} w="100%" maxW="300px" alignItems="center">
        <Image source={require('../../assets/DPG.png')} alt="Logo" size="xl" />
        <Text fontSize="2xl" fontWeight="bold">Crear cuenta</Text>
        <Input placeholder="Correo electrónico" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <Input placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
        <Button colorScheme="teal" onPress={handleRegistro}>Registrarse</Button>
        <Pressable onPress={() => navigation.navigate('Iniciar Sesion')}>
          <Text color="teal.500" underline>¿Ya tienes cuenta? Inicia sesión</Text>
        </Pressable>
      </VStack>
    </Center>
  );
}