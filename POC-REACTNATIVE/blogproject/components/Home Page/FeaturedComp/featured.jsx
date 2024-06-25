import { ImageBackground, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
import FeaturedStyles from "./featuredstyle";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/core";


export default function Featured({Isfeatured, categoryColor}) {
  const navigation = useNavigation();

  const handleLinkPress = (postId) => {
    navigation.navigate('Post Detail', { postId });
  };
    return (
      <ScrollView>
        <View style={FeaturedStyles.container}>
          {Isfeatured.map((item,index) => (
           <ImageBackground key={index} source={{uri : item.postImages}} style={ index === 0 ? FeaturedStyles.image1 : FeaturedStyles.images}>
           <View style={FeaturedStyles.content1}>
              <View style={[ index === 0 ? FeaturedStyles.redLabel : FeaturedStyles.features, { backgroundColor: categoryColor[item.postCategory] || "crimson"}]}>
              <FontAwesomeIcon icon={ faCircle } color={ 'white' } size={ 13 } /><Text style={FeaturedStyles.categoryColor}> {item.postCategory}</Text>
              </View>
              <TouchableWithoutFeedback onPress={()=>handleLinkPress(item.postId)}>
              <Text style={FeaturedStyles.heading1}>{item.postName}</Text>
              </TouchableWithoutFeedback>
              { index === 0 && <Text style={FeaturedStyles.description1}>{item.shortDescription}</Text>}
            </View>
           </ImageBackground>
          ))}
        </View>
        </ScrollView>
    );
  };