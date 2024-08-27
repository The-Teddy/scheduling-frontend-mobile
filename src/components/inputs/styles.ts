import styled, { css } from "styled-components/native";
import { TextInput, ViewProps } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

interface IContainerProps extends ViewProps {
  hasError: boolean;
  isFocused: boolean;
  isFilled?: boolean;
}
interface ITextContainerProps extends ViewProps {
  hasError: boolean;
  isFocused: boolean;
  isFilled?: boolean;
}

export const Container = styled.View`
  width: 85%;
  height: ${RFValue(50)}px;
  flex-direction: row;
  margin-bottom: ${RFValue(10)}px;
`;
export const IConContainer = styled.View<IContainerProps>`
  width: ${RFValue(50)}px;
  height: ${RFValue(50)}px;
  justify-content: center;
  align-items: center;

  ${{}}
`;
