import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Box, Text, Button, Image, VStack, Heading, Icon, Input, HStack } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const campañas = [
  {
    id: 1,
    titulo: 'GoFundMe',
    descripcion: 'Tu lugar para ayudar',
    imagen: 'https://logos-world.net/wp-content/uploads/2021/03/GoFundMe-Logo.png',
    url: 'https://www.gofundme.com/',
  },
  {
    id: 2,
    titulo: 'WhyDonate',
    descripcion: 'Recaudación de fondos En Línea Para Particulares Y Organizaciones',
    imagen: 'https://www.adiosfronteras.com/wp-content/uploads/2021/05/new_design_logo.png',
    url: 'https://whydonate.com/es/',
  },
  {
    id: 3,
    titulo: 'Cruz Roja Mexicana Aguascalientes',
    descripcion: 'Tu donativo será destinado al cumplimiento de la causa que selecciones. #AyudarNosMueve',
    imagen: 'https://aguascalientes.cruzrojamexicana.org.mx/dist/LOGOS_CRM/AGU001.jpg',
    url: 'https://aguascalientes.cruzrojamexicana.org.mx/donacion/pay/bar/',
  },
  {
    id: 4,
    titulo: 'Corazón Raíz',
    descripcion: 'Todos merecen una oportunidad para alcanzar sus SUEÑOS',
    imagen: 'https://www.imer.mx/programas/wp-content/uploads/sites/77/2024/08/Corazon-raiz-1.png',
    url: 'https://corazonraiz.org/',
  },
  {
    id: 5,
    titulo: 'Compromiso Social',
    descripcion: 'Ser referentes del modelo de responsabilidad social universitario que logre un impacto social en el país.',
    imagen: 'https://compromisosocial.up.edu.mx/wp-content/uploads/2024/03/Csocial_Mesa-de-trabajo-1-scaled.jpg',
    url: 'https://www.gofundme.com/f/taller-comunitario',
  },
];

export default function Principal({ navigation }) {
  const [busqueda, setBusqueda] = useState('');

  const campañasFiltradas = campañas.filter((campaña) =>
    campaña.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <Box flex={1} bg="gray.100">
      {/* Encabezado fijo */}
      <Box
        safeAreaTop
        bg="white"
        shadow={2}
        px={4}
        py={3}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon as={Ionicons} name="menu" size="xl" color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Principal')}>
        <Image
          source={require('../../assets/DPG.png')}
          alt="Logo DonaGo"
          width={60}
          height={60}
          resizeMode="contain"
        />
        </TouchableOpacity>
        <Box width={8} />
      </Box>
      {/* Buscador */}
      <Box px={4} py={4}>
        <Input
          placeholder="Buscar"
          variant="outline"
          bg="gray.100"
          borderRadius="full"
          py={3}
          px={3}
          InputLeftElement={
            <Icon as={Ionicons} name="search" size={5} ml={2} color="gray.400" />
          }
          value={busqueda}
          onChangeText={(text) => setBusqueda(text)}
        />
      </Box>

      {/* Contenido scrollable */}
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {campañasFiltradas.map((campaña) => (
          <Box
            key={campaña.id}
            mb={4}
            bg="white"
            borderRadius="lg"
            overflow="hidden"
            shadow={2}
          >
            <HStack space={4} p={4} alignItems="center">
              <Image
                source={{ uri: campaña.imagen }}
                alt="Imagen campaña"
                width={70}
                height={70}
                borderRadius="md"
                resizeMode="contain"
              />

              <VStack flex={1} space={2}>
                <Heading size="sm">{campaña.titulo}</Heading>
                <Text fontSize="xs" color="gray.600">
                  {campaña.descripcion}
                </Text>
                <Button
                  mt={2}
                  alignSelf="flex-end"
                  size="sm"
                  colorScheme="teal"
                  borderRadius="full"
                  leftIcon={<Icon as={Ionicons} name="link-outline" size="sm" />}
                  onPress={() =>
                    navigation.navigate('Campaña Web', {
                      url: campaña.url,
                    })
                  }
                >
                  Ver Sitio
                </Button>
              </VStack>
            </HStack>
          </Box>
        ))}
      </ScrollView>
    </Box>
  );
}