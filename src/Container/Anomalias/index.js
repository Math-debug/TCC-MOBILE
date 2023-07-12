import React, { useState, useEffect } from 'react';

import {
  SafeAreaView,
  FlatList,
  Text,
  Pressable,
  View
} from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import styles from './styles';
import anomalyService from '../../Service/AnomalyService'
import FloatingButton from '../../Componente/FloatingButton'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      selected: {}
    };
  }

  componentDidMount(){
    this.getAnomalys()
  }

  getAnomalys(){
    new anomalyService().getAnomalys().then(data=>{
      this.setState({
        selected: this.state.selected,
        dataSource: data.data.filter(x => {
          return x.statusid != 'CLOSED'
        }).map(x => x)
      })
      setTimeout(()=>{
        this.getAnomalys()
      },3000)
    }).catch(e=>{
      console.log('Erro',e)
      setTimeout(()=>{
        this.getAnomalys()
      },3000)
    })
  }

  loadUrgence(urgence) {
    if (urgence == 'HIGH') {
        return '#ff6961'
    } else if (urgence == 'MEDIUM') {
        return '#add8e6'
    } else {
        return '#90ee90'
    }
  }

  fortmateDate(date) {
    if (date == null) {
        return null
    }
    const data = new Date(date);

    const dia = this.adicionarZero(data.getDate());
    const mes = this.adicionarZero(data.getMonth() + 1);
    const ano = data.getFullYear();
    const horas = this.adicionarZero(data.getHours());
    const minutos = this.adicionarZero(data.getMinutes());
    const segundos = this.adicionarZero(data.getSeconds());

    // Criando a string formatada
    return dia + "/" + mes + "/" + ano + " " + horas + ":" + minutos + ":" + segundos;
  }
  adicionarZero(numero) {
    if (numero < 10) {
        return "0" + numero;
    }
    return numero;
  }

  render() {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) => {
              return (
                <Pressable onPress={()=>{
                  this.setState({
                    dataSource: this.state.dataSource,
                    selected: item
                  })
                }}>
                <View style={ this.state.selected.anomalyid == item.anomalyid ? {...styles.container, flexDirection: "row", backgroundColor:"#d3d3d3"} : {...styles.container, flexDirection: "row"} }>
                <View>
                <AntDesign name="exclamationcircle" size={50} color={this.loadUrgence(item.urgeceid)}
                style={{marginTop: 20, borderRadius: 50, borderWidth: 1,}}/>
                </View>
                <View style={styles.itemDetail}>
                  <Text style={styles.item}>{"idEquipamento: " + item.keepAlive.equipment.id}</Text>
                  <Text style={{...styles.item, fontWeight: 'bold'}}>{item.anomalytype.description}</Text>
                  <Text style={styles.item}>{this.fortmateDate(item.createdat)}</Text>
                </View>
                </View>
                </Pressable>)
            }
            }
          />
          { this.state.selected.anomalyid != null &&
          <FloatingButton item={this.state.selected}/>
          }
        </SafeAreaView>
      </>
    )
  };
};