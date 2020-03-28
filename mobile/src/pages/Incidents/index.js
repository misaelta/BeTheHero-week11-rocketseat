import React,{useEffect,useState} from 'react'
import {View,Text,Image,TouchableOpacity,FlatList} from 'react-native'
import logoImg from '../../assets/logo.png'
import styles from './styles'
import { useNavigation,useRoute } from '@react-navigation/native'
import {Feather} from '@expo/vector-icons'
import api from '../../services/api'
export default function Incidents(){
   const route = useRoute();
    const [incidents,setIncidents] = useState([])
    const [total ,setTotal] = useState(0)
    const [page,setPage] = useState(1)
    const[loading,setLoading]=useState(false)
    const navigation = useNavigation();

    function navigationToDetail(incident){
        navigation.navigate('Detail',{incident})
    }
async function loadIncidents(){
    if(loading){
        return;
    }

    if(total>0 && incidents.length===total){
        return;

    }

    setLoading(true)
     const response =  await api.get('incidents',{
         params:{page}
     })
    
     setTotal(response.headers['x-total-count'])
     setIncidents([...incidents,...response.data])

     setLoading(false)
     setPage(page+1)

}
    useEffect(()=>{
        loadIncidents();

    },[])

    return(

        <View style={styles.container}>
          <View style={styles.header}>
             <Image source={logoImg}/>
             <Text style={styles.headerText}>
    Total de <Text style={styles.headerTextBold}>{total}</Text>
             </Text>
          </View>
                <Text style={styles.title}>
                Bem-vindo!
                </Text>

                <Text style={styles.description}>
                    Escolha um dos casos abaixo e salve o dia
                </Text>

                <FlatList  style={styles.incidentList}
                data={incidents}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                showsVerticalScrollIndicator={false}
                keyExtractor={incident=> String(incident.id)}
                renderItem={({item:incident})=>(
                    <View style={styles.incident}>

                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.nome}</Text>

                        <Text style={styles.incidentProperty}>Caso:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>Valor:</Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-Br',{style:'currency',currency:'BRL'}).format(incident.value)}</Text>

                   <TouchableOpacity
                   style={styles.detailsButton}
                   onPress={()=>navigationToDetail(incident)}
                   >
                   <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                   <Feather name="arrow-right" size={22} color="#E02041" />
                   </TouchableOpacity>
                </View>

                )}
                />

        </View>
            
    )
}