import * as React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { RouteComponentProps } from "react-router-dom";

import { RegisterMutationVariables, RegisterMutation } from "../../schemaTypes";
import { Form } from "./Form";

const registerMutation = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    register(email: $email, password: $password)
  }
`;

export class RegisterView extends React.PureComponent<RouteComponentProps<{}>> {
  render() {
    return (
      <Mutation<RegisterMutation, RegisterMutationVariables>
        mutation={registerMutation}
      >
        {mutate => (
          <Form
            buttonText="register"
            onSubmit={async data => {
              console.log(data, "data");
              const response = await mutate({
                variables: data
              });
              console.log("it is not comming here");
              console.log("response", response);
              this.props.history.push("/login");
            }}
          />
        )}
      </Mutation>
    );
  }
}
