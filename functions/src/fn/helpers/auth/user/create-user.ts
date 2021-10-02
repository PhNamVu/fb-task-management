import {graphqlRequestClient} from "../../../utils/graphql-request";

// eslint-disable-next-line require-jsdoc
export class Variables {
    object:
        | {
            id: string;
            firstName: string;
            lastName: string;
            role: string;
            email: string;
        }
        | undefined;
}

export const createUser = (variables: Variables) =>
  graphqlRequestClient(
      /* GraphQL */ `
        mutation insert_users(
            $object: users_insert_input!
        ) {
            insert_users(objects: [$object]) {
                affected_rows
            }
        }
        `,
      variables,
      true,
  );
