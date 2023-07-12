import React, { useState} from "react";
import { Alert, Modal,View, TouchableOpacity, StyleSheet, Pressable,Text,TextInput } from "react-native";
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
        <Icon name="plus" size={25} color="#FFFF" />
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
              keyboardType="text"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => { setAction(text) }}
          />
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
                        Alert.alert("Sucesso", "Ação inserida com sucesso")
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
              <Text style={styles.textStyle}>Salvar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  )

}

export default FloatingButton;

const styles = StyleSheet.create({
  circle: {
     backgroundColor: '#f52d56',
     width: 60,
     height: 60,
     position: 'absolute',
     bottom: 40,
     right: 40,
     borderRadius: 50,
     justifyContent: 'center',
     alignItems: 'center',
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
    borderRadius: 20,
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
    fontSize:20
  },
  modalText: {
    marginBottom: 50,
    fontSize: 25,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#d3d3d3',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 22,
    borderRadius: 7,
    padding: 10,
    marginBottom: 50
  },
})