import React, { useEffect, useState } from "react";  
import {Feather} from '@expo/vector-icons'
import { RFValue } from "react-native-responsive-fontsize";

import { Container, Header, UserInfo, Photo, User, UserGreeting, UserName, UserWrapper, Icon, HighlightCards, Transactions, Title, TransactionsList, LogoutButton } from "./styles";
import { HighlightCard } from "../../components/HighlightCard/Index";
import { TransactionCard } from "../../components/TransactionCard/index"

export interface DataListProps extends TransactionCardProps{
    id: string;
}

export function Dashboard(){
    const [data, setData] = useState<DataListProps[]>([]);
    async function loadTransactions(){
        
    }
    useEffect(() => {

    }, [])
    return(
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={require('./styles/Capturar.PNG')}/>
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Marlei</UserName>
                        </User>
                    </UserInfo>
                </UserWrapper>
                <LogoutButton onPress={() => {}}>
                    <Icon name="power"/>
                </LogoutButton>
            </Header>
            
            <HighlightCards>
                <HighlightCard  type="up"   title="Entradas" amount="R$ 10.000,00" lastTransaction="Ultima entrada dia 10 de maio 2022"/>
                <HighlightCard  type="down" title="Saidas" amount="R$ 5.000,00" lastTransaction="Ultima saida dia 10 de junho 2022"/>
                <HighlightCard  type="total"   title="Total" amount="R$ 5.000,00" lastTransaction="10 maio a 10 junho"/>
            </HighlightCards>

            <Transactions>
                <Title>

                </Title>
                <TransactionsList
                data={data}
                renderItem={({ item }) => <TransactionCard data={item}/> }
                />
                
            </Transactions>
        </Container>
    )
}
