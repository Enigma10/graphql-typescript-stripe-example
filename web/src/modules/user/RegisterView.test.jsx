import * as React from "react";
import gql from "graphql-tag";
import { fireEvent, wait } from "react-testing-library";
import { RegisterView } from "./RegisterView";
import { customRender } from "../../test-utils/customRender";
import { Route } from "react-router";

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
const waitForData = () => new Promise(res => setTimeout(res, 0));

test("container render correctly", async () => {
  const { debug, getByTestId, history } = customRender(
    <Route path="/" render={() => <RegisterView />} />,
    [registerMutationMock]
  );
  fireEvent.change(getByTestId("email"), {
    target: { value: "bob@bob.com" }
  });
  fireEvent.change(getByTestId("password"), {
    target: { value: "bob@bob.com" }
  });
  fireEvent.click(getByTestId("submit"));
  expect(history.location.pathname).toEqual("/login");

  // await wait(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  // await wait(() =>
  //   expect(onSubmit).toHaveBeenCalledWith({
  //     email: "hello",
  //     password: "hello"
  //   })
  // );
});
