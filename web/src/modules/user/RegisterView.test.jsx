import * as React from "react";
import gql from "graphql-tag";
import { fireEvent, wait } from "react-testing-library";
import { RegisterView } from "./RegisterView";
import { customRender } from "../../test-utils/customRender";

const registerMutation = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    register(email: $email, password: $password)
  }
`;
const registerMutationMock = {
  request: {
    query: registerMutation,
    variables: {
      email: "bob@bob.com",
      password: "bob@bob.com"
    }
  },
  result: {
    data: {
      register: {
        id: 1
      }
    }
  }
};

const onSubmit = jest.fn();
test("container render correctly", async () => {
  const { debug, getByTestId } = customRender(<RegisterView />, [
    registerMutationMock
  ]);
  fireEvent.change(getByTestId("email"), {
    target: { value: "hello" }
  });
  fireEvent.change(getByTestId("password"), {
    target: { value: "hello" }
  });
  // await wait(() => {
  //   fireEvent.click(getByTestId("submit"));
  // });
  // await wait(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  // await wait(() =>
  //   expect(onSubmit).toHaveBeenCalledWith({
  //     email: "hello",
  //     password: "hello"
  //   })
  // );
});
