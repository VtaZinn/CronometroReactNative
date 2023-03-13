/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;


function App(): JSX.Element {
    const [seconds,setSeconds] = useState(0);
    const [minutes,setMinutes] = useState(0);
    const [customInterval, setCustomInterval] = useState <NodeJS.Timer>();
    const [registro, setRegistro] = useState([""]);
    
    const startTimer = () => {
      setCustomInterval (
        setInterval(() => {
          changeTime()
        }, 1000
        ))
    }

    const stopTimer = () => {
      if (customInterval){
        clearInterval(customInterval)
      }
      
      setRegistro([...registro,`${minutes} : ${seconds}`])
    }

    const clear = () => {
      stopTimer()
      setSeconds(0)
      setMinutes(0)
      setRegistro([''])
    }

    const changeTime = () => {
      setSeconds((prevState) => {
        if(prevState + 1 == 60){
          setMinutes(minutes + 1)
          return 0;
        }
        return prevState + 1
      })
    }







  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  console.log(registro);

  return (
    <SafeAreaView style={styles.container}>

      <Text> Senac Esportes </Text>
       <Image style={styles.logoEsporte} source={require('./logo.jpg')} />
       
        <Text style = {styles.textTimer}>
          {minutes < 10 ? "0" + minutes : minutes} :
          {seconds < 10 ? "0" + seconds : seconds} 
        </Text>
        <View style = {styles.buttonContainer}>
          <Button title="Começar" onPress={startTimer}/>
          <Button title="Parar" onPress={stopTimer}/>
          <Button title="Limpar" onPress={clear}/>
        </View>
        
      {registro  && <View style={styles.registro}>
        <View style={styles.DivRegistro}>
            <Text>
                Nº de Registro
            </Text>
            <View>
              <View style={styles.flex}>
                {registro.map((item,index) => {return <Text>{index}</Text>})}
              </View>
            </View>               
        </View>
       
        <View>
            <Text>
                Tempo
            </Text>
            <View>
              <View style={styles.flex}>
                {registro.map((item,index) => {return <Text>{item}</Text>})}
              </View>
            </View> 
        </View>
      </View> 
      }
        
        
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  logoEsporte :{
    width: 250,
    height: 250,
  },

  flex : {
    flexGrow: 2,
    height: 100,
    flexDirection: 'column',
  },

  posicao : {
    width: "100%",
  },

  DivRegistro : {
    width: 230,
  },
  
  registro : {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: 'space-between'
  },

  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },

  textTimer: {
    fontSize: 30,
  },

  buttonContainer: {
    width: "50%",
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  }
});


export default App;
