import { Image, StyleSheet, View, TextInput} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import React, { useState } from 'react';

let INITIAL_TEXT = "大家好";

export default function ChineseScreen() {
  const [questionList, setQuestionList] = useState(Array.from(INITIAL_TEXT)); 
  const [text, setText] = useState(INITIAL_TEXT); 

  const onEndEditing = (value) => {
    let text = value.nativeEvent.text;
    if (text.trim() != ""){
      let wordList= Array.from(text.trim());
      wordList = wordList.filter(x => x.charCodeAt(0).toString(16).length == 4);
      if (wordList.length == 0) {
        wordList = Array.from(INITIAL_TEXT);
      }
      setText(wordList.join(","));
      console.log(text)
      setQuestionList(wordList);
    };
  }

  const getWordURL = (word) => {
    let baseURL = 'https://www.hanzi5.com/assets/bishun/animation/%UNICODE%-bishun.gif';
    var decimal = word.charCodeAt(0);
    var hex = decimal.toString(16);
    return baseURL.replace("%UNICODE%", hex);
  }
console.log(text)
  return (
    <View style={styles.container} >
      <TextInput
        style={styles.textInput}
        onEndEditing={text => onEndEditing(text)}
        placeholder="輸入一些中文"
        // value={text}
      />
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {
            questionList.map((word,i) => (
                <Image key={i} source={{uri : getWordURL(word)}} style={{width: 200, height: 200}} />
              ))
          }
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    flexDirection: 'row', flexWrap:'wrap',
    paddingTop: 0, marginHorizontal : 5,
    alignItems: 'center'
  },
  textInput : {
    height: 40, borderColor: 'gray', 
    borderWidth: 1 , marginHorizontal: 5, 
    marginVertical : 2, padding : 10, 
    borderRadius: 5
  }
});
