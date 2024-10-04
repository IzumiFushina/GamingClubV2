import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, PanResponder, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const pieceSize = 100;
const gridSize = 3;
const containerSize = pieceSize * gridSize;

const imageSrc = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1200px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg';

const PuzzleGame = () => {
  const [pieces, setPieces] = useState([]);
  const [moveCount, setMoveCount] = useState(0);
  const [message, setMessage] = useState('');
  const [draggingPiece, setDraggingPiece] = useState(null);

  // Initialize puzzle pieces
  useEffect(() => {
    const generatedPieces = [];
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        generatedPieces.push({
          x,
          y,
          currentX: new Animated.Value(x * pieceSize),
          currentY: new Animated.Value(y * pieceSize),
          backgroundPosition: {
            x: -x * pieceSize,
            y: -y * pieceSize,
          },
        });
      }
    }
    setPieces(generatedPieces);
    shufflePuzzle(generatedPieces);
  }, []);

  // Shuffle puzzle pieces
  const shufflePuzzle = (pieces) => {
    pieces.forEach((piece) => {
      const randomX = Math.floor(Math.random() * (containerSize - pieceSize));
      const randomY = Math.floor(Math.random() * (containerSize - pieceSize));
      Animated.timing(piece.currentX, {
        toValue: randomX,
        duration: 0,
        useNativeDriver: false,
      }).start();
      Animated.timing(piece.currentY, {
        toValue: randomY,
        duration: 0,
        useNativeDriver: false,
      }).start();
    });
    setMoveCount(0);
    setMessage('');
  };

  const checkWin = () => {
    const isWin = pieces.every((piece) => {
      const x = Math.round(piece.currentX._value / pieceSize);
      const y = Math.round(piece.currentY._value / pieceSize);
      return x === piece.x && y === piece.y;
    });

    if (isWin) {
      setMessage('Congratulations! You solved The Starry Night puzzle!');
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt, gestureState) => {
      const { x0, y0 } = gestureState;
      const selectedPiece = pieces.find(
        (piece) =>
          x0 >= piece.currentX._value &&
          x0 <= piece.currentX._value + pieceSize &&
          y0 >= piece.currentY._value &&
          y0 <= piece.currentY._value + pieceSize
      );
      if (selectedPiece) setDraggingPiece(selectedPiece);
    },
    onPanResponderMove: (evt, gestureState) => {
      if (draggingPiece) {
        Animated.timing(draggingPiece.currentX, {
          toValue: gestureState.moveX - pieceSize / 2,
          duration: 0,
          useNativeDriver: false,
        }).start();
        Animated.timing(draggingPiece.currentY, {
          toValue: gestureState.moveY - pieceSize / 2,
          duration: 0,
          useNativeDriver: false,
        }).start();
      }
    },
    onPanResponderRelease: () => {
      setDraggingPiece(null);
      setMoveCount(moveCount + 1);
      checkWin();
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.puzzleArea}>
        <Text style={styles.title}>Starry Night Loose Puzzle</Text>
        <View style={styles.puzzleContainer}>
          {pieces.map((piece, index) => (
            <Animated.View
              {...panResponder.panHandlers}
              key={index}
              style={[
                styles.puzzlePiece,
                {
                  transform: [
                    { translateX: piece.currentX },
                    { translateY: piece.currentY },
                  ],
                },
              ]}
            >
              <Image
                source={{ uri: imageSrc }}
                style={{
                  width: pieceSize * gridSize,
                  height: pieceSize * gridSize,
                  position: 'absolute',
                  top: piece.backgroundPosition.y,
                  left: piece.backgroundPosition.x,
                }}
              />
            </Animated.View>
          ))}
        </View>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.moveCounter}>Moves: {moveCount}</Text>
      </View>
      <Image
        style={styles.referenceImage}
        source={{ uri: imageSrc }}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6e6fa',
  },
  puzzleArea: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  puzzleContainer: {
    width: containerSize,
    height: containerSize,
    backgroundColor: '#4a4a4a',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  puzzlePiece: {
    width: pieceSize,
    height: pieceSize,
    position: 'absolute',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4a4a4a',
  },
  message: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4a4a4a',
  },
  moveCounter: {
    marginTop: 10,
    fontSize: 18,
    color: '#4a4a4a',
  },
  referenceImage: {
    width: 300,
    height: 300,
    marginLeft: 20,
    borderRadius: 10,
  },
});

export default PuzzleGame;
