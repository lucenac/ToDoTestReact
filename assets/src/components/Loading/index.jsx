import { ActivityIndicator, View } from "react-native-web";
import { styles } from "../../screens/styles";
import { theme } from "../../theme";

export function Loading(){
    return<View style={styles.container}>
        <ActivityIndicator size={50} color={theme.colors.brand.blue}/>
    </View>
}