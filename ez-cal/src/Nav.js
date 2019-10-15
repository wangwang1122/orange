import React, { Component} from 'react';
import LinkGenerator from "./LinkGenerator";
import './App.css'
import PropTypes from 'prop-types'


export default class Nav extends Component {
		
	static propTypes ={
		link: PropTypes.string
	}

	render () {


		return (

			<div className="navBar">
				<div className="userInfo">Welcome, user!</div>
				<LinkGenerator message={this.props.link}/>
			</div>

			)

	}
}