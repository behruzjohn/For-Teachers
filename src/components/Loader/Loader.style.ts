'use client';

import styled from '@emotion/styled';

export const StyleLoader = styled.div<{ minHeight?: string | number }>`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 90000000;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  &.inner {
    position: static;
    background-color: transparent;
    min-height: ${(props) => props.minHeight}px;
  }
`;
