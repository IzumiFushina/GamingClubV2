import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { View, Text, Image } from "react-native";

// IMPORTANDO PÁGINAS
import Cadastro from "../pages/Cadastro";
import CampoMinado from "../pages/CampoMinado";
import JogoDaMemoria from "../pages/JogoDaMemoria";
import Login from "../pages/Login";
import Quiz from "../pages/Quiz";
import JogoMat from "../pages/JogoMat";
import chess from "../pages/chess";
import JogodaVelha from "../pages/JogodaVelha";
import JogoPalavras from "../pages/JogoPalavras";
import QuebraCabeca from "../pages/QuebraCabeca";
import Catalogo from "../pages/Catalogo";
import JogoDoClick from "../pages/JogoDoClick";
import ChatScreen from "../pages/Chat";

const Drawer = createDrawerNavigator();

// Função de conteúdo personalizado do Drawer
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ padding: 20, alignItems: 'center', }}>
      <Image
          source={require("../images/foto13.png")}
          style={{ width: 65, height: 65 }}
        />
        <Text style={{ marginVertical: 10, fontWeight: 'bold', fontSize: 16 }}>Bem vindo ao</Text>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>GamingClub</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function Index() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Login" component={Login} />       
        <Drawer.Screen name="Cadastro" component={Cadastro} /> 
        <Drawer.Screen name="CampoMinado" component={CampoMinado} /> 
        <Drawer.Screen name="JogoDaMemoria" component={JogoDaMemoria} />
        <Drawer.Screen name="Quiz" component={Quiz} />
        <Drawer.Screen name="JogoMat" component={JogoMat} />
        <Drawer.Screen name="chess" component={chess} />
        <Drawer.Screen name="JogodaVelha" component={JogodaVelha} />
        <Drawer.Screen name="JogoPalavras" component={JogoPalavras} />
        <Drawer.Screen name="QuebraCabeca" component={QuebraCabeca} />
        <Drawer.Screen name="Catalogo" component={Catalogo} />
        <Drawer.Screen name="Chat" component={ChatScreen} />
        <Drawer.Screen name="JogoDoClick" component={JogoDoClick} />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}





