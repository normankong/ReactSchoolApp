import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import Dialog from "react-native-dialog";

export default function LinksScreen() {


  const initQuestion = (callback) => {
    let tmp = [];
    for (let i=0; i < 10; i++){
      tmp.push(getQuestion());
    }
    if (callback != null) callback(tmp);
    return tmp;
  }

  const getQuestion = () => {
    const MAX = 999;
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
  }

  const [questionList, setQuestionList] = React.useState(initQuestion()); 
  const [object, setObject] = React.useState({state : false});

  return (
    <>
      <Button title="再來一次" onPress={() => initQuestion(setQuestionList)}/>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {
        questionList.map((item,i) => (
        <OptionButton
          key={(i+1)} 
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
    </>
  );
}

function OptionButton({ label, onPress, isLastOption }) {
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
    paddingVertical: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 20,
    fontFamily : 'monospace',
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  button : {
    borderWidth: 1 , marginHorizontal: 10, 
    marginVertical : 5, padding : 10, 
    backgroundColor:"red",
    borderRadius: 5
  }
});
