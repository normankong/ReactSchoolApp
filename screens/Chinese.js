import * as React from 'react';
import { Image, StyleSheet, Text, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


var str = "爸";
var n = str.charCodeAt(0);
var n = n.toString(16);
let wordList = ['環','保','廢','物', '我','你','爸','媽','男','女'];

function initQuestionList(){

  let COUNT = 5;
  // Shuffle array
  // const shuffled = wordList.sort(() => 0.5 - Math.random());

  // Get sub-array of first n elements after shuffled
  // let selected = shuffled.slice(0, COUNT);
  let selected = wordList.slice(0, COUNT);
  return selected;
}

function getWordURL(word)
{
  let baseURL = 'https://www.hanzi5.com/assets/bishun/animation/%UNICODE%-bishun.gif';
  //let baseURL = 'https://strokeorder.com.tw/bishun-animation/%UNICODE%-stroke-order.gif'
  var decimal = word.charCodeAt(0);
  var hex = decimal.toString(16);

  return baseURL.replace("%UNICODE%", hex);
}

export default function ChineseScreen() {
  let questionList = initQuestionList();

  return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {
          questionList.map((word,i) => (
              <Image key={i} source={{uri : getWordURL(word)}} style={{width: 300, height: 300}} />
            ))
        }
      </ScrollView>
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
  }
});
