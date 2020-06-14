import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View , Alert} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import Dialog from "react-native-dialog";

let mathQuestionList = [];
function initQuestion(){
  for (let i=0; i < 10; i++){
    mathQuestionList.push(getQuestion());
  }
}
function getQuestion(){
  const MAX = 10;
  var digit1 = Math.floor(Math.random() * MAX) + 1 ;
  var digit2 = Math.floor(Math.random() * MAX) + 1 ;

  var sign = Math.floor(Math.random() * 4) + 1 ;
  var isAdd = (sign == 1) ;
  
  var expression = isAdd ? `${digit1} + ${digit2}` : (digit1 > digit2) ? `${digit1} - ${digit2}` : `${digit2} - ${digit1}`;
  return {
    label : expression,
    digit1 : digit1,
    digit2 : digit2
  }
  // return expression;
}

function AnswerDialog(){

  const [object, setObject] = React.useState({state : false});

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {
        mathQuestionList.map((item,i) => (
        <OptionButton
        key={(i+1)} 
        icon="md-compass"
        label={`${(i+1)}) ${item.label} ? `}
        onPress={() => setObject({...item, state:true})}
        />
        ))
      }
    </ScrollView>
    <Dialog.Container visible={object.state}>
      <Dialog.Title>Result is : </Dialog.Title>
      <Dialog.Description>
        {object.label == null ? "" : object.label + " = " + eval(object.label)}
      </Dialog.Description>
      <Dialog.Button label="Done" onPress={() => setObject({...object, state : false})}/>
    </Dialog.Container>
  </>)
}

export default function LinksScreen() {
  initQuestion();
  return (
    <AnswerDialog></AnswerDialog>
  );
}

function showAnswer(obj){
  Alert.alert(
    "Answer",
    `${obj.label} = ${eval(obj.label)}`,
    [
      { text: "OK" }
    ],
    { cancelable: true }
  );
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
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
    paddingLeft : 20
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
    fontSize: 20,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});
