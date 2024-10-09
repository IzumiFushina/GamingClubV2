import * as React from 'react';
import { Dimensions, Image, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

// Importe suas imagens locais
const image1 = require('../images/anuncio1.png');
const image2 = require('../images/anuncio2.png');
const image3 = require('../images/anuncio3.png');

function Index({ navigation }) {
    const width = Dimensions.get('window').width;

    // Utilize as imagens importadas
    const images = [image1, image2, image3];

    // Lista de jogos com suas rotas e IDs
    const games = [
        { id: 1, name: 'Campo Minado', route: 'CampoMinado' },
        { id: 2, name: 'Jogo da Velha', route: 'JogodaVelha' },
        { id: 3, name: 'Xadrez', route: 'chess' },
        { id: 4, name: 'Jogo da Memória', route: 'JogoDaMemoria' },
        { id: 5, name: 'Jogo das Palavras', route: 'JogoPalavras' },
        { id: 6, name: 'Quiz', route: 'Quiz' },
        { id: 7, name: 'Jogo de Matemática', route: 'JogoMat' },
    ];

    // Função para navegar para o jogo específico
    const openGame = (route) => {
        navigation.navigate(route);
    };

    return (
        <View style={{ flex: 1, marginTop: 20 }}>
            <ScrollView>

                <Text style={{ fontSize: 25, marginBottom: 15 }}>Bem vindo ao GamingClub!!</Text>

                <Carousel
                    loop
                    width={width * 1}
                    height={width / 2.5} // Mantido o valor anterior
                    autoPlay={true}
                    data={images}
                    scrollAnimationDuration={1000}
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

                <Text style={{ fontSize: 25, marginTop: 30, marginBottom: 15 }}>Todos os jogos</Text>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
                    {/* 6 quadrados de jogos */}
                    {games.map((game) => (
                        <TouchableOpacity
                            key={game.id}
                            style={styles.square}
                            onPress={() => openGame(game.route)}  // Abre o jogo com a rota específica
                        >
                            <Text style={styles.squareText}>{game.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <Text style={{ fontSize: 25, marginTop: 10, marginBottom: 15 }}>TESTE</Text>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 5 }}>
                    {/* Outros quadradinhos sem jogos associados */}
                    {Array.from({ length: 6 }).map((_, index) => (
                        <View
                            key={index}
                            style={styles.square}
                        />
                    ))}
                </ScrollView>

                <Text style={{ fontSize: 25, marginTop: 10, marginBottom: 15 }}>TESTE</Text>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 5 }}>
                    {/* Mais quadradinhos sem jogos associados */}
                    {Array.from({ length: 6 }).map((_, index) => (
                        <View
                            key={index}
                            style={styles.square}
                        />
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
        height: Dimensions.get('window').width / 2.5, // Mantido o valor anterior
        resizeMode: 'cover',
    },
    square: {
        width: 120,  // Largura do quadrado
        height: 120, // Altura do quadrado
        borderRadius: 30,
        backgroundColor: '#5c4f8a', // Use a cor roxa
        marginHorizontal: 10, // Espaçamento entre os quadrados
        justifyContent: 'center',
        alignItems: 'center',
    },
    squareText: {
        color: 'white',
        fontSize: 16, // Tamanho da fonte ajustado
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Index;
