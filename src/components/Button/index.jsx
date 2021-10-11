import React from 'react';

import PropTypes from 'prop-types';

import styled from 'styled-components/native';

function Button(props) {
    return <ButtonTimer onPress={props.onPress}>{props.children}</ButtonTimer>;
}

const ButtonTimer = styled.TouchableOpacity`
  padding: 10px;
  background-color: #9e9bbd68;
  border-radius: 25px;
  color: #fff;
  margin: 0 20px;
  width: auto;
`;

export default Button;

Button.propTypes = {
    onPress: PropTypes.func.isRequired,
    children: PropTypes.node,
};
