import { useMutation } from "@apollo/client"
import { AUTHENTICATE } from "../graphql/queries";


const useSignIn = () => {
    const [mutate, result] = useMutation(AUTHENTICATE);

    const signIn = async ({ username, password }) => {
        try {
            const { data } = await mutate({
                variables: {
                    credentials: { username, password },
                },
            });

            return data?.authenticate?.accessToken;
        } catch (e) {
            console.error("Authentication error:", e.message);
            throw e;
        }
    };

    return [signIn, result];
}

export default useSignIn;