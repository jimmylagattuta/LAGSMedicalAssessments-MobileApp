import React from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection } from '../common/Card';

// import Button from '../common/Button';

const AssessmentDetail = ({ assessment }) => {
	const { title } = assessment;
	const { headerContentStyle, headerTextStyle } = styles;
	console.log('assessment.title, ', title);
	return (
		<View>
			<Card>
				<CardSection style={headerContentStyle}>
					<Text style={headerTextStyle}>{title}</Text>
				</CardSection>
			</Card>
		</View>
	);
};

const styles = {
	headerContentStyle: {
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
	headerTextStyle: {
		fontSize: 18
	}

};

export default { AssessmentDetail };


					// <Button 
					// 	style={headerTextStyle}
					// 	assessment={assessment}
					// 	onPress={() => console.log('onPress Button')}
					// >
					// 	{title}
					// </Button>
