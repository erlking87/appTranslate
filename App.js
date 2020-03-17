import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Clipboard } from 'react-native';
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

      fetch('http://52.141.7.91:8200/phonetic/' + this.state.todoText)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({bodyText: JSON.stringify(responseJson['phon_word']), translate: '복사'});
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
        <View style={styles.SectionStyle}>
          <Image style={styles.ImageStyle} source={require('./assets/magnify.png')}/>
          <TextInput style={styles.inputText}
            placeholder="Enter Here"
            value={this.state.todoText}
            onChangeText={this.changeText}/>
          
        </View>  
          
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
    alignItems: 'stretch',
    backgroundColor: '#f4f4f4'
  },
  topLayout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d32421'
  },
  midLayout: {
    flex: 0.6,
    flexDirection: 'row'
  },
  btn1: {
    width: "50%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginRight: 1,
    marginTop: 10,
    backgroundColor: '#aaaba3'
  },
  btn2: {
    width: "50%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginLeft: 1,
    marginTop: 10,
    backgroundColor: "#42a701"
  },
  bottomLayout: {
    flex: 5,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: 'gray',
    height: 70,
    borderRadius: 15,
    margin: 50,
    width: "90%"
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  inputText: {
    flex: 1,
    fontSize: 25
  },
  resText: {
    marginTop: 20, fontSize: 20
  }
});
