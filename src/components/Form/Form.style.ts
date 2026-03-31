import styled from "@emotion/styled";

export const StyleForm = styled.div`
  max-width: 600px;
  width: 100%;
  input {
    height: 18px;
  }
  .exercises {
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    padding: 18px;
    /* background-color: #fafafa; */
  }
  .exercises-header {
    display: flex;
    gap: 4px;
    margin-bottom: 16px;
    img {
      object-fit: cover;
    }
  }
`;
