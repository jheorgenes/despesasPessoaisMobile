import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, TextInput, Button, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';


export default function App() {

	const [despesas, setDespesas] = useState([]);
	const [id, setId] = useState(0);
	const [nomeDespesa, setNomeDespesa] = useState('');
	const [valorDespesa, setValorDespesa] = useState(0);
	const [formaPagamento, setFormaPagamento] = useState('');
	const [valorDevido, setValorDevido] = useState(0);

	const atualizarValores = (lDespesas) => {
		const valor = lDespesas.reduce((acc, item) => acc + Number(item.valor), 0);
		setValorDevido(valor);
	}

	const addDespesa = () => {
		// addDespesaAPI()
		// buscarDespesasAPI();
		const despesaAtualizada = [...despesas, {id,  nome: nomeDespesa, valor: valorDespesa, formaPagamento: formaPagamento }];
		setDespesas(despesaAtualizada);
		atualizarValores(despesaAtualizada);

		setId("");
		setNomeDespesa("");
		setFormaPagamento("");
		setValorDespesa("");
	}

	const deletarDespesa = (id) => {
		const novaLista = despesas.filter(despesa => despesa.id !== id);
		setDespesas(novaLista);
		atualizarValores(novaLista);

		//deletarPelaAPI()
	}

	const buscarDespesasAPI = async () => {
		// asdfaskdfhasdfjkaskfjd
		// Busca
		// soma
	}

	useEffect(() => {
		// buscarDespesas();
	}, []);

	return (
		<View>
			<SafeAreaView style={styles.container}>
				<View style={{ flex: 1 }}>
					<Text style={{ fontSize: 30, color: 'white' }}>Bem-Vindo, Usuário!</Text>

					<Text style={{ fontSize: 20, color: 'white' }}>Total de Gastos: R$ {valorDevido}</Text>

					<TextInput 
						value={id} 
						onChangeText={setId} 
						style={{ width: '100%', heigth: 30, backgroundColor: 'white', marginTop: 10 }} 
						placeholder="Código">							
					</TextInput>

					<TextInput 
						value={nomeDespesa} 
						onChangeText={setNomeDespesa} 
						style={{ width: '100%', heigth: 30, backgroundColor: 'white', marginTop: 10 }} 
						placeholder="Nome despesa">							
					</TextInput>
					
					<TextInput 
						value={formaPagamento} 
						onChangeText={setFormaPagamento} 
						style={{ width: '100%', heigth: 30, backgroundColor: 'white', marginTop: 10 }} 
						placeholder="Forma Pagamento">
					</TextInput>

					<TextInput 
						value={valorDespesa} 
						onChangeText={setValorDespesa} 
						style={{ width: '100%', heigth: 30, backgroundColor: 'white', marginBottom: 10, marginTop: 10 }}
						placeholder="Valor despesa">
					</TextInput>
					
					<Button onPress={addDespesa} title='Adicionar Despesa' ></Button>
				</View>
			</SafeAreaView>

			<FlatList 
				showsVerticalScrollIndicator={false}
				data={despesas}
				keyExtractor={item => item.id}
				renderItem={({ item }) => (
					<View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginBottom: 10, paddingBottom: 10, paddingLeft: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
						<View>
							<Text>Nome: {item.nome}</Text>
							<Text>Forma Pagamento: {item.formaPagamento}</Text>
							<Text>Valor: {item.valor}</Text>
						</View>

						<TouchableOpacity onPress={() => deletarDespesa(item.id)}>
							<AntDesign name="delete" size={22} color="black" />
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
