import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Clipboard } from 'react-native';
import { render } from 'react-dom';

export default class App extends React.Component  {

  constructor(props){
    super(props);
    this.state ={ 
                  bodyText: '----------',
                  todoText: '',
                  translate: '변환'
                };
  }

  translate = () => {
    console.log('test');
    
    if(this.state.translate == '복사') {
      Clipboard.setString(this.state.bodyText);
      alert('Copied to Clipboard!');
    } else {

      if(this.state.todoText.length == 0) {
        alert('변환할 글자가 없습니다.');
        return;
      }

      fetch('https://reactnative.dev/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({bodyText: JSON.stringify(responseJson['title']), translate: '복사'});
      })
      .catch((error) =>{
        console.error(error);
      });

    }
  }

  clearText = () => {
    this.setState({todoText: '', bodyText: '----------', translate: '변환'});
  }

  changeText = (todoText) => {
    if(todoText.length == 0) {
      this.setState({translate:'변환'})
    }
    this.setState({todoText})
  }

  render() {
    return (
      <View style={styles.containLayout}>
        <View style={styles.topLayout}>
          <Text style={{color: "white", fontWeight: "550", fontSize: 20}}>발음기호 번역기</Text>
        </View>

        <View style={styles.midLayout}>
          <TouchableOpacity style={styles.btn1} onPress={this.clearText}>
            <Text style={{color: "white", fontWeight: "550", fontSize: 20}}>지우기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn2} onPress={this.translate}>
            <Text style={{color: "white", fontWeight: "550", fontSize: 20}}>{this.state.translate}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomLayout}>
          <TextInput style={styles.inputText}
            value={this.state.todoText}
            onChangeText={this.changeText}/>
          <Text style={styles.resText}>{this.state.bodyText}</Text>
        </View>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containLayout: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  topLayout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray'
  },
  midLayout: {
    flex: 1,
    flexDirection: 'row'
  },
  btn1: {
    width: "50%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginRight: 0.5,
    backgroundColor: 'skyblue'
  },
  btn2: {
    width: "50%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginLeft: 0.5,
    backgroundColor: "skyblue"
  },
  bottomLayout: {
    flex: 5,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  inputText: {
    width: "90%", height: 60, borderColor: 'gray', borderWidth: 2, borderRadius: 15, marginTop: 50, fontSize: 25
  },
  resText: {
    marginTop: 20, fontSize: 20
  }
});
