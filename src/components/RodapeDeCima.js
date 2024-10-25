import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';


const TopFooter = () => {
  return (
    <View style={styles.footerContainer}>
       <TouchableOpacity> 
         <Feather name="settings" size={24} color="white" />
       </TouchableOpacity>
       <TouchableOpacity> 
       <AntDesign name="smile-circle" size={24} color="white" />
       </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: "7%", // ajuste a altura conforme desejado
    backgroundColor: '#383838', // cor de fundo do rodapé
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: "row",
    paddingHorizontal: "3%",
  },
  footerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TopFooter;
