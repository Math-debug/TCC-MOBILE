import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet, Alert, AsyncStorage, ToastAndroid } from 'react-native'
import Login from '../Container/Login'
import Anomalias from '../Container/Anomalias'

const Stack = createStackNavigator();
const styles = StyleSheet.create({
    submitText: {
        color: '#FFF',
        fontSize: 19,
    },
})


function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{
                headerTitle: '',
                headerStyle: { backgroundColor: '#F0F0F0' },
            }} />

            <Stack.Screen name="Anomalias" component={Anomalias} options={{
                headerTitle: 'Anomalias',
                headerStyle: { backgroundColor: '#56baed' },
            }} />

        </Stack.Navigator>

    );
}

export default function Route() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}