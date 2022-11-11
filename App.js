import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, TextInput, Button, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import Axios from 'axios';

export default function App() {

    // Estrutura
    const [despesas, setDespesas] = useState([]);
    const [id, setId] = useState(0);
    const [nomeDespesa, setNomeDespesa] = useState('');
    const [valorDespesa, setValorDespesa] = useState(0);
    const [formaPagamento, setFormaPagamento] = useState('');
    const [tipoLancamento, setTipoLancamento] = useState('');
    const [valorDevido, setValorDevido] = useState(0);

    const atualizarValores = (Despesas) => {
        const valor = Despesas.reduce((acc, item) => acc + Number(item.valor), 0);
        setValorDevido(valor);
    }

    // Consumindo API
    const baseURL = 'http://192.168.1.85:8080/despesas';

    const getData = async () => {
        const response = await Axios.get(baseURL);
        setDespesas(response.data);
        atualizarValores(response.data)
    }

    const postData = async () => {
        await Axios.post(baseURL, { nome: nomeDespesa, valor: valorDespesa, formaPagamento: formaPagamento, tipoLancamento: tipoLancamento });
    }

    const deleteData = async (id) => {
        await Axios.delete(`${baseURL}/${id}`);
    }

    // Ações para renderizar os dados no APP.
    const limpaForm = () => {
        setId("");
        setNomeDespesa("");
        setFormaPagamento("");
        setTipoLancamento("");
        setValorDespesa("");
    }

    const addDespesa = async () => {
        await postData();
        await getData();
        limpaForm();
    }

    const deletarDespesa = async (id) => {
        await deleteData(id);
        await getData();
    }

    // Função Hooks 
    useEffect(() => {
        getData();
    }, []);

    // Componente da Página (já com a estilização)
    return (
        <View>
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 30, color: 'white' }}>Bem-Vindo, Usuário!</Text>

                    <Text style={{ fontSize: 20, color: 'white' }}>Total de Gastos: R$ {valorDevido}</Text>

                    <TextInput
                        value={nomeDespesa}
                        onChangeText={setNomeDespesa}
                        style={{ width: '100%', heigth: 30, backgroundColor: 'white', marginTop: 20, borderRadius: 5, paddind: 5 }}
                        placeholder=" Nome despesa">
                    </TextInput>

                    <TextInput
                        value={formaPagamento}
                        onChangeText={setFormaPagamento}
                        style={{ width: '100%', heigth: 30, backgroundColor: 'white', marginTop: 10, borderRadius: 5, paddind: 5 }}
                        placeholder=" Forma Pagamento">
                    </TextInput>

                    <TextInput
                        value={tipoLancamento}
                        onChangeText={setTipoLancamento}
                        style={{ width: '100%', heigth: 30, backgroundColor: 'white', marginTop: 10, borderRadius: 5, paddind: 5 }}
                        placeholder=" Tipo Lançamento">
                    </TextInput>

                    <TextInput
                        value={valorDespesa}
                        onChangeText={setValorDespesa}
                        style={{ width: '100%', heigth: 30, backgroundColor: 'white', marginBottom: 10, marginTop: 10, borderRadius: 5, paddind: 5 }}
                        placeholder=" Valor despesa"
                    >
                    </TextInput>

                    <Button style={{ borderRadius: 5 }} onPress={addDespesa} title='Adicionar Despesa' ></Button>
                </View>
            </SafeAreaView>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={despesas}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={{
                        borderBottomColor: 'gray',
                        borderBottomWidth: 1,
                        marginBottom: 10,
                        paddingBottom: 10,
                        paddingLeft: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <View>
                            <Text style={{ fontSize: 15, fontStyle: 'solid', marginTop: 10 }}>Nome: {item.nome}</Text>
                            <Text style={{ fontSize: 15, fontStyle: 'solid' }}>Forma Pagamento: {item.formaPagamento}</Text>
                            <Text style={{ fontSize: 15, fontStyle: 'solid' }}>Tipo Lançamento: {item.tipoLancamento}</Text>
                            <Text style={{ fontSize: 15, fontStyle: 'solid' }}>Valor: {item.valor}</Text>
                        </View>

                        <TouchableOpacity onPress={() => deletarDespesa(item.id)}>
                            <AntDesign name="delete" size={25} color="red" style={{ margin: 15 }} />
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: 100 }}>
                        <Text>Não há despesas inseridas!</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 40,
        backgroundColor: '#33CCFF',
        height: 320
    },
    containerDados: {
        padding: 30,
    }
});
