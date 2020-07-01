import * as React from 'react';
import { Image, StyleSheet, Text, View, FlatList} from 'react-native';
import { Button } from 'react-native-elements';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import Dialog from "react-native-dialog";
import * as Speech from 'expo-speech';


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
  },
  {
    word: 'Strawberry',
    require: require('../assets/images/Strawberry.png')
  }
];


export default function EnglishScreen() {
 
  const initQuestion = (callback) => {

    // Randome the Array
    // const shuffled = wordList.sort(() => 0.5 - Math.random());
    // let selected = shuffled.slice(0, COUNT);

    let tmp = [];
    for (let i=0; i < wordList.length; i++){
      tmp.push(getQuestion(wordList[i], i));
    }
    if (callback != null) callback(tmp);
    return tmp;
  }

  const getQuestion = (object, id) => {
    let word = object.word.toUpperCase();
    let wordLength = word.length;
    let expression= "";
    let missingCharPos = Math.floor(Math.random() * wordLength);
    for (let i=0; i < wordLength; i++){
      expression += (missingCharPos == i) ? "_" : word[i];
    }

    return {
      id : id,
      label : expression,
      word : word,
      missing : word[missingCharPos],
      image : object.require
    }
  }

  const showAnswer = (object) =>{
    Speech.speak(`The missing word for ${object.word} is ${object.missing}`, {rate : 0.5, pitch : 1.5});
    setObject(object);
  }
  
  const [questionList, setQuestionList] = React.useState(initQuestion()); 
  const [object, setObject] = React.useState({missing:"", state : false});

  return (
    <>
      <Button title="Again" onPress={() => initQuestion(setQuestionList)}/>

      <FlatList
        data={questionList}
        numColumns={2}
        horizontal={false}
        renderItem={({ item }) => (
          <OptionButton
            item={item}
            label={`${item.label}`}
            onPress={() => showAnswer({...item, state:true})}
          />
        )}
        keyExtractor={item => item.id}
      />

      <Dialog.Container visible={object.state}>
        <Dialog.Title>Missing word is : </Dialog.Title>
        <Dialog.Description>
          {object.missing}
        </Dialog.Description>
        <Dialog.Button label="Done" onPress={() => setObject({missing:"", state : false})}/>
      </Dialog.Container>
    </>
  );
}



function OptionButton({ label, onPress, item }) {
  return (
    <RectButton style={[styles.option]} onPress={onPress}>
      <Image 
        source={item.image}
        style={styles.imageStyle} />
      <View style={{ flexDirection: 'row' }}>
        <View>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  optionText: {
    fontSize: 25,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  imageStyle :{
    width: 160, 
    height: 160
  }
});
