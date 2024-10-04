import * as React from 'react';
import { Dimensions, Image, View,Text, StyleSheet, ScrollView } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

// Importe suas imagens locais
const image1 = require('../images/anuncio1.png');
const image2 = require('../images/anuncio2.png');
const image3 = require('../images/anuncio3.png');

function Index() {
    const width = Dimensions.get('window').width;

    // Utilize as imagens importadas
    const images = [image1, image2, image3];

    return (
        <View style={{ flex: 1, marginTop: 20, }}>
            <ScrollView>

            <Text style={{fontSize: 25, marginBottom: 15 }}> Bem vindo ao GamingClub!! </Text>

            <Carousel
                loop
                width={width * 1}
                height={width / 2}
                autoPlay={true}
                data={images}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => (

                    <View
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 30,
                        }}
                    >
                        <Image
                            source={images[index]} // Use a imagem importada
                            style={{
                                width: "100%",
                                borderRadius: 30,
                                height: width / 2,
                                resizeMode: 'cover', // Ajusta a imagem
                            }}
                        />
                    </View>
                    
                )}
            />

            <Text style={{fontSize: 25, marginTop: 30, marginBottom: 15 }}> Todos os jogos </Text>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginTop: 10,} }>
        {/* 6 quadrados */}
        <View style={styles.square} />
        <View style={styles.square} />
        <View style={styles.square} />
        <View style={styles.square} />
        <View style={styles.square} />
        <View style={styles.square} />
      </ScrollView>

      <Text style={{fontSize: 25, marginTop: 10, marginBottom: 15 }}> TESTE </Text>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginTop: 5,}}>
        {/* 6 quadrados */}
        <View style={styles.square} />
        <View style={styles.square} />
        <View style={styles.square} />
        <View style={styles.square} />
        <View style={styles.square} />
        <View style={styles.square} />
      </ScrollView>

      <Text style={{fontSize: 25, marginTop: 10, marginBottom: 15 }}> TESTE </Text>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginTop: 5,}}>
      {/* 6 quadrados */}
     <View style={styles.square} />
     <View style={styles.square} />
     <View style={styles.square} />
     <View style={styles.square} />
     <View style={styles.square} />
     <View style={styles.square} />
     </ScrollView>


       </ScrollView>
        </View>
      
        
    );
}

const styles = StyleSheet.create({
    square: {
      width: 150,  // Largura do quadrado
      height: 150, // Altura do quadrado
      borderRadius: 30,
      backgroundColor: 'blue', // Cor dos quadrados
      marginHorizontal: 10, // Espaçamento entre os quadrados
    },
  });

export default Index;
