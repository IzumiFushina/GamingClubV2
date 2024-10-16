import * as React from 'react';
import { Dimensions, Image, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

// Importe suas imagens locais
const image1 = require('../images/anuncio1.png');
const image2 = require('../images/anuncio2.png');
const image3 = require('../images/anuncio3.png');
const gameImage1 = require('../images/Campo(2).png'); 
const gameImage2 = require('../images/velha.png'); 
const gameImage3 = require('../images/xadrez.png'); 
const gameImage4 = require('../images/memoria (1).png'); 
const gameImage5 = require('../images/xadrez.png'); 
const gameImage6 = require('../images/xadrez.png'); 
const gameImage7 = require('../images/xadrez.png'); 

function Index({ navigation }) {
    const width = Dimensions.get('window').width;

    // Utilize as imagens importadas
    const images = [image1, image2, image3];
    const gameImages = [gameImage1, gameImage2, gameImage3]; // Array de imagens para os jogos

    // Lista de jogos com suas rotas, IDs e imagens associadas
    const games = [
        { id: 1, name: 'Campo Minado', route: 'CampoMinado', image: gameImage1 },
        { id: 2, name: 'Jogo da Velha', route: 'JogodaVelha', image: gameImage2 },
        { id: 3, name: 'Xadrez', route: 'chess', image: gameImage3 },
        { id: 4, name: 'Jogo da Memória', route: 'JogoDaMemoria', image: gameImage4 },
        { id: 5, name: 'Jogo das Palavras', route: 'JogoPalavras', image: gameImage5 },
        { id: 6, name: 'Quiz', route: 'Quiz', image: gameImage6 },
        { id: 7, name: 'Jogo de Matemática', route: 'JogoMat', image: gameImage7 },
        // Adicione mais jogos e imagens aqui
    ];

    // Função para navegar para o jogo específico
    const openGame = (route) => {
        navigation.navigate(route);
    };

    return (
        <View style={{ flex: 1, marginTop: 20 }}>
            <ScrollView>

                <Text style={{ fontSize: 25, marginBottom: 20 }}>Bem vindo ao GamingClub!!</Text>

                <Carousel
                    loop
                    width={width * 1}
                    height={width / 2.5}
                    autoPlay={true}
                    data={images}
                    scrollAnimationDuration={2000}
                    onSnapToItem={(index) => console.log('current index:', index)}
                    renderItem={({ index }) => (
                        <View style={styles.carouselItem}>
                            <Image
                                source={images[index]}
                                style={styles.carouselImage}
                            />
                        </View>
                    )}
                />

                <Text style={{ fontSize: 25, marginTop: 40, marginBottom: 20 }}>Todos os jogos</Text>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
                    {/* Quadrados de jogos com imagens */}
                    {games.map((game) => (
                        <View key={game.id} style={{ alignItems: 'center' }}>
                            <TouchableOpacity
                                style={styles.square}
                                onPress={() => openGame(game.route)}
                            >
                                <Image source={game.image} style={styles.squareImage} />
                            </TouchableOpacity>
                            <Text style={styles.captionText}>{game.name}</Text>
                        </View>
                    ))}
                </ScrollView>

                <Text style={{ fontSize: 25, marginTop: 10, marginBottom: 15 }}>TESTE</Text>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 5 }}>
                    {/* Outros quadradinhos sem jogos associados */}
                    {Array.from({ length: 6 }).map((_, index) => (
                        <View key={index} style={styles.squareEmpty} />
                    ))}
                </ScrollView>

                <Text style={{ fontSize: 25, marginTop: 10, marginBottom: 15 }}>TESTE</Text>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 5 }}>
                    {/* Mais quadradinhos sem jogos associados */}
                    {Array.from({ length: 6 }).map((_, index) => (
                        <View key={index} style={styles.squareEmpty} />
                    ))}
                </ScrollView>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    carouselItem: {
        flex: 1,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    carouselImage: {
        width: "100%",
        borderRadius: 30,
        height: Dimensions.get('window').width / 2.5,
        resizeMode: 'cover',
    },
    square: {
        width: 120,
        height: 120,
        borderRadius: 30,
        overflow: 'hidden',
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    squareImage: {
        width: '100%',  
        height: '100%',
        resizeMode: 'cover',
    },
    captionText: {
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5,
    },
    squareEmpty: {
        width: 120,
        height: 120,
        borderRadius: 30,
        backgroundColor: '#5c4f8a',
        marginHorizontal: 10,
    },
});

export default Index;
