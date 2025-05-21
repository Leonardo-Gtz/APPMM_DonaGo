import React, { useEffect } from 'react';
import { Box, Text, Spinner } from 'native-base';

export default function LogoutScreen({ navigation }) {
  useEffect(() => {
    // Simulación de cierre de sesión
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Iniciar Sesion' }],
      });
    }, 1500); // 1.5 segundos de espera antes de redirigir
  }, []);

  return (
    <Box flex={1} alignItems="center" justifyContent="center" bg="white">
      <Spinner size="lg" color="emerald.500" />
      <Text mt={4} fontSize="lg">Cerrando sesión...</Text>
    </Box>
  );
}
