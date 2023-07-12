import React, { useState} from "react";
import { Alert, Modal,View, TouchableOpacity, StyleSheet, Pressable,Text,TextInput, ToastAndroid } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import UserService from "../Service/UserService";
import anomalyActionService from "../Service/AnomalyActionService";

const FloatingButton = (item) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [action,setAction] = useState(null);
  return(
    <>
    <View style={{
      flex: 1
    }}>
      <TouchableOpacity
        style={styles.circle}
        onPress={() => {
          setModalVisible(true)
        }}
      >
        <Icon name="plus" size={25} color="#000000" />
      </TouchableOpacity>
    </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Adicionar Ação</Text>
            <TextInput
              style={styles.input}
              placeholder="Descrição da ação"
              keyboardType="text"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => { setAction(text) }}
          />
          <View style={styles.container}>
          <Pressable
              style={[styles.button, styles.buttonClose, {alignItems:"flex-start", marginRight: 15, backgroundColor:"#808080"}]}
              onPress={() => {
                setModalVisible(!modalVisible)
                }}>
              <Text style={{...styles.textStyle}}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible)
                let actionAnomaly = {}
                new UserService()
                  .getUsers().then(data => {
                    actionAnomaly.user = data.data
                    actionAnomaly.anomaly = {...item.item}
                    actionAnomaly.observation = action
                    console.log(actionAnomaly)
                    if(action != null){
                      new anomalyActionService().createAnomalyAction(actionAnomaly).then(()=>{
                        ToastAndroid.show('Ação inserida', ToastAndroid.SHORT)
                        setModalVisible(!modalVisible)
                      }).catch(e=>{
                        Alert.alert("Erro", e.message)
                      })
                    }
                    else{
                      Alert.alert("Erro", "Campo de observação não preenchido")
                      setModalVisible(!modalVisible)
                    }
                })
                }}>
              <Text style={styles.textStyle}>OK</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )

}

export default FloatingButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 5,
    height: '100%',
    flexDirection: "row"
  },
  circle: {
     backgroundColor: '#FFFFFF',
     width: 60,
     height: 60,
     position: 'absolute',
     bottom: 40,
     right: 40,
     borderRadius: 50,
     justifyContent: 'center',
     alignItems: 'center',
     borderWidth: 1
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    width: 300,
    height:300,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#56baed',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize:18
  },
  modalText: {
    marginBottom: 50,
    fontSize: 18,
    textAlign: 'center',
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
  },
  input: {
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 15,
    borderRadius: 7,
    padding: 10,
    marginBottom: 50
  },
})