import React from 'react';
import { ScrollView, Image, TouchableOpacity } from 'react-native';
import { Box, Text, VStack, HStack, Input, Icon, Button, Pressable } from 'native-base';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const safeImage = (source) => {
  try {
    return source;
  } catch (e) {
    return null;
  }
};

const Perfil = ({ navigation }) => {
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
            source={safeImage(require('../../assets/DPG.png'))}
            alt="Logo DonaGo"
            style={{ width: 60, height: 60 }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Box width={8} />
      </Box>

      {/* Contenido scrollable */}
      <ScrollView style={{ flex: 1 }}>
        <VStack space={4} px={4} mt={6} alignItems="center">
          {/* Avatar */}
          <Image 
            source={{ uri: 'https://cdn-icons-png.freepik.com/512/3607/3607444.png' }} 
            style={{ width: 120, height: 120, borderRadius: 60 }} 
          />
          <Text bold fontSize="xl" mt={2}>USUARIO</Text>

          {/* Biografía */}
          <Box w="100%" px={4}>
            <Input
              variant="unstyled"
              placeholder="Cuéntales a los demás sobre las causas que te importan..."
              multiline
              textAlign="center"
              bg="gray.100"
              borderRadius="md"
              py={3}
              px={2}
              _focus={{ bg: 'gray.200' }}
            />
            <Pressable mt={1}>
              <Text color="gray.500" textAlign="center" underline>
                Agregar biografía
              </Text>
            </Pressable>
          </Box>

          {/* Botones */}
          <HStack space={4} mt={4}>
            <Button variant="outline" colorScheme="coolGray" size="sm">
              Compartir perfil
            </Button>
            <Button backgroundColor="black" _text={{ color: 'white' }} size="sm">
              Editar perfil
            </Button>
          </HStack>

          {/* Divider */}
          <Box w="90%" borderBottomWidth={1} borderBottomColor="gray.200" mt={6} />

          {/* Causas principales */}
          <VStack mt={4} alignItems="center" space={2}>
            <Text bold fontSize="md">Principales causas que apoyo</Text>
            <HStack space={4} mt={2}>
              <Image source={{ uri: 'https://blog.monex.com.mx/hubfs/blog/Causas-sociales-que-debe-apoyar-tu-empresa.jpg' }} style={{ width: 50, height: 50 }} />
              <Image source={{ uri: 'https://www.bupasalud.com.do/sites/default/files/inline-images/causas%20sociales-2_0.jpg' }} style={{ width: 50, height: 50 }} />
              <Image source={{ uri: 'https://s2-oglobo.glbimg.com/dvg3bgNbfkWfSWy6rOanPpM-jlY=/0x0:1920x1236/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2022/f/t/WARMvgTjmtAZUHigN2dA/team-g2a0683ee7-1920.jpg' }} style={{ width: 50, height: 50 }} />
            </HStack>
          </VStack>
          {/* Divider */}
          <Box w="90%" borderBottomWidth={1} borderBottomColor="gray.200" mt={6} />

          {/* Redes sociales */}
          <Box mt={5} mb={8} alignItems="center">
            <Text bold fontSize="md" mb={2}>Redes Sociales</Text>
            <HStack space={6}>
              <TouchableOpacity>
                <Icon as={FontAwesome} name="facebook-square" size="2xl" color="#3b5998" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon as={FontAwesome} name="twitter" size="2xl" color="#1DA1F2" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon as={FontAwesome} name="instagram" size="2xl" color="#E1306C" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon as={FontAwesome} name="youtube-play" size="2xl" color="#FF0000" />
              </TouchableOpacity>
            </HStack>
          </Box>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default Perfil;

