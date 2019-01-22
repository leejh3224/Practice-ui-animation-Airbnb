import Main from 'Main'
import { YellowBox, Animated, Easing } from 'react-native'
import {
	createAppContainer,
	createStackNavigator,
} from 'react-navigation'

import ImageModal from 'ImageModal'

/**
 * Turn off some warnings
 */
YellowBox.ignoreWarnings([
	'Require cycle:',
	'Remote debugger',
	'Setting a timer',
])

export default createAppContainer(
	createStackNavigator(
		{
			Main,
			ImageModal,
		},
		{
			mode: 'modal',
			transitionConfig: () => ({
				transitionSpec: {
					duration: 300,
					easing: Easing.out(Easing.poly(4)),
					timing: Animated.timing,
					useNativeDriver: true,
				},
				screenInterpolator: ({ position, scene }) => {
					const { index } = scene

					const opacity = position.interpolate({
						inputRange: [index - 1, index],
						outputRange: [0, 1],
					})

					return { opacity }
				},
			}),
		},
	),
)
