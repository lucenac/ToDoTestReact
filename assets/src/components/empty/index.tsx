import { Image, Text, View } from "react-native";
import EmptyImage from '../../assets/Empty.png';
import { styles } from "./styles";
import { style } from "../Loading/styles";

export function Empty(){
    return <View style = {styles.emptyContainer}>
        <Image source={EmptyImage} style={styles.image}/>
        <Text style={styles.textBold}>Você ainda não tem tarefas cadastradas</Text>
        <Text style={[styles.textBold, styles.textRegular]}>Crie tarefas e organize seus itens a fazer</Text>
    </View>
}