import React, {useState} from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { InputForm } from '../../components/InputForm';
import { useForm } from 'react-hook-form/dist/useForm';
import { CategorySelect } from '../CategorySelect';
import { Button } from '../../components/Forms/Button';
import {useNavigation} from '@react-navigation/native'
import uuid from 'react-native-uuid'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { Container,
Header,
Title,
Form,
Fields,
TransactionType } from './styles';

interface FormData{
    name: string;
    amount: string
}

const schema = Yup.object().shape({
    name: Yup.string().required('Nome e obrigatório'),
    amount: Yup.number().typeError('Informe um valor númerico').positive('O valor não pode ser negativo').required('O valor é obrigatório')
})

export function Register() {
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });
    const dataKey = '@gofinances: transactions';
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    function handleTransactionTypeSelect(type: 'up' | 'down'){
        setTransactionType(type)
    }
    const navigation = useNavigation();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    })

    function handlecloseSelectCategoryModal(){
        setCategoryModalOpen(false);
    }

    function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true);
    }

     async function handleRegister(form: FormData){
        if(!transactionType)
            return Alert.alert('Selecione o tipo da transação')
        if(category.key === 'category')
            return Alert.alert('Selecione a categoria')
        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key,
            date: new Date()
        }
        try{
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];
            const dataFormatTed = [
                ...currentData,
                newTransaction 
            ]
            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatTed))
            reset();
            setTransactionType('');
            setCategory({
                key: 'category',
                name: 'Categoria'
            });

            navigation.navigate('Listagem')
        }catch (error){
            console.log(error);
            Alert.alert('Não foi possivel salvar')
        }
    }


    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            <Form>
                    <Fields>
                        <InputForm
                            name='name'
                            control={control}
                            placeholder='Nome'
                            autoCapitalize='sentences'
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                            />
                        <InputForm
                            name='amount'
                            control={control}
                            placeholder='Preço'
                            keyboardType='numeric'
                            error={errors.amount && errors.amount.message}
                            />
                            <TransactionType>
                                <TransactionTypeButton 
                                    type='up'
                                    title='income'
                                    onPress={() => handleTransactionTypeSelect('up')}
                                    isActive={transactionType === 'up'}/>
                                <TransactionTypeButton 
                                    type='down'
                                    title='outcome'
                                    onPress={() => handleTransactionTypeSelect('down')}
                                    isActive={transactionType === 'down'}/> 
                            </TransactionType>   
                            <CategorySelectButton title={category.name}
                            onPress={handleOpenSelectCategoryModal}/>
                    </Fields>
                <Button title='Enviar'
                onPress={handleSubmit(handleRegister)}/>
            </Form>

            <Modal visible={categoryModalOpen}>
                <CategorySelect 
                 category={category}
                 setCategory={setCategory}
                 closeSelectCategory={handlecloseSelectCategoryModal}
                 />
            </Modal>


        </Container>
        </TouchableWithoutFeedback>
    )
}