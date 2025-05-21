import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import {
  Box,
  Text,
  Switch,
  Heading,
  VStack,
  HStack,
  Divider,
  Button,
  Icon,
  Image,
  Modal,
  Pressable,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen({ navigation }) {
  const [notificaciones, setNotificaciones] = useState(true);
  const [modoOscuro, setModoOscuro] = useState(false);
  const [showIdiomaModal, setShowIdiomaModal] = useState(false);
  const [idiomaSeleccionado, setIdiomaSeleccionado] = useState('Español');

  // Función del toggle de Modo Oscuro, pero sin ejecutar toggleColorMode
  const handleToggleModoOscuro = () => {
    setModoOscuro(!modoOscuro);  // Solo cambia el estado local, no el modo global
  };

  const idiomasDisponibles = [
    { nombre: 'Español', bandera: '🇪🇸' },
    { nombre: 'Inglés', bandera: '🇺🇸' },
    { nombre: 'Francés', bandera: '🇫🇷' },
  ];

  const seleccionarIdioma = (idioma) => {
    setIdiomaSeleccionado(idioma);
    setShowIdiomaModal(false);
  };

  return (
    <Box flex={1}>
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
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Cuenta */}
        <VStack space={3} mb={6}>
          <Heading size="md" color="gray.500">Cuenta</Heading>
          <Button variant="ghost" justifyContent="flex-start" leftIcon={<Icon as={Ionicons} name="person-outline" size="md" />}>
            Editar perfil
          </Button>
          <Button variant="ghost" justifyContent="flex-start" leftIcon={<Icon as={Ionicons} name="lock-closed-outline" size="md" />}>
            Cambiar contraseña
          </Button>
        </VStack>

        <Divider />

        {/* Preferencias */}
        <VStack space={3} my={6}>
          <Heading size="md" color="gray.500">Preferencias</Heading>

          <HStack justifyContent="space-between" alignItems="center">
            <Text>Notificaciones</Text>
            <Switch isChecked={notificaciones} onToggle={() => setNotificaciones(!notificaciones)} />
          </HStack>

          <HStack justifyContent="space-between" alignItems="center" >
            <Text>Modo oscuro</Text>
            <Switch isChecked={modoOscuro} onToggle={handleToggleModoOscuro} />
          </HStack>

          <Button
            variant="ghost"
            justifyContent="flex-start"
            leftIcon={<Icon as={Ionicons} name="language-outline" size="md" />}
            onPress={() => setShowIdiomaModal(true)}
            _text={{ fontSize: 'md', fontWeight: 'normal' }}
            flexDirection="row"
            alignItems="center"
            px={0} // Eliminar el padding horizontal extra
            py={2} // Ajuste en el padding vertical para más espacio
          >
            <Text flex={1} textAlign="left" fontSize="md">
               Idioma ({idiomaSeleccionado === 'Español' ? '🇪🇸' : idiomaSeleccionado === 'Inglés' ? '🇺🇸' : '🇫🇷'} {idiomaSeleccionado})
            </Text>
          </Button>
        </VStack>
        <Divider />
        {/* Legal */}
        <VStack space={3} my={6}>
          <Heading size="md" color="gray.500">Legal</Heading>
          <Button variant="ghost" justifyContent="flex-start" leftIcon={<Icon as={Ionicons} name="document-text-outline" size="md" />}>
            Términos y condiciones
          </Button>
          <Button variant="ghost" justifyContent="flex-start" leftIcon={<Icon as={Ionicons} name="shield-checkmark-outline" size="md" />}>
            Política de privacidad
          </Button>
        </VStack>
      </ScrollView>

      {/* Modal de idioma */}
      <Modal isOpen={showIdiomaModal} onClose={() => setShowIdiomaModal(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Seleccionar idioma</Modal.Header>
          <Modal.Body>
            <VStack space={3}>
              {idiomasDisponibles.map(({ nombre, bandera }) => (
                <Pressable key={nombre} onPress={() => seleccionarIdioma(nombre)}>
                  <HStack alignItems="center" space={3} py={2}>
                    <Text fontSize="xl">{bandera}</Text>
                    <Text fontSize="md">{nombre}</Text>
                  </HStack>
                </Pressable>
              ))}
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Box>
  );
}