import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
// import * as React from 'react';
import * as React from 'react';
import { Image, StyleSheet, Text, View , Alert} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import Dialog from "react-native-dialog";

let wordList = [
  {
    word: 'Apple',
    require: require('../assets/images/Apple.png')
  },
  {
    word: 'Orange',
    require: require('../assets/images/Orange.png')
  },
  {
    word: 'Mango',
    require: require('../assets/images/Mango.png')
  },
  {
    word: 'Watermelon',
    require: require('../assets/images/Watermelon.png')
  },
  {
    word: 'Pear',
    require: require('../assets/images/Pear.png')
  }
];

let questionList = [];
function initQuestion(){
  for (let i=0; i < wordList.length; i++){
    questionList.push(getQuestion(wordList[i]));
  }
}
function getQuestion(object){
  var word = object.word.toUpperCase();
  var wordLength = word.length;
  var expression= "";
  var missingCharPos = Math.floor(Math.random() * wordLength);
  for (var i=0; i < wordLength; i++){
    expression += (missingCharPos == i) ? "_" : word[i];
  }
console.log(object.require)
  return {
    label : expression,
    word : word,
    missing : word[missingCharPos],
    image : object.require
  }
}


function AnswerDialog(){

  const [object, setObject] = React.useState({missing:"", state : false});

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {
        questionList.map((item,i) => (
        <OptionButton
          key={i} 
          icon="md-compass"
          label={`${item.label}`}
          onPress={() => setObject({...item, state:true})}
          word={item}
          />
        ))
      }
      </ScrollView>
      <Dialog.Container visible={object.state}>
        <Dialog.Title>Missing word is : </Dialog.Title>
        <Dialog.Description>
          {object.missing}
        </Dialog.Description>
        <Dialog.Button label="Done" onPress={() => setObject({missing:"", state : false})}/>
      </Dialog.Container>
    </>
  )
}

export default function EnglishScreen() {
  initQuestion();
  
  return (
      <AnswerDialog></AnswerDialog>
  );
}



function OptionButton({ icon, label, onPress, isLastOption, word }) {

  // console.log(word);
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <Image 
        source={word.image}
        style={{width: 150, height: 150}} />
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
    alignItems: 'center'
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 30,
    alignSelf: 'flex-start',
    marginTop: 1,
  }
});
