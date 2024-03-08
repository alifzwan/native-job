
import styles from "./screenheader.style";
import { Image, TouchableOpacity } from "react-native-web";

//  TouchableOpacity - A wrapper for making views respond properly to touches. 
//                     On press down, the opacity of the wrapped view is decreased, dimming it.


const ScreenHeaderBtn = ({ iconUrl, dimension, handlePress }) => {
  return (
    <TouchableOpacity 
      style={styles.btnContainer} 
      onPress={handlePress}>

      <Image 
        source ={iconUrl} 
        resizedMode="cover"
        style={styles.btnImg(dimension)}  
      />
      
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
