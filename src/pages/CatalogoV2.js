import React, { useRef } from 'react';
import { Dimensions, Image, View, Text, StyleSheet, ScrollView } from 'react-native';
import PagerView from 'react-native-pager-view';
import Carousel from 'react-native-reanimated-carousel';

// Suas imagens
const image1 = require('../images/anuncio1.png');
const image2 = require('../images/anuncio2.png');
const image3 = require('../images/anuncio3.png');

const games = [
    { id: 1, name: 'Campo Minado' },
    { id: 2, name: 'Jogo da Velha' },
    { id: 3, name: 'Xadrez' },
];
const footerImage = require('../images/GamingClubRodape.png');

function CatalogoV2() {
    const width = Dimensions.get('window').width;
    const pagerRef = useRef(null);
    
    const handlePageChange = (e) => {
        const index = e.nativeEvent.position;
        // Reset to the first/last page to simulate infinite scrolling
        if (index === 0) {
            pagerRef.current.setPage(games.length);
        } else if (index === games.length + 1) {
            pagerRef.current.setPage(1);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Seu rodapé na parte superior</Text>
                </View>

                <Text style={styles.title}>Bem-vindo ao GamingClub!!</Text>

                <Carousel
                    loop
                    width={width}
                    height={width / 2.5}
                    autoPlay={true}
                    data={[image1, image2, image3]}
                    renderItem={({ index }) => (
                        <View style={styles.carouselItem}>
                            <Image source={[image1, image2, image3][index]} style={styles.carouselImage} />
                        </View>
                    )}
                />

                <Text style={styles.subtitle}>Todos os jogos</Text>

                <PagerView
                    style={styles.pagerView}
                    initialPage={1}
                    onPageSelected={handlePageChange}
                    ref={pagerRef}
                >
                    <View style={styles.page}><Text style={styles.pageText}>Jogo 3</Text></View>
                    {games.map((game) => (
                        <View key={game.id} style={styles.page}>
                            <Text style={styles.pageText}>{game.name}</Text>
                        </View>
                    ))}
                    <View style={styles.page}><Text style={styles.pageText}>Jogo 1</Text></View>
                </PagerView>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#14012b',
    },
    header: {
        paddingVertical: 20,
        backgroundColor: '#1f1f1f', // Cor de fundo do cabeçalho
        alignItems: 'center',
    },
    headerText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 25,
        marginBottom: 20,
        color: "#d99bdd",
        fontFamily: 'Font3',
    },
    subtitle: {
        fontSize: 25,
        marginTop: 40,
        marginBottom: 20,
        color: "#d99bdd",
        fontFamily: 'Font3',
    },
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
    pagerView: {
        height: 200, // Ajuste a altura conforme necessário
        backgroundColor: 'red',
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageText: {
        fontSize: 30,
        color: '#ffffff',
    },
});

export default CatalogoV2;
