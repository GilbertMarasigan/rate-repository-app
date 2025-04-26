import { useMutation, useApolloClient } from "@apollo/client"
import { AUTHENTICATE } from "../graphql/queries";
import useAuthStorage from "./useAuthStorage";


const useSignIn = () => {
    const [mutate, result] = useMutation(AUTHENTICATE);

    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();

    const signIn = async ({ username, password }) => {
        try {
            const { data } = await mutate({
                variables: {
                    credentials: { username, password },
                },
            });

            const accessToken = data?.authenticate?.accessToken;
            await authStorage.setAccessToken(accessToken);
            apolloClient.resetStore();

            return accessToken;
        } catch (e) {
            console.error("Authentication error:", e.message);
            throw e;
        }
    };

    return [signIn, result];
}

export default useSignIn;