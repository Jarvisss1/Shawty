import supabase from "./supabase";

export const login = async ({email, password}) => {
    const {data,error} = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    if(error) throw new Error(error.message);

    return data;
}

// export const signUp = async ({email, password}) => {
//     const {data,error} = await supabase.auth.signUp({
//         email,
//         password,
//     })
//     if(error) throw new Error(error.message);

//     return data;
// }

export const getCurrentUser = async () => {
    const {data : session ,error} = supabase.auth.getSession();

    if(!session.session) return null;

    if(error) throw new Error(error.message);

    return session.session?.user;
}