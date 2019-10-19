import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, Button, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux'
import Colors from '../constants/Colors';
import { TextInput } from 'react-native-gesture-handler';

class SettingsScreen extends React.Component {
	constructor(props) {
		super(props)
		this.avatar = this.props.navigation.state.params.avatar
		this.cover = this.props.navigation.state.params.cover
		this.bio = this.props.navigation.state.params.bio
		this.username = this.props.navigation.state.params.username
	}

	async uploadSettings() {
		const response = await fetch('https://api.imgur.com/3/account/me/settings', {
			method: 'put',
			headers: {
				'Authorization': 'Bearer ' + this.props.token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ bio: this.bio, username: this.username })
		})
		const data = await response.json()
		if (data.success) {
			Alert.alert('Success')
			this.props.navigation.goBack()
		} else {
			Alert.alert('An error occurred')
		}
	}
	render() {
		return (
			<View style={styles.container}>
				<ImageBackground source={{ uri: this.cover }} style={{ flex: 2, width: null, height: null, justifyContent: 'center', alignItems: 'center' }}>
					<Image source={{ uri: this.avatar }} style={{ width: 100, height: 100, resizeMode: 'contain' }} />
				</ImageBackground>
				<View style={{ flex: 3 }}>
					<Text style={[styles.textTitle]}>Username</Text>
					<View style={{ flexDirection: 'row' }}>
						<View style={{ flex: 1 }}></View>
						<TextInput defaultValue={this.username} style={[styles.textInput]} onChangeText={text => this.username = text}></TextInput>
						<View style={{ flex: 1 }}></View>
					</View>
					<Text style={[styles.textTitle]}>Bio</Text>
					<View style={{ flexDirection: 'row' }}>
						<View style={{ flex: 1 }}></View>
						<TextInput placeholder={'Tell imgur about yourself...'} placeholderTextColor={'grey'} defaultValue={this.bio} style={[styles.textInput]} onChangeText={text => this.bio = text}></TextInput>
						<View style={{ flex: 1 }}></View>
					</View>
					<View style={{ flex: 1, flexDirection: 'row' }}>
						<TouchableOpacity style={{ flex: 1 }} onPress={() => this.uploadSettings()}>
							<Text style={{ color: 'green', marginTop: 'auto', marginLeft: 'auto', paddingBottom: 20, paddingRight: 20 }}>Save</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}

function mapStateToProps(state) {
	return {
		token: state.token,
		username: state.username,
		authorizationHeader: state.authorizationHeader
	}
}

export default connect(mapStateToProps)(SettingsScreen)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.backgroundColor,
	},
	text: {
		color: 'white'
	},
	textTitle: {
		color: 'grey',
		fontSize: 10,
		paddingLeft: 20,
		paddingTop: 10,
	},
	textInput: {
		flex: 10,
		color: 'white',
		paddingLeft: 30,
		borderBottomColor: 'grey',
		borderBottomWidth: 0.5,
		paddingTop: 5,
		textAlign: 'left',
	}
});
