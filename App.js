import React, { Component } from 'react';
import {Container,Header,Content,Footer,Thumbnail,Text,Icon,Button,Item,Input,
  View,Card,CardItem,List,ListItem,Left,Right,Body,} from 'native-base';
import { ScrollView,Image }from 'react-native'
import axios from 'axios';

class App extends Component {
constructor() {
super();
this.state = {resto: [],menu:''};
}

klik(){
var url = 'https://developers.zomato.com/api/v2.1/search?q='+this.state.menu;
var config = {headers:{'user-key':'97c9c86ba4a160576297af2c91093330'}};

axios.get(url, config).then((ambilData) => {
console.log(ambilData);
this.setState({resto: ambilData.data.restaurants})
})};

render() {
  const data=this.state.resto.map((item,index)=>{
    
    return( <Card avatar key={index}>
    <CardItem header>
      <Left>
        <Thumbnail source={{uri:item.restaurant.thumb}}/>
        <Body>
          <Text>{item.restaurant.name}</Text>
          <Text note>{item.restaurant.location.city}</Text>
        </Body>
      </Left>
      <Right>
        <Text>Rp {item.restaurant.average_cost_for_two/2}</Text>
      </Right>
    </CardItem>
    <CardItem cardBody>
      <Image source={{uri:item.restaurant.thumb}} style={{height:400,width:400,flex:1}}/>
    </CardItem>
    <CardItem footer>
      <Left><Button transparent>
        <Icon name="flag"/>
        </Button>
        <Text>{item.restaurant.location.restaurant}</Text>
      </Left>
    </CardItem>
    </Card>
    )
  })
  return (
   <Container>
      <Header searchBar rounded>
        <Item>
        <Button transparent onPress={()=>this.klik()}><Icon name="search"/></Button>
          <Input placeholder="Silahkan input menu..." onChangeText={(x)=>{this.setState({menu:x})}} />
        </Item>
       </Header>
     <ScrollView>
       {data}
     </ScrollView>
   </Container>
  );
}}
    
export default App;
    