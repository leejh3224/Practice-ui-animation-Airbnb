import Main from 'Main'
import { YellowBox } from 'react-native'
import {
	createAppContainer,
	createStackNavigator,
} from 'react-navigation'

/**
 * Turn off some warnings
 */
YellowBox.ignoreWarnings([
	'Require cycle:',
	'Remote debugger',
	'Setting a timer',
])

export default createAppContainer(
	createStackNavigator({
		Main,
	}),
)
