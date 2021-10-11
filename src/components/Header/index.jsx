import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

function Header(props) {
    return <Title color={props.color}>{props.children}</Title>;
}

const Title = styled.Text`
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  color: ${(props) => props.color};
`;

export default Header;

Header.propTypes = {
    color: PropTypes.string,
    children: PropTypes.node,
};
