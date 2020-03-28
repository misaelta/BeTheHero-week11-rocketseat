import React from 'react'
import {View,Text,Image,TouchableOpacity,Linking} from 'react-native'
import styles from './styles'
import {Feather} from '@expo/vector-icons'
import logoImg from '../../assets/logo.png'
import {useNavigation,useRoute} from '@react-navigation/native'
import * as Mailcomposer from 'expo-mail-composer'

export default function Detail(){
const route = useRoute();
const incident =route.params.incident
const navigation =useNavigation()
const message = `Ola ${incident.nome} , estou entrando em contato porque  eu gostaria de ajudar no caso  ${incident.title} com o valor de ${ Intl.NumberFormat('pt-Br',{style:'currency',currency:'BRL'}).format(incident.value)}`

function navitageBack(){
    navigation.goBack()
}


function sendEmail(){

    Mailcomposer.composeAsync({
        subject:`Heroi do caso:${incident.title}`,
        recipients:[incident.email],
        body:message

        
    })

}

function sendWhatsapp(){
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)


}

    return(

        <View style={styles.container}> 
         <View style={styles.header}>
             <Image source={logoImg}/>

             <TouchableOpacity  onPress={navitageBack}>
              <Feather name="arrow-left" size={28} color="#E82041"></Feather>

             </TouchableOpacity>
        
          </View>
          
          <View style={styles.incident}>

          <Text style={[styles.incidentProperty],{marginTop:0}}>ONG:</Text>
    <Text style={styles.incidentValue}>{incident.nome} de {incident.city}/{incident.uf}</Text>

            <Text style={styles.incidentProperty}>Caso:</Text>
    <Text style={styles.incidentValue}>{incident.description}</Text>

             <Text style={styles.incidentProperty}>Valor:</Text>
             <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-Br',{style:'currency',currency:'BRL'}).format(incident.value)}</Text>
             </View>
           < View  style={styles.contactBox}>
               <Text style={styles.heroTitle}>Salve o dia!</Text>
               <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
               <Text style={styles.heroDescription}>Entre em contato:</Text>
           <View style={styles.actions}>
             <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>

                 <Text style={styles.actionText}>WhatsApp</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.action} onPress={sendEmail}>

            <Text style={styles.actionText}>E-mail</Text>
            </TouchableOpacity>
             
 
          
           </View>


          </View>

        </View>
    )
}