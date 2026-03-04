import styled from '@emotion/styled';

export const StyleHeader = styled.div`
  .header_links-li {
    color: black;
    text-decoration: none;
    font-size: 15px;
    list-style: none;
    a {
      color: black;
      text-decoration: none;
    }
  }
  .header {
    min-height: 60px;
  }
  .header-title {
    font-family: 'Montserrat', sans-serif;
    font-optical-sizing: auto;
    font-weight: 500;
    font-style: normal;
    margin-left: 3px;
    font-size: 18px;
  }
  .profile {
    cursor: pointer;
    padding: 6px;

    border-radius: 3px;
  }
  .chip {
    border-radius: 6px;
  }

  @media screen and (max-width: 480px) {
    .containerOfProfile {
      margin-bottom: 14px;
    }
    .profile {
      padding: 6px;
      border-radius: 3px;
    }
  }
`;
