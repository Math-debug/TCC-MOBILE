import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  Keyboard,
  Alert,
  ToastAndroid
} from 'react-native';
import styles from './styles';
import LoginService from '../../Service/LoginService'

export default function App({navigation}) {

  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 80 }));
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.ValueXY({ x: 256, y: 256 }));

  useEffect(() => {
    // Animações em paralelo
    Animated.parallel([
      // Fornece um modelo de física básico (efeito mola/estilingue)
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20,
        useNativeDriver: true
      }),

      // Anima um valor ao longo do tempo
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver : true
      })
    ]).start();
  }, []);

  return (
    <>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.containerLogo}>
          <Animated.Image
            style={{
              width: logo.x,
              height: logo.y
            }}
            source={require('../../assets/logo.png')}
          />
        </View>

        <Animated.View style={[
          styles.form,
          {
            opacity: opacity,
            transform: [
              {
                translateY: offset.y
              }
            ]
          }
        ]}>
          <TextInput
            style={styles.input}
            placeholder="Usuário"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
            autoCompleteType="email"
            autoCorrect={false}
            onChangeText={(text) => { setUserName(text) }}
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            //keyboardType="visible-password"
            textContentType="password"
            autoCapitalize="none"
            autoCompleteType="password"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={(text) => { setPassword(text) }}
          />

          <TouchableOpacity
            style={styles.buttonSubmit}
            onPress={function () {
              new LoginService().login({
                userName: username,
                password: password
              }).then(data=>{
                AsyncStorage.setItem('@token',data.headers.authorization).then(()=>{
                  navigation.navigate('Anomalias')
                })
              }).catch(e=>{
                console.log('Erro',e)
                Alert.alert("Falha no login")
              })
            }}>
            <Text style={styles.submitText}>Acessar</Text>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </>
  );
};