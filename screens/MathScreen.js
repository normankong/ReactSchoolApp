import * as React from 'react';
import { StyleSheet, Text, View , FlatList} from 'react-native';
import { Button } from 'react-native-elements';
import { RectButton } from 'react-native-gesture-handler';
import Dialog from "react-native-dialog";
import * as Speech from 'expo-speech';

const NO_OF_QUESTION = 10;

export default function LinksScreen() {
  const initQuestion = (callback) => {
    let tmp = [];
    for (let i=0; i < NO_OF_QUESTION; i++){
      tmp.push(getQuestion(i));
    }
    if (callback != null) callback(tmp);
    return tmp;
  }

  const getQuestion = (i) => {
    const MAX1 = 999;
    const MAX2 = 99;
    const BIAS = 9;
    var digit1 = 0;
    var digit2 = Math.floor(Math.random() * MAX2) + 1 ;
  
    while(digit1 < digit2){
      digit1 = Math.floor(Math.random() * MAX1) + 1 ;
    }

    var sign = Math.floor(Math.random() * BIAS) + 1 ;
    var isAdd = (sign > 3) ;
    
    var expression = isAdd ? `${digit1} + ${digit2}` : (digit1 > digit2) ? `${digit1} - ${digit2}` : `${digit2} - ${digit1}`;
    return {
      id :i,
      label : expression,
      sign : isAdd ? "+" : "-",
      digit1 : digit1,
      digit2 : digit2
    }
  }


  const showAnswer = (object) =>{
    Speech.speak(`${object.label.replace("-", "減") + " 係等於 " + eval(object.label)}`, {rate : 0.8, pitch : 1.5});
    setObject(object);
  }

  const [questionList, setQuestionList] = React.useState(initQuestion()); 
  const [object, setObject] = React.useState({state : false});

  return (
    <>
      <Button title="再來一次" onPress={() => initQuestion(setQuestionList)}/>

      <FlatList
        data={questionList}
        numColumns={2}
        horizontal={false}
        renderItem={({ item }) => (
          <OptionButton
            item={item}
            label={`${item.label} ? `}
            onPress={() => showAnswer({...item, state:true})}
          />
        )}
        keyExtractor={item => item.id}
      />

      <Dialog.Container visible={object.state}>
        <Dialog.Title>答案係 : </Dialog.Title>
        <Dialog.Description>
          {object.label == null ? "" : object.label + " = " + eval(object.label)}
        </Dialog.Description>
        <Dialog.Button label="Done" onPress={() => setObject({...object, state : false})}/>
      </Dialog.Container>
    </>
  );
}

function OptionButton({ item, onPress }) {

  let digit1 = item.digit1.toString().padStart(5);
  let digit2 = item.digit2.toString().padStart(5);

  return (
    <RectButton style={styles.option} onPress={onPress}>
      <View style={{ flexDirection: 'row', marginHorizontal : 20}}>
        <View>
          <Text style={styles.optionText}>{digit1}</Text>
          <View style={styles.bottomLine}>
            <Text style={styles.optionText}>{item.sign} {digit2}</Text>
          </View>
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },

  bottomLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 30,
    fontFamily : 'monospace',
    marginTop: 0,
    textAlign: 'right'
  },

});
