import React from 'react';
import { WebView } from 'react-native-webview';
import { Box, Image, Icon } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CampañaWeb({ route, navigation }) {
  const { url } = route.params;

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
        {/* Botón hamburguesa */}
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon as={Ionicons} name="menu" size="xl" color="black" />
        </TouchableOpacity>

        {/* Logo centrado */}
        <TouchableOpacity onPress={() => navigation.navigate('Principal')}>
                <Image
                  source={require('../../assets/DPG.png')}
                  alt="Logo DonaGo"
                  width={60}
                  height={60}
                  resizeMode="contain"
                />
                </TouchableOpacity>

        {/* Espacio invisible para balancear */}
        <Box width={8} />
      </Box>

      {/* WebView debajo del encabezado */}
      <Box flex={1}>
        <WebView
          source={{ uri: url }}
          startInLoadingState
        />
      </Box>
    </Box>
  );
}
