import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import {
  Box, Text, VStack, HStack, Input, Icon, Pressable, Heading, Divider, Image, Modal, Button, TextArea
} from 'native-base';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function MisRecaudaciones({ navigation }) {
  const [showModal, setShowModal] = useState(false);
  const [newOrg, setNewOrg] = useState({
    nombre: '',
    descripcion: '',
    imagen: '',
  });

  const handleAgregar = () => {
    console.log('Organización agregada:', newOrg);
    setShowModal(false);
    setNewOrg({ nombre: '', descripcion: '', imagen: '' });
  };

  return (
    <Box flex={1} bg="white">
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

      {/* Contenido scrollable */}
      <ScrollView style={{ flex: 1 }}>
        <VStack space={4} px={4} mt={4}>

          {/* Barra de búsqueda y botón */}
          <HStack space={2} alignItems="center">
            <Input
              placeholder="Buscar"
              variant="outline"
              flex={1}
              borderRadius="10"
              py="3"
              px="3"
              InputLeftElement={<Icon ml="2" size="4" color="gray.400" as={<Ionicons name="search" />} />}
            />
            <Pressable onPress={() => setShowModal(true)}>
              <Icon as={Ionicons} name="add-circle-outline" size="4xl" color="teal.500" />
            </Pressable>
          </HStack>

          {/* Organización encapsulada */}
          <Box borderRadius="lg" borderWidth={1} borderColor="gray.200" p={4} bg="gray.50">
            <HStack space={3} alignItems="center">
              <Image
                source={require('../../assets/sudan.jpg')}
                alt="Organización"
                style={{ width: 100, height: 100, borderRadius: 10 }}
              />
              <VStack flex={1}>
                <Text bold fontSize="xl">The Lost Boys</Text>
                <Text fontSize="sm" color="gray.600">Organización benéfica infantil</Text>
              </VStack>
            </HStack>

            {/* Componente de detalles desplegables */}
            <VerDetalles />
          </Box>

        </VStack>
      </ScrollView>

      {/* Modal para agregar organización */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Agregar Organización</Modal.Header>
          <Modal.Body>
            <VStack space={3}>
              <Input
                placeholder="Nombre de la organización"
                value={newOrg.nombre}
                onChangeText={(text) => setNewOrg({ ...newOrg, nombre: text })}
              />
              <TextArea
                placeholder="Descripción"
                value={newOrg.descripcion}
                onChangeText={(text) => setNewOrg({ ...newOrg, descripcion: text })}
              />
              <Input
                placeholder="URL de la imagen (opcional)"
                value={newOrg.imagen}
                onChangeText={(text) => setNewOrg({ ...newOrg, imagen: text })}
              />
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button onPress={handleAgregar}>Agregar</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
}

// Componente auxiliar para mostrar/ocultar detalles
// Dentro de tu componente VerDetalles
function VerDetalles() {
  const [mostrarDetalles, setMostrarDetalles] = useState(false);
  const [mostrarDonar, setMostrarDonar] = useState(false);
  const [donacion, setDonacion] = useState({
    nombre: '',
    monto: '',
    mensaje: ''
  });

  const handleDonar = () => {
    console.log('Donación realizada:', donacion);
    setMostrarDonar(false);
    setDonacion({ nombre: '', monto: '', mensaje: '' });
  };

  return (
    <>
      <Pressable mt={3} onPress={() => setMostrarDetalles(!mostrarDetalles)}>
        <Box
          bg="purple.100"
          px={4}
          py={2}
          borderRadius="md"
          alignItems="center"
        >
          <Text bold color="purple.700">
            {mostrarDetalles ? 'Ocultar detalles' : 'Ver detalles'}
          </Text>
        </Box>
      </Pressable>

      {mostrarDetalles && (
        <VStack space={4} mt={4}>
          {/* Descripción completa */}
          <Text>
            The Lost Boys es una organización benéfica dedicada a apoyar y proporcionar recursos a niños y jóvenes en situación de vulnerabilidad...
          </Text>

          {/* Galería */}
          <Heading size="sm">Fotos</Heading>
          <HStack space={2} flexWrap="wrap">
            <Image source={require('../../assets/s1.jpg')} style={{ width: 100, height: 100, borderRadius: 10 }} alt="Foto 1" />
            <Image source={require('../../assets/s2.jpg')} style={{ width: 100, height: 100, borderRadius: 10 }} alt="Foto 2" />
            <Image source={require('../../assets/s3.jpg')} style={{ width: 100, height: 100, borderRadius: 10 }} alt="Foto 3" />
            <Pressable
              style={{
                width: 100,
                height: 100,
                borderRadius: 10,
                backgroundColor: '#ccc',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon as={MaterialIcons} name="more-horiz" size="lg" color="gray.600" />
            </Pressable>
          </HStack>

          {/* Insignia */}
          <Heading size="sm">Insignia a obtener</Heading>
          <Box borderRadius="lg" bg="cyan.100" p={3} alignItems="center">
            <Image
              source={require('../../assets/insig/i1.png')}
              alt="Insignia"
              style={{ width: 100, height: 100 }}
              resizeMode="contain"
            />
            <Text mt={2} fontSize="sm" textAlign="justify">
              Esta insignia se otorga a quienes completan una campaña de donación exitosa...
            </Text>
          </Box>

          {/* Botón Donar */}
          <Button mt={4} bg="green.500" _text={{ color: 'white' }} onPress={() => setMostrarDonar(true)}>
            Donar
          </Button>
        </VStack>
      )}

      {/* Modal para donación */}
      <Modal isOpen={mostrarDonar} onClose={() => setMostrarDonar(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Realizar Donación</Modal.Header>
          <Modal.Body>
            <VStack space={3}>
              <Input
                placeholder="Tu nombre"
                value={donacion.nombre}
                onChangeText={(text) => setDonacion({ ...donacion, nombre: text })}
              />
              <Input
                placeholder="Monto (MXN)"
                keyboardType="numeric"
                value={donacion.monto}
                onChangeText={(text) => setDonacion({ ...donacion, monto: text })}
              />
              <TextArea
                placeholder="Mensaje (opcional)"
                value={donacion.mensaje}
                onChangeText={(text) => setDonacion({ ...donacion, mensaje: text })}
              />
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button onPress={handleDonar}>Donar</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}