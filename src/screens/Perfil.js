import React, { useState } from 'react';
import { ScrollView, Image, TouchableOpacity, Share } from 'react-native';
import {Box, Text, VStack, HStack, Input, Icon, Button, Pressable, Modal, useToast} from 'native-base';
import * as ImagePicker from 'expo-image-picker';
//Instalar esta extensión si no la tienen "npm install expo-image-picker"
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const Perfil = ({ navigation }) => {
  const toast = useToast();

  const [bio, setBio] = useState('');
  const [username, setUsername] = useState('USUARIO');
  const [avatarUri, setAvatarUri] = useState('https://cdn-icons-png.freepik.com/512/3607/3607444.png');
  const [showEditModal, setShowEditModal] = useState(false);

  // Causas
  const [causas, setCausas] = useState([
    {
      uri: 'https://blog.monex.com.mx/hubfs/blog/Causas-sociales-que-debe-apoyar-tu-empresa.jpg',
      descripcion: 'Ayudar a niños en situación vulnerable'
    },
    {
      uri: 'https://www.bupasalud.com.do/sites/default/files/inline-images/causas%20sociales-2_0.jpg',
      descripcion: 'Donaciones a comunidades necesitadas'
    },
    {
      uri: 'https://s2-oglobo.glbimg.com/dvg3bgNbfkWfSWy6rOanPpM-jlY=/0x0:1920x1236/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2022/f/t/WARMvgTjmtAZUHigN2dA/team-g2a0683ee7-1920.jpg',
      descripcion: 'Apoyo a iniciativas de caridad social'
    }
  ]);

  const [selectedCause, setSelectedCause] = useState(null);
  const [showCauseModal, setShowCauseModal] = useState(false);

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: '¡Mira mi perfil en DonaGo!',
      });
      if (result.action === Share.sharedAction) {
        toast.show({ description: 'Perfil compartido exitosamente.' });
      }
    } catch (error) {
      toast.show({ description: 'No se pudo compartir el perfil.' });
    }
  };

  const pickImage = async (index = null) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      toast.show({ description: 'Permiso para acceder a la galería denegado.' });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      if (index === null) {
        setAvatarUri(result.assets[0].uri);
      } else {
        const nuevasCausas = [...causas];
        nuevasCausas[index].uri = result.assets[0].uri;
        setCausas(nuevasCausas);
      }
    }
  };

  return (
    <Box flex={1} bg="white">
      {/* Encabezado */}
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
            style={{ width: 60, height: 60 }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Box width={8} />
      </Box>

      {/* Contenido */}
      <ScrollView style={{ flex: 1 }}>
        <VStack space={4} px={4} mt={6} alignItems="center">
          {/* Avatar */}
          <TouchableOpacity onPress={() => pickImage()}>
            <Image
              source={{ uri: avatarUri }}
              style={{ width: 120, height: 120, borderRadius: 60 }}
            />
          </TouchableOpacity>
          <Text bold fontSize="xl" mt={2}>{username}</Text>

          {/* Biografía */}
          <Box w="100%" px={4}>
            <Input
              variant="unstyled"
              placeholder="Cuéntanos más acerca de ti..."
              multiline
              textAlign="center"
              bg="gray.100"
              borderRadius="md"
              py={3}
              px={2}
              _focus={{ bg: 'gray.200' }}
              value={bio}
              onChangeText={setBio}
            />
            <Pressable mt={1} onPress={() => setShowEditModal(true)}>
              <Text color="gray.500" textAlign="center" underline>
                Tap para editar biografía, nombre o foto
              </Text>
            </Pressable>
          </Box>

          {/* Botones */}
          <HStack space={4} mt={4}>
            <Button variant="outline" colorScheme="coolGray" size="sm" onPress={handleShare}>
              Compartir perfil
            </Button>
            <Button backgroundColor="black" _text={{ color: 'white' }} size="sm" onPress={() => setShowEditModal(true)}>
              Editar perfil
            </Button>
          </HStack>

          <Box w="90%" borderBottomWidth={1} borderBottomColor="gray.200" mt={6} />

          {/* Causas principales */}
          <VStack mt={4} alignItems="center" space={2}>
            <Text bold fontSize="md">Principales causas que apoyo</Text>
            <HStack space={4} mt={2}>
              {causas.map((causa, index) => (
                <TouchableOpacity key={index} onPress={() => { setSelectedCause(causa); setShowCauseModal(true); }}>
                  <Image source={{ uri: causa.uri }} style={{ width: 50, height: 50, borderRadius: 8 }} />
                </TouchableOpacity>
              ))}
            </HStack>
          </VStack>

          <Box w="90%" borderBottomWidth={1} borderBottomColor="gray.200" mt={6} />

          {/* Redes sociales */}
          <Box mt={5} mb={8} alignItems="center">
            <Text bold fontSize="md" mb={2}>Redes Sociales</Text>
            <HStack space={6}>
              <TouchableOpacity><Icon as={FontAwesome} name="facebook-square" size="2xl" color="#3b5998" /></TouchableOpacity>
              <TouchableOpacity><Icon as={FontAwesome} name="twitter" size="2xl" color="#1DA1F2" /></TouchableOpacity>
              <TouchableOpacity><Icon as={FontAwesome} name="instagram" size="2xl" color="#E1306C" /></TouchableOpacity>
              <TouchableOpacity><Icon as={FontAwesome} name="youtube-play" size="2xl" color="#FF0000" /></TouchableOpacity>
            </HStack>
          </Box>
        </VStack>
      </ScrollView>

      {/* Modal de edición de perfil */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Editar Perfil</Modal.Header>
          <Modal.Body>
            <VStack space={4}>
              <TouchableOpacity onPress={() => pickImage()} style={{ alignSelf: 'center' }}>
                <Image source={{ uri: avatarUri }} style={{ width: 80, height: 80, borderRadius: 40 }} />
                <Text fontSize="xs" mt={1} textAlign="center" color="gray.500">Cambiar foto</Text>
              </TouchableOpacity>
              <Input placeholder="Nombre de usuario" value={username} onChangeText={setUsername} />
              <Input multiline placeholder="Actualiza tu biografía..." value={bio} onChangeText={setBio} bg="gray.100" borderRadius="md" py={2} px={3} />
              {causas.map((causa, index) => (
                <Box key={index}>
                  <Text bold fontSize="xs" mt={2}>Causa #{index + 1}</Text>
                  <TouchableOpacity onPress={() => pickImage(index)} style={{ alignSelf: 'flex-start' }}>
                    <Image source={{ uri: causa.uri }} style={{ width: 60, height: 60, borderRadius: 6 }} />
                  </TouchableOpacity>
                  <Input
                    placeholder="Descripción de la causa"
                    value={causa.descripcion}
                    onChangeText={(text) => {
                      const nuevasCausas = [...causas];
                      nuevasCausas[index].descripcion = text;
                      setCausas(nuevasCausas);
                    }}
                  />
                </Box>
              ))}
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button onPress={() => setShowEditModal(false)}>Guardar</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      {/* Modal para mostrar descripción de causa */}
      <Modal isOpen={showCauseModal} onClose={() => setShowCauseModal(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Descripción</Modal.Header>
          <Modal.Body>
            <Text>{selectedCause?.descripcion}</Text>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Box>
  );
};

export default Perfil;
