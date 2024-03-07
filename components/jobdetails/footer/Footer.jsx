import { View, Text, TouchableOpacity, Image, Linking } from "react-native";

import styles from "./footer.style";
import { icons } from "../../../constants";

const Footer = ({ url }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.likeBtn}>
        <Image source={icons.heart} style={styles.likeBtnImage}/>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.applyBtn} 
        onPress={() => Linking.openURL(url)}>
          
        <Text style={styles.applyBtnText}>Apply For Jobs</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
